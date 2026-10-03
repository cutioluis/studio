import Image from "next/image";
import { instructors as defaultInstructors, type Instructor } from "@/data/instructors";
import { CardShell } from "@/components/ui/card-shell";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

interface InstructorSectionProps {
  instructors?: Instructor[];
  title?: string;
  subtitle?: string;
}

export function InstructorSection({
  instructors = defaultInstructors,
  title = "Aprende con Profesionales",
  subtitle = "Un equipo activo en la industria, dedicado a tu formación de principio a fin.",
}: InstructorSectionProps) {
  if (instructors.length === 0) return null;

  const featured = instructors.filter((instructor) => instructor.featured);
  const team = instructors.filter((instructor) => !instructor.featured);

  return (
    <section id="instructor" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <RevealGroup as="header" className="text-center mb-14 md:mb-20">
          <RevealItem variant="text">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Nuestros instructores</p>
          </RevealItem>
          <RevealItem variant="text">
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
          </RevealItem>
          <RevealItem variant="text">
            <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground">{subtitle}</p>
          </RevealItem>
        </RevealGroup>

        <div className="flex flex-col gap-6 lg:gap-8">
          {featured.map((instructor) => (
            <Reveal key={instructor.id}>
              <FeaturedInstructorCard instructor={instructor} />
            </Reveal>
          ))}

          {team.length > 0 && (
            <RevealGroup as="ul" stagger={0.15} className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {team.map((instructor) => (
                <RevealItem
                  as="li"
                  key={instructor.id}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.334rem)]"
                >
                  <InstructorCard instructor={instructor} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </div>
    </section>
  );
}

function Specialties({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-primary-deep/25 bg-primary-deep/[0.08] px-3 py-1 text-xs font-medium text-primary"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function FeaturedInstructorCard({ instructor }: { instructor: Instructor }) {
  const { name, role, bio, specialties, image, imageAlt } = instructor;

  return (
    <CardShell className="flex flex-col md:flex-row">
      <div className="relative aspect-square shrink-0 overflow-hidden md:w-1/2">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="origin-top object-cover object-[50%_15%] transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-5 p-7 sm:p-10 lg:p-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{role}</p>
        <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{name}</h3>
        <div className="h-px w-16 bg-gradient-to-r from-primary to-primary-deep" />
        <p className="leading-relaxed text-muted-foreground">{bio}</p>
        <Specialties items={specialties} />
      </div>
    </CardShell>
  );
}

function InstructorCard({ instructor }: { instructor: Instructor }) {
  const { name, role, bio, specialties, image, imageAlt } = instructor;

  return (
    <CardShell className="flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-7 pb-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{role}</p>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>
        <div className="mt-auto pt-2">
          <Specialties items={specialties} />
        </div>
      </div>
    </CardShell>
  );
}
