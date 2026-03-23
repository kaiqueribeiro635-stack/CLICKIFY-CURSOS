import { PixelIntegrationService } from '../../src/integrations/pixels/pixel-integration.service';

describe('PixelIntegrationService', () => {
  it('retries and logs success when an adapter eventually succeeds', async () => {
    const adapter = {
      initialize: jest.fn(),
      validatePixel: jest.fn(),
      sendPurchaseEvent: jest
        .fn()
        .mockRejectedValueOnce(new Error('fail-1'))
        .mockRejectedValueOnce(new Error('fail-2'))
        .mockResolvedValueOnce({ payload: { ok: true } }),
      sendLeadEvent: jest.fn(),
    };

    const factory = { createAdapter: jest.fn().mockReturnValue(adapter) };

    const productPixelRepo = {
      find: jest.fn().mockResolvedValue([{ productId: 'p1', platform: 'facebook', active: true, config: { pixelId: '1' } }]),
    };
    const logRepo = { insert: jest.fn().mockResolvedValue(undefined) };

    const svc = new PixelIntegrationService(factory as any, productPixelRepo as any, logRepo as any);

    await svc.triggerPurchase('p1', { value: 197, currency: 'BRL', transaction_id: 'ABC123' }, { retries: 2, timeoutMs: 0 });

    expect(factory.createAdapter).toHaveBeenCalledWith('facebook');
    expect(adapter.initialize).toHaveBeenCalledWith({ pixelId: '1' });
    expect(adapter.validatePixel).toHaveBeenCalled();
    expect(adapter.sendPurchaseEvent).toHaveBeenCalledTimes(3);
    expect(logRepo.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: 'p1',
        platform: 'facebook',
        eventType: 'purchase',
        status: 'success',
        payloadSent: { ok: true },
        errorMessage: null,
      }),
    );
  });

  it('logs error when an adapter keeps failing', async () => {
    const adapter = {
      initialize: jest.fn(),
      validatePixel: jest.fn(),
      sendPurchaseEvent: jest.fn().mockRejectedValue(new Error('always-fail')),
      sendLeadEvent: jest.fn(),
    };
    const factory = { createAdapter: jest.fn().mockReturnValue(adapter) };
    const productPixelRepo = {
      find: jest.fn().mockResolvedValue([{ productId: 'p1', platform: 'facebook', active: true, config: { pixelId: '1' } }]),
    };
    const logRepo = { insert: jest.fn().mockResolvedValue(undefined) };

    const svc = new PixelIntegrationService(factory as any, productPixelRepo as any, logRepo as any);

    await svc.triggerPurchase('p1', { value: 197, currency: 'BRL', transaction_id: 'ABC123' }, { retries: 1, timeoutMs: 0 });

    expect(adapter.sendPurchaseEvent).toHaveBeenCalledTimes(2);
    expect(logRepo.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
        errorMessage: 'always-fail',
      }),
    );
  });
});

