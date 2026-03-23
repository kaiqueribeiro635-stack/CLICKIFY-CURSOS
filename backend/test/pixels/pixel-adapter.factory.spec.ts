import { PixelAdapterFactory } from '../../src/integrations/pixels/pixel-adapter.factory';
import { FacebookAdapter } from '../../src/integrations/pixels/adapters/facebook-adapter';
import { GoogleAdsAdapter } from '../../src/integrations/pixels/adapters/google-ads-adapter';
import { GoogleAnalyticsAdapter } from '../../src/integrations/pixels/adapters/google-analytics-adapter';
import { TikTokAdapter } from '../../src/integrations/pixels/adapters/tiktok-adapter';

describe('PixelAdapterFactory', () => {
  it('creates FacebookAdapter', () => {
    const f = new PixelAdapterFactory();
    expect(f.createAdapter('facebook')).toBeInstanceOf(FacebookAdapter);
  });

  it('creates GoogleAdsAdapter', () => {
    const f = new PixelAdapterFactory();
    expect(f.createAdapter('google_ads')).toBeInstanceOf(GoogleAdsAdapter);
  });

  it('creates GoogleAnalyticsAdapter', () => {
    const f = new PixelAdapterFactory();
    expect(f.createAdapter('google_analytics')).toBeInstanceOf(GoogleAnalyticsAdapter);
  });

  it('creates TikTokAdapter', () => {
    const f = new PixelAdapterFactory();
    expect(f.createAdapter('tiktok')).toBeInstanceOf(TikTokAdapter);
  });

  it('throws on unsupported platform', () => {
    const f = new PixelAdapterFactory();
    expect(() => f.createAdapter('unknown' as any)).toThrow('Unsupported pixel platform');
  });
});

