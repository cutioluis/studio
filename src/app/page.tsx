
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CoverSection } from "@/components/landing-spark/cover-section";
import { InteractiveGallery } from "@/components/landing-spark/interactive-gallery";
import { InstructorSection } from "@/components/landing-spark/instructor-section";
import { ScheduleSection } from "@/components/landing-spark/schedule-section";
import { LocationSection } from "@/components/landing-spark/location-section";
import { BlogTeaserSection } from "@/components/landing-spark/blog-teaser-section";
import { CallToActionSection } from "@/components/landing-spark/call-to-action-section";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { getCareers } from "@/features/catalog/infrastructure/catalog-repository";


// Hourly ISR: careers and schedules come from the database.
export const revalidate = 3600;

export default async function HomePage() {
  const careers = await getCareers();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <AnnouncementBanner />
      <main className="flex-grow">
        <CoverSection />
        <InteractiveGallery programas={careers} />
        <InstructorSection />
        <ScheduleSection programas={careers} />
        <LocationSection />
        <BlogTeaserSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
