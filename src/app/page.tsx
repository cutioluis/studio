
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CoverSection } from "@/components/landing-spark/cover-section";
import { InteractiveGallery } from "@/components/landing-spark/interactive-gallery";
import { InstructorSection } from "@/components/landing-spark/instructor-section";
import { PricingSection } from "@/components/landing-spark/pricing-section";
import { ScheduleSection } from "@/components/landing-spark/schedule-section"; // Import ScheduleSection
import { LocationSection } from "@/components/landing-spark/location-section";
import { CallToActionSection } from "@/components/landing-spark/call-to-action-section";
import { Toaster } from "@/components/ui/toaster";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <AnnouncementBanner />
      <main className="flex-grow">
        <CoverSection />
        <InteractiveGallery />
        <InstructorSection />
        <PricingSection /> 
        <ScheduleSection /> {/* Added ScheduleSection */}
        <LocationSection />
        <CallToActionSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
