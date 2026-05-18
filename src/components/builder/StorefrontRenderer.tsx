"use client";

import React from 'react';
import HeroSection from './sections/HeroSection';
import HeaderSection from './sections/HeaderSection';
import CategoryGridSection from './sections/CategoryGridSection';
import FooterSection from './sections/FooterSection';
import RichTextSection from './sections/RichTextSection';
import MarqueeSection from './sections/MarqueeSection';
import SplitHeroSection from './sections/SplitHeroSection';
import VideoHeroSection from './sections/VideoHeroSection';
import FaqAccordionSection from './sections/FaqAccordionSection';
import TestimonialsSection from './sections/TestimonialsSection';
import TrustBadgesSection from './sections/TrustBadgesSection';
import PressLogosSection from './sections/PressLogosSection';
import CountdownTimerSection from './sections/CountdownTimerSection';
import NewsletterSignupSection from './sections/NewsletterSignupSection';
import SpacerSection from './sections/SpacerSection';
import DividerSection from './sections/DividerSection';
import ContactFormSection from './sections/ContactFormSection';
import ImageGallerySection from './sections/ImageGallerySection';
import GoogleMapSection from './sections/GoogleMapSection';
import AnnouncementBarSection from './sections/AnnouncementBarSection';
import BentoGridSection from './sections/BentoGridSection';
import TeamGridSection from './sections/TeamGridSection';
import StatsCounterSection from './sections/StatsCounterSection';
import ImageBannerSection from './sections/ImageBannerSection';
import StoreLocatorSection from './sections/StoreLocatorSection';
import ProductFeaturesSection from './sections/ProductFeaturesSection';
import TimelineSection from './sections/TimelineSection';
import SectionOverlay from './SectionOverlay';

// ── Package 1: E-Commerce ──
import ProductCarouselSection from './sections/ProductCarouselSection';
import LookbookSection from './sections/LookbookSection';
import CompareTableSection from './sections/CompareTableSection';
import DealOfTheDaySection from './sections/DealOfTheDaySection';
import CategoryCirclesSection from './sections/CategoryCirclesSection';
import BundleBuilderSection from './sections/BundleBuilderSection';
import NewArrivalsSection from './sections/NewArrivalsSection';
import BestSellersSliderSection from './sections/BestSellersSliderSection';
import ProductSpecsSection from './sections/ProductSpecsSection';
import PricingTableSection from './sections/PricingTableSection';
import GiftGuideSection from './sections/GiftGuideSection';
import SizeGuideSection from './sections/SizeGuideSection';
import LoyaltyTeaserSection from './sections/LoyaltyTeaserSection';
import BrandShowcaseSection from './sections/BrandShowcaseSection';
import QuickOrderFormSection from './sections/QuickOrderFormSection';
import RecentViewsSection from './sections/RecentViewsSection';
import FeaturedCategorySection from './sections/FeaturedCategorySection';
import ProductTabsSection from './sections/ProductTabsSection';
import StockScarcitySection from './sections/StockScarcitySection';
import WarrantyInfoSection from './sections/WarrantyInfoSection';

// ── Package 2: Media, Social Proof & Heroes ──
import CarouselHeroSection from './sections/CarouselHeroSection';
import MasonryHeroSection from './sections/MasonryHeroSection';
import VideoModalHeroSection from './sections/VideoModalHeroSection';
import SearchHeroSection from './sections/SearchHeroSection';
import MapHeroSection from './sections/MapHeroSection';
import InstagramFeedSection from './sections/InstagramFeedSection';
import TiktokFeedSection from './sections/TiktokFeedSection';
import VideoTestimonialsSection from './sections/VideoTestimonialsSection';
import ReviewGridSection from './sections/ReviewGridSection';
import SuccessStoriesSection from './sections/SuccessStoriesSection';
import InfluencerPicksSection from './sections/InfluencerPicksSection';
import UserGeneratedSection from './sections/UserGeneratedSection';
import AsSeenOnTextSection from './sections/AsSeenOnTextSection';
import AudioPlayerSection from './sections/AudioPlayerSection';
import ParallaxImageSection from './sections/ParallaxImageSection';
import ImageHotspotsSection from './sections/ImageHotspotsSection';
import BeforeAfterVerticalSection from './sections/BeforeAfterVerticalSection';
import LogoMarqueeSection from './sections/LogoMarqueeSection';
import TextMarqueeHollowSection from './sections/TextMarqueeHollowSection';
import InteractiveMapSection from './sections/InteractiveMapSection';

