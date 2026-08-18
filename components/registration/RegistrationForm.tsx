"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { registrationSchema, type RegistrationFormValues } from "@/lib/validation";
import { skatingLevels, experienceRanges, weekDays } from "@/data/formOptions";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkateCheckmark } from "@/components/registration/SkateCheckmark";
import { fadeUp, viewportOnce } from "@/lib/animations";

const inputStyles =
  "w-full rounded-xl border border-line bg-ice-black/40 px-4 py-3.5 text-ice-white placeholder:text-ice-white-dim/60 outline-none transition-colors focus:border-crystal";
const labelStyles = "mb-2 block text-sm font-medium text-ice-white-dim";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-400">{message}</p>;
}

export function RegistrationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { preferredDays: [], privateAssessment: false },
  });

  async function onSubmit(values: RegistrationFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="register" className="relative bg-ice-black py-28 md:py-36">
      <Container className="max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="Get Started"
          title="Ready to Take the Next Step?"
          description="Tell us a little about the skater and we'll help determine the best training path."
          className="mx-auto"
        />

        <div className="relative mt-14">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center rounded-2xl border border-line bg-ice-navy px-8 py-20 text-center"
              >
                <SkateCheckmark />
                <h3 className="mt-6 text-2xl font-semibold text-ice-white">
                  Request Received
                </h3>
                <p className="mt-3 max-w-sm text-ice-white-dim">
                  Thank you — we&apos;ll be in touch shortly to help plan the
                  athlete&apos;s next steps.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="skate-line mt-8 text-sm font-medium uppercase tracking-wide text-ice-white"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-6 rounded-2xl border border-line bg-ice-navy p-6 md:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="parentName" className={labelStyles}>
                      Parent / Athlete Name
                    </label>
                    <input
                      id="parentName"
                      className={inputStyles}
                      placeholder="Full name"
                      aria-invalid={!!errors.parentName}
                      {...register("parentName")}
                    />
                    <FieldError message={errors.parentName?.message} />
                  </div>

                  <div>
                    <label htmlFor="athleteAge" className={labelStyles}>
                      Athlete Age
                    </label>
                    <input
                      id="athleteAge"
                      type="number"
                      min={1}
                      max={99}
                      className={inputStyles}
                      placeholder="Age"
                      aria-invalid={!!errors.athleteAge}
                      {...register("athleteAge")}
                    />
                    <FieldError message={errors.athleteAge?.message} />
                  </div>

                  <div>
                    <label htmlFor="skatingLevel" className={labelStyles}>
                      Current Skating Level
                    </label>
                    <select
                      id="skatingLevel"
                      className={inputStyles}
                      defaultValue=""
                      aria-invalid={!!errors.skatingLevel}
                      {...register("skatingLevel")}
                    >
                      <option value="" disabled>
                        Select a level
                      </option>
                      {skatingLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.skatingLevel?.message} />
                  </div>

                  <div>
                    <label htmlFor="yearsExperience" className={labelStyles}>
                      Years of Experience
                    </label>
                    <select
                      id="yearsExperience"
                      className={inputStyles}
                      defaultValue=""
                      aria-invalid={!!errors.yearsExperience}
                      {...register("yearsExperience")}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {experienceRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.yearsExperience?.message} />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="currentCoach" className={labelStyles}>
                      Current Coach (if any)
                    </label>
                    <input
                      id="currentCoach"
                      className={inputStyles}
                      placeholder="Optional"
                      {...register("currentCoach")}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="trainingGoals" className={labelStyles}>
                      Training Goals
                    </label>
                    <textarea
                      id="trainingGoals"
                      rows={3}
                      className={inputStyles}
                      placeholder="What are you hoping to achieve?"
                      aria-invalid={!!errors.trainingGoals}
                      {...register("trainingGoals")}
                    />
                    <FieldError message={errors.trainingGoals?.message} />
                  </div>

                  <div className="sm:col-span-2">
                    <span id="preferredDaysLabel" className={labelStyles}>
                      Preferred Training Days
                    </span>
                    <Controller
                      control={control}
                      name="preferredDays"
                      render={({ field }) => (
                        <div
                          role="group"
                          aria-labelledby="preferredDaysLabel"
                          className="flex flex-wrap gap-2"
                        >
                          {weekDays.map((day) => {
                            const checked = field.value?.includes(day);
                            return (
                              <button
                                type="button"
                                key={day}
                                onClick={() =>
                                  field.onChange(
                                    checked
                                      ? field.value.filter((d) => d !== day)
                                      : [...(field.value ?? []), day]
                                  )
                                }
                                aria-pressed={checked}
                                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                                  checked
                                    ? "border-crystal bg-crystal/10 text-crystal"
                                    : "border-line text-ice-white-dim hover:text-ice-white"
                                }`}
                              >
                                <span className="sr-only">{day}</span>
                                <span aria-hidden="true">{day.slice(0, 3)}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    />
                    <FieldError message={errors.preferredDays?.message} />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelStyles}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={inputStyles}
                      placeholder="(555) 555-5555"
                      aria-invalid={!!errors.phone}
                      {...register("phone")}
                    />
                    <FieldError message={errors.phone?.message} />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelStyles}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={inputStyles}
                      placeholder="you@email.com"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelStyles}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className={inputStyles}
                      placeholder="Anything else we should know? (optional)"
                      {...register("message")}
                    />
                  </div>

                  <label className="sm:col-span-2 flex items-start gap-3 text-sm text-ice-white-dim">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-line accent-crystal"
                      {...register("privateAssessment")}
                    />
                    I&apos;m interested in a private assessment session
                  </label>
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Something went wrong sending your request. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ice-white px-8 py-4 text-sm font-medium uppercase tracking-wide text-ice-black transition-colors hover:bg-crystal disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  {siteConfig.cta.form}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
