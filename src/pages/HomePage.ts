/* ==========================================================================
   NIDJ JUICE — HOME PAGE (ACCUEIL)
   Primary showcase: Hero with interactive 3D bottle tilt, infinite carousel,
   flavor assortment, promotional banner, video reels & store locator.
   ========================================================================== */

import { HeroSection } from '../components/hero/HeroSection';
import { StorySection } from '../components/story/StorySection';
import { BrandShowcaseSection } from '../components/showcase/BrandShowcaseSection';
import { FlavorShowcase } from '../components/flavors/FlavorShowcase';
import { PromoOrderBanner } from '../components/promo/PromoOrderBanner';
import { VideoReelsSection } from '../components/media/VideoReelsSection';
import { StoreLocator } from '../components/locator/StoreLocator';

export class HomePage {
  private element: HTMLElement;
  private hero: HeroSection;
  private showcase: BrandShowcaseSection;
  private flavors: FlavorShowcase;
  private reels: VideoReelsSection;
  private locator: StoreLocator;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'page page-home';

    this.hero = new HeroSection();
    const about = new StorySection();
    this.showcase = new BrandShowcaseSection();
    this.flavors = new FlavorShowcase();
    const promo = new PromoOrderBanner();
    this.reels = new VideoReelsSection();
    this.locator = new StoreLocator();

    this.element.appendChild(this.hero.getElement());
    this.element.appendChild(about.getElement());
    this.element.appendChild(this.showcase.getElement());
    this.element.appendChild(this.flavors.getElement());
    this.element.appendChild(promo.getElement());
    this.element.appendChild(this.reels.getElement());
    this.element.appendChild(this.locator.getElement());
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public destroy(): void {
    this.hero.destroy();
    this.showcase.destroy();
    this.flavors.destroy();
    this.reels.destroy();
    this.locator.destroy();
  }
}
