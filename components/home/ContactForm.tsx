"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "ready";

interface Values {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}

type FieldKey = keyof Values;

const initialValues: Values = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

const projectTypes = [
  "Website",
  "Web application",
  "Educational platform",
  "E-commerce",
  "Redesign / audit",
  "Something else",
];

const budgets = ["Under ₹50,000", "₹50,000 – ₹1.5L", "₹1.5L – ₹5L", "₹5L+", "Not sure yet"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [draftHref, setDraftHref] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const update =
    (field: FieldKey) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};

    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!emailPattern.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (!values.projectType) next.projectType = "Choose the closest project type.";
    if (!values.budget) next.budget = "Choose a budget range, even if it is a guess.";
    if (values.message.trim().length < 20)
      next.message = "A little more detail helps — at least 20 characters.";

    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      const target = document.getElementById(`contact-${first}`);
      if (target instanceof HTMLElement) target.focus({ preventScroll: false });
      return;
    }

    setStatus("sending");

    const subject = `Project enquiry — ${values.projectType} (${values.budget})`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Company: ${values.company.trim() || "—"}`,
      `Project type: ${values.projectType}`,
      `Budget: ${values.budget}`,
      "",
      "Project details:",
      values.message.trim(),
      "",
      "— Sent from the V3i Technology project showcase",
    ].join("\n");

    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftHref(href);

    timer.current = window.setTimeout(() => {
      setStatus("ready");
      window.location.href = href;
    }, 650);
  };

  if (status === "ready") {
    return (
      <div className="rounded-2xl border border-white/10 bg-panel/60 p-8 backdrop-blur-xl sm:p-10" role="status" aria-live="polite">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em] text-white">Your email draft is ready.</h3>
        <p className="mt-3 max-w-md text-[0.875rem] leading-relaxed text-mist">
          We have opened a pre-filled message in your email app addressed to{" "}
          <a href={`mailto:${site.email}`} className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-white">
            {site.email}
          </a>
          . Send it whenever you are ready — nothing is submitted until you do.
        </p>

        <div className="mt-6 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-amber-200/80">Submission notice</p>
          <p className="mt-2 text-[0.75rem] leading-relaxed text-white/55">
            This site does not run a form backend or email service, so the form cannot deliver messages on its own and
            no data is stored anywhere. The email draft is the working alternative.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={draftHref}
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[0.8125rem] font-medium text-void transition-colors hover:bg-white/90"
          >
            Open the draft again
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-[0.8125rem] text-white transition-colors hover:border-white/35"
          >
            Call {site.phone}
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setValues(initialValues);
              setDraftHref("");
            }}
            className="inline-flex h-11 items-center justify-center rounded-full px-4 text-[0.8125rem] text-white/45 transition-colors hover:text-white"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/10 bg-panel/50 p-6 backdrop-blur-xl sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className="field"
            placeholder="Your name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            required
          />
        </Field>

        <Field label="Email" htmlFor="contact-email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            placeholder="you@company.com"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            required
          />
        </Field>

        <Field label="Company" htmlFor="contact-company" hint="Optional">
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            className="field"
            placeholder="Organisation"
            value={values.company}
            onChange={update("company")}
          />
        </Field>

        <Field label="Project type" htmlFor="contact-projectType" error={errors.projectType}>
          <select
            id="contact-projectType"
            name="projectType"
            className={cn("field appearance-none pr-9", !values.projectType && "text-white/35")}
            value={values.projectType}
            onChange={update("projectType")}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "contact-projectType-error" : undefined}
            required
          >
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-void text-white">
                {type}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span id="contact-budget-label" className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/45">
              Budget range
            </span>
            <span className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/20">Select one</span>
          </div>
          <div
            id="contact-budget"
            role="group"
            tabIndex={-1}
            aria-labelledby="contact-budget-label"
            aria-describedby={errors.budget ? "contact-budget-error" : undefined}
            className="flex flex-wrap gap-2 rounded-lg outline-none focus-visible:ring-1 focus-visible:ring-cyan/40"
          >
            {budgets.map((budget) => {
              const selected = values.budget === budget;
              return (
                <button
                  key={budget}
                  type="button"
                  onClick={() => {
                    setValues((current) => ({ ...current, budget }));
                    setErrors((current) => ({ ...current, budget: undefined }));
                  }}
                  aria-pressed={selected}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-[0.72rem] transition-colors",
                    selected
                      ? "border-cyan/50 bg-cyan/10 text-white"
                      : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80",
                  )}
                >
                  {budget}
                </button>
              );
            })}
          </div>
          {errors.budget ? (
            <p id="contact-budget-error" className="mt-2 text-[0.7rem] text-rose-300/90">
              {errors.budget}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <Field label="Project brief" htmlFor="contact-message" error={errors.message}>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              className="field resize-y"
              placeholder="What are you building, who is it for, and what has to be true when it launches?"
              value={values.message}
              onChange={update("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              required
            />
          </Field>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[19rem] text-[0.68rem] leading-relaxed text-white/35">
          No backend is connected. Submitting opens a pre-filled email — nothing is stored or transmitted by this page.
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-[3.25rem] shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.8125rem] font-medium text-void transition-all duration-300 hover:bg-white/90 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-void/25 border-t-void" aria-hidden="true" />
              Preparing draft
            </>
          ) : (
            <>
              Send project brief
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/45">
          {label}
        </label>
        {hint ? <span className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/20">{hint}</span> : null}
      </div>
      <div className="relative">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-[0.7rem] text-rose-300/90">
          {error}
        </p>
      ) : null}
    </div>
  );
}
