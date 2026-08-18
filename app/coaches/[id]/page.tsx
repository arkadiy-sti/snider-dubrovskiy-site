import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { coaches } from "@/data/coaches";
import { Container } from "@/components/ui/Container";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/footer/Footer";

export function generateStaticParams() {
  return coaches.map((coach) => ({ id: coach.id }));
}

export default async function CoachPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coach = coaches.find((c) => c.id === id);
  if (!coach) notFound();

  return (
    <>
      <Navigation />
      <main className="flex-1 bg-ice-black pt-32 pb-24 md:pt-40">
        <Container className="max-w-4xl">
          <Link
            href="/#coaches"
            className="skate-line inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-ice-white-dim transition-colors hover:text-ice-white"
          >
            <ArrowLeft size={16} />
            Back to Coaches
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-[320px_1fr] md:gap-14">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              <Image
                src={coach.photo}
                alt={coach.photoAlt}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-ice-white">
                {coach.name}
              </h1>
              <p className="mt-2 font-serif text-lg italic text-crystal">
                {coach.role} · {coach.specialty}
              </p>

              <p className="mt-6 text-lg leading-relaxed text-ice-white-dim">
                {coach.bio}
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="text-sm font-medium uppercase tracking-wide text-ice-white">
                    Competitive Background
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {coach.background.map((item) => (
                      <li
                        key={item}
                        className="border-l border-crystal/40 pl-4 text-sm leading-relaxed text-ice-white-dim"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-sm font-medium uppercase tracking-wide text-ice-white">
                    Specialties
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {coach.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-wide text-ice-white-dim"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-6 text-sm font-medium uppercase tracking-wide text-ice-white">
                    Languages
                  </h2>
                  <p className="mt-3 text-sm text-ice-white-dim">
                    {coach.languages.join(" · ")}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-8">
                <a
                  href={`mailto:${coach.contact.email}`}
                  className="skate-line text-sm font-medium text-ice-white"
                >
                  {coach.contact.email}
                </a>
                <a
                  href={`tel:${coach.contact.phone}`}
                  className="skate-line text-sm font-medium text-ice-white"
                >
                  {coach.contact.phone}
                </a>
                {coach.contact.instagram && (
                  <span className="text-sm text-ice-white-dim">
                    {coach.contact.instagram}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