// ── Package 3: Content, Layout & Blog ──
import StepByStepSection from './sections/StepByStepSection';
import CoreValuesSection from './sections/CoreValuesSection';
import AboutStorySection from './sections/AboutStorySection';
import TimelineHorizontalSection from './sections/TimelineHorizontalSection';
import IconBoxesSection from './sections/IconBoxesSection';
import RecentPostsSection from './sections/RecentPostsSection';
import FeaturedArticleSection from './sections/FeaturedArticleSection';
import BlogCarouselSection from './sections/BlogCarouselSection';
import AuthorBioSection from './sections/AuthorBioSection';
import TagCloudSection from './sections/TagCloudSection';
import SubscribeBoxSection from './sections/SubscribeBoxSection';
import WaveDividerSection from './sections/WaveDividerSection';
import SlantDividerSection from './sections/SlantDividerSection';
import TextColumnsWithImagesSection from './sections/TextColumnsWithImagesSection';
import QuoteBlockSection from './sections/QuoteBlockSection';
import CollapsibleListSection from './sections/CollapsibleListSection';
import JobOpeningsSection from './sections/JobOpeningsSection';
import DownloadAssetsSection from './sections/DownloadAssetsSection';
import EventCalendarSection from './sections/EventCalendarSection';
import TableOfContentsSection from './sections/TableOfContentsSection';

// ── Package 4: Navigation, Modals & Interactions ──
import PopupModalSection from './sections/PopupModalSection';
import AgeVerificationModalSection from './sections/AgeVerificationModalSection';
import VideoBackgroundSection from './sections/VideoBackgroundSection';
import Product360ViewerSection from './sections/Product360ViewerSection';
import FloatingActionMenuSection from './sections/FloatingActionMenuSection';
import MegaMenuPlaceholderSection from './sections/MegaMenuPlaceholderSection';
import StickyBannerSection from './sections/StickyBannerSection';
import CountdownTimerSection from './sections/CountdownTimerSection';
import BeforeAfterSliderSection from './sections/BeforeAfterSliderSection';
import ScratchCardSection from './sections/ScratchCardSection';
import PricingCalculatorSection from './sections/PricingCalculatorSection';
import StoreTourSection from './sections/StoreTourSection';

interface Block { id: string; type: string; settings: Record<string, any> }
interface Section { id: string; type: string; settings: Record<string, any>; blocks: Block[] }
interface StorefrontRendererProps { 
  initialSections: Section[];
  isBuilder?: boolean;
  pageSlug?: string;
}

