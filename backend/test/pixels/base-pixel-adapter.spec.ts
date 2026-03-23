import { BasePixelAdapter } from '../../src/integrations/pixels/adapters/base-pixel-adapter';

class NoopAdapter extends BasePixelAdapter {}

describe('BasePixelAdapter', () => {
  it('throws when validatePixel is not implemented', () => {
    const a = new NoopAdapter();
    expect(() => a.validatePixel()).toThrow('validatePixel() must be implemented');
  });

  it('throws when sendPurchaseEvent is not implemented', async () => {
    const a = new NoopAdapter();
    await expect(a.sendPurchaseEvent({ value: 1, currency: 'BRL', transaction_id: 'T' })).rejects.toThrow(
      'sendPurchaseEvent() must be implemented',
    );
  });

  it('throws when sendLeadEvent is not implemented', async () => {
    const a = new NoopAdapter();
    await expect(a.sendLeadEvent({ user_email: 'a@b.com' })).rejects.toThrow('sendLeadEvent() must be implemented');
  });
});

