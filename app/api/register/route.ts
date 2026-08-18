import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";

// Integration point for future delivery targets (email, CRM, webhook, n8n,
// Airtable, Google Sheets, Supabase, ...). Add the integration call(s) here —
// the form contract (RegistrationFormValues) stays the same regardless of
// where submissions end up, so the frontend never needs to change.
async function deliverRegistration(data: unknown) {
  console.log("New training session request:", data);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  try {
    await deliverRegistration(parsed.data);
  } catch (error) {
    console.error("Failed to deliver registration:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