export default function StorefrontRenderer({ initialSections, isBuilder = false, pageSlug = "index" }: StorefrontRendererProps) {
  const renderSectionContent = (section: Section) => {
    const p = { key: section.id, settings: section.settings, blocks: section.blocks ?? [] };
    switch (section.type) {
      // ── Phase 1 originals ──
      case 'header':           return <HeaderSection {...p} />;
      case 'hero':             return <HeroSection {...p} />;
      case 'richText':         return <RichTextSection {...p} />;
      case 'categoryGrid':     return <CategoryGridSection {...p} />;
      case 'footer':           return <FooterSection {...p} />;
      // ── Phase 2 ──
      case 'marquee':          return <MarqueeSection {...p} />;
      case 'splitHero':        return <SplitHeroSection {...p} />;
      case 'videoHero':        return <VideoHeroSection {...p} />;
      case 'faqAccordion':     return <FaqAccordionSection {...p} />;
      case 'testimonials':     return <TestimonialsSection {...p} />;
      case 'trustBadges':      return <TrustBadgesSection {...p} />;
      case 'pressLogos':       return <PressLogosSection {...p} />;
      case 'countdownTimer':   return <CountdownTimerSection {...p} />;
      case 'newsletterSignup': return <NewsletterSignupSection {...p} />;
      case 'spacer':           return <SpacerSection {...p} />;
      case 'divider':          return <DividerSection {...p} />;
      // ── Phase 3 ──
      case 'contactForm':      return <ContactFormSection {...p} />;
      case 'imageGallery':     return <ImageGallerySection {...p} />;
      case 'googleMap':        return <GoogleMapSection {...p} />;
      case 'announcementBar':  return <AnnouncementBarSection {...p} />;
      case 'bentoGrid':        return <BentoGridSection {...p} />;
      case 'teamGrid':         return <TeamGridSection {...p} />;
      case 'statsCounter':     return <StatsCounterSection {...p} />;
      case 'imageBanner':      return <ImageBannerSection {...p} />;
      case 'storeLocator':     return <StoreLocatorSection {...p} />;
      case 'beforeAfter':      return <BeforeAfterSection {...p} />;
      case 'productFeatures':  return <ProductFeaturesSection {...p} />;
      case 'timeline':         return <TimelineSection {...p} />;
      
      // ── Package 1: E-Commerce ──
      case 'productCarousel':    return <ProductCarouselSection {...p} />;
      case 'lookbook':           return <LookbookSection {...p} />;
      case 'compareTable':       return <CompareTableSection {...p} />;
      case 'dealOfTheDay':       return <DealOfTheDaySection {...p} />;
      case 'categoryCircles':    return <CategoryCirclesSection {...p} />;
      case 'bundleBuilder':      return <BundleBuilderSection {...p} />;
      case 'newArrivals':        return <NewArrivalsSection {...p} />;
      case 'bestSellersSlider':  return <BestSellersSliderSection {...p} />;
      case 'productSpecs':       return <ProductSpecsSection {...p} />;
      case 'pricingTable':       return <PricingTableSection {...p} />;
      case 'giftGuide':          return <GiftGuideSection {...p} />;
      case 'sizeGuide':          return <SizeGuideSection {...p} />;
      case 'loyaltyTeaser':      return <LoyaltyTeaserSection {...p} />;
      case 'brandShowcase':      return <BrandShowcaseSection {...p} />;
      case 'quickOrderForm':     return <QuickOrderFormSection {...p} />;
      case 'recentViews':        return <RecentViewsSection {...p} />;
      case 'featuredCategory':   return <FeaturedCategorySection {...p} />;
      case 'productTabs':        return <ProductTabsSection {...p} />;
      case 'stockScarcity':      return <StockScarcitySection {...p} />;
      case 'warrantyInfo':       return <WarrantyInfoSection {...p} />;
      
      // ── Package 2: Media, Social Proof & Heroes ──
      case 'carouselHero':         return <CarouselHeroSection {...p} />;
      case 'masonryHero':          return <MasonryHeroSection {...p} />;
      case 'videoModalHero':       return <VideoModalHeroSection {...p} />;
      case 'searchHero':           return <SearchHeroSection {...p} />;
      case 'mapHero':              return <MapHeroSection {...p} />;
      case 'instagramFeed':        return <InstagramFeedSection {...p} />;
      case 'tiktokFeed':           return <TiktokFeedSection {...p} />;
      case 'videoTestimonials':    return <VideoTestimonialsSection {...p} />;
      case 'reviewGrid':           return <ReviewGridSection {...p} />;
      case 'successStories':       return <SuccessStoriesSection {...p} />;
      case 'influencerPicks':      return <InfluencerPicksSection {...p} />;
      case 'userGenerated':        return <UserGeneratedSection {...p} />;
      case 'asSeenOnText':         return <AsSeenOnTextSection {...p} />;
      case 'audioPlayer':          return <AudioPlayerSection {...p} />;
      case 'parallaxImage':        return <ParallaxImageSection {...p} />;
      case 'imageHotspots':        return <ImageHotspotsSection {...p} />;
      case 'beforeAfterVertical':  return <BeforeAfterVerticalSection {...p} />;
      case 'logoMarquee':          return <LogoMarqueeSection {...p} />;
      case 'textMarqueeHollow':    return <TextMarqueeHollowSection {...p} />;
      case 'interactiveMap':       return <InteractiveMapSection {...p} />;
      
      // ── Package 3: Content, Layout & Blog ──
      case 'stepByStep':             return <StepByStepSection {...p} />;
      case 'coreValues':             return <CoreValuesSection {...p} />;
      case 'aboutStory':             return <AboutStorySection {...p} />;
      case 'timelineHorizontal':     return <TimelineHorizontalSection {...p} />;
      case 'iconBoxes':              return <IconBoxesSection {...p} />;
      case 'recentPosts':            return <RecentPostsSection {...p} />;
      case 'featuredArticle':        return <FeaturedArticleSection {...p} />;
      case 'blogCarousel':           return <BlogCarouselSection {...p} />;
      case 'authorBio':              return <AuthorBioSection {...p} />;
      case 'tagCloud':               return <TagCloudSection {...p} />;
      case 'subscribeBox':           return <SubscribeBoxSection {...p} />;
      case 'waveDivider':            return <WaveDividerSection {...p} />;
      case 'slantDivider':           return <SlantDividerSection {...p} />;
      case 'textColumnsWithImages':  return <TextColumnsWithImagesSection {...p} />;
      case 'quoteBlock':             return <QuoteBlockSection {...p} />;
      case 'collapsibleList':        return <CollapsibleListSection {...p} />;
      case 'jobOpenings':            return <JobOpeningsSection {...p} />;
      case 'downloadAssets':         return <DownloadAssetsSection {...p} />;
      case 'eventCalendar':          return <EventCalendarSection {...p} />;
      case 'tableOfContents':        return <TableOfContentsSection {...p} />;
      
      // ── Package 4: Navigation, Modals & Interactions ──
      case 'popupModal':             return <PopupModalSection {...p} />;
      case 'ageVerificationModal':   return <AgeVerificationModalSection {...p} />;
      case 'videoBackground':        return <VideoBackgroundSection {...p} />;
      case 'product360Viewer':       return <Product360ViewerSection {...p} />;
      case 'floatingActionMenu':     return <FloatingActionMenuSection {...p} />;
      case 'megaMenuPlaceholder':    return <MegaMenuPlaceholderSection {...p} />;
      case 'stickyBanner':           return <StickyBannerSection {...p} />;
      case 'countdownTimer':         return <CountdownTimerSection {...p} />;
      case 'beforeAfterSlider':      return <BeforeAfterSliderSection {...p} />;
      case 'scratchCard':            return <ScratchCardSection {...p} />;
      case 'pricingCalculator':      return <PricingCalculatorSection {...p} />;
      case 'storeTour':              return <StoreTourSection {...p} />;
      
      default:
        return (
          <div key={section.id} className="py-8 px-6 bg-amber-50 border border-dashed border-amber-300 text-center">
            <p className="text-sm text-amber-700 font-bold">🔧 "{section.type}" — yakında eklenecek</p>
          </div>
        );
    }
  };

  const renderSection = (section: Section) => {
    const content = renderSectionContent(section);
    
    if (isBuilder) {
      return (
        <SectionOverlay key={section.id} sectionId={section.id} type={section.type} page={pageSlug}>
          {content}
        </SectionOverlay>
      );
    }
    
    return content;
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {initialSections.map(renderSection)}
    </div>
  );
}
