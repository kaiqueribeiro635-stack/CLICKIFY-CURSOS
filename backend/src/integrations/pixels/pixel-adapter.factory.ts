import { Injectable } from '@nestjs/common';
import { PixelPlatform } from './types';
import { BasePixelAdapter } from './adapters/base-pixel-adapter';
import { FacebookAdapter } from './adapters/facebook-adapter';
import { GoogleAdsAdapter } from './adapters/google-ads-adapter';
import { GoogleAnalyticsAdapter } from './adapters/google-analytics-adapter';
import { TikTokAdapter } from './adapters/tiktok-adapter';
import { KwaiAdapter } from './adapters/kwai-adapter';
import { PinterestAdapter } from './adapters/pinterest-adapter';

@Injectable()
export class PixelAdapterFactory {
  createAdapter(platform: PixelPlatform): BasePixelAdapter {
    switch (platform) {
      case 'facebook':
        return new FacebookAdapter();
      case 'google_ads':
        return new GoogleAdsAdapter();
      case 'google_analytics':
        return new GoogleAnalyticsAdapter();
      case 'tiktok':
        return new TikTokAdapter();
      case 'kwai':
        return new KwaiAdapter();
      case 'pinterest':
        return new PinterestAdapter();
      default:
        throw new Error(`Unsupported pixel platform: ${platform}`);
    }
  }
}

