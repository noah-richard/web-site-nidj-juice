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
  private showcase: BrandShowcaseSection;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'page page-home';

    const hero = new HeroSection();
    const about = new StorySection();
    this.showcase = new BrandShowcaseSection();
    const flavors = new FlavorShowcase();
    const promo = new PromoOrderBanner();
    const reels = new VideoReelsSection();
    const locator = new StoreLocator();

    this.element.appendChild(hero.getElement());
    this.element.appendChild(about.getElement());
    this.element.appendChild(this.showcase.getElement());
    this.element.appendChild(flavors.getElement());
    this.element.appendChild(promo.getElement());
    this.element.appendChild(reels.getElement());
    this.element.appendChild(locator.getElement());
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public destroy(): void {
    this.showcase.destroy();
  }
}
