import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CoverSection } from "@/components/landing-spark/cover-section";
import { InteractiveGallery } from "@/components/landing-spark/interactive-gallery";
import { Toaster } from "@/components/ui/toaster";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <CoverSection />
        <InteractiveGallery />
        {/* Placeholder for other sections like Pricing, About, Contact Form */}
        <section id="pricing" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">Pricing</h2>
            <p className="mt-4 text-lg text-foreground/70">Choose a plan that's right for you.</p>
            {/* Pricing cards would go here */}
          </div>
        </section>
        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">About Us</h2>
            <p className="mt-4 text-lg text-foreground/70">Learn more about Landing Spark.</p>
            {/* About content would go here */}
          </div>
        </section>
         <section id="contact" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">Contact Us</h2>
            <p className="mt-4 text-lg text-foreground/70">Get in touch with our team.</p>
            {/* Contact form or info would go here */}
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
