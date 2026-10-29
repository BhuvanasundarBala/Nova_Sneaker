import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import CategorySection from './components/home/CategorySection';
import ProductGrid from './components/home/ProductGrid';
import TechLabSection from './components/home/TechLabSection';
import UnboxingExperience from './components/home/UnboxingExperience';
import WhyNovaSection from './components/home/WhyNovaSection';
import ReviewsSection from './components/home/ReviewsSection';
import InstagramSection from './components/home/InstagramSection';
import JournalSection from './components/home/JournalSection';
import NewsletterSection from './components/home/NewsletterSection';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import CartDrawer from './components/cart/CartDrawer';
import ProductDetailModal from './components/product/ProductDetailModal';
import AISneakerFinderModal from './components/ai/AISneakerFinderModal';
import VirtualTryOnModal from './components/ai/VirtualTryOnModal';
import SizeGuideModal from './components/ai/SizeGuideModal';
import SearchModal from './components/search/SearchModal';
import CheckoutModal from './components/checkout/CheckoutModal';
import SCMDashboard from './components/admin/SCMDashboard';
import ToastNotification from './components/ui/ToastNotification';
import CustomCursor from './components/ui/CustomCursor';

function MainStore() {
  const { isAdminView } = useShop();

  const handleNavigateSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminView) {
    return <SCMDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F7F7F7] flex flex-col selection:bg-[#B7FF00] selection:text-black">
      {/* Custom Animated Kinetic Cursor */}
      <CustomCursor />

      {/* Toast Feedback */}
      <ToastNotification />

      {/* Global Navigation Bar */}
      <Navbar onNavigateSection={handleNavigateSection} />

      {/* Hero Landing */}
      <main className="flex-grow">
        <HeroSection 
          onShopClick={() => handleNavigateSection('shop')} 
          onExploreClick={() => handleNavigateSection('shop')}
        />

        {/* Featured Categories */}
        <CategorySection />

        {/* Featured Products Grid */}
        <ProductGrid />

        {/* Footwear Innovation & Anatomy Tech Lab */}
        <TechLabSection />

        {/* The Unboxing Ritual Experience */}
        <UnboxingExperience />

        {/* Why NOVA / D2C Transparency & SCM */}
        <WhyNovaSection />

        {/* Community Athlete Reviews */}
        <ReviewsSection />

        {/* Instagram Street Lookbook */}
        <InstagramSection />

        {/* NOVA Journal */}
        <JournalSection />

        {/* Newsletter CTA */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav onNavigateSection={handleNavigateSection} />

      {/* Global Modals & Sliding Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <AISneakerFinderModal />
      <VirtualTryOnModal />
      <SizeGuideModal />
      <SearchModal />
      <CheckoutModal />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainStore />
    </ShopProvider>
  );
}
