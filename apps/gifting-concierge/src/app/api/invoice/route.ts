import { type NextRequest, NextResponse } from "next/server";
import type React from "react";
import { Resend } from "resend";
import { env } from "~/env";
import { EmailTemplate } from "./email-template";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const { email, invoiceLink } = (await request.json()) as {
			email: string;
			invoiceLink: string;
		};

		const { data, error } = await resend.emails.send({
			from: "The Liaison <hello@theliaison.com>",
			to: [email],
			subject: "Your Gifting Concierge Invoice",
			react: EmailTemplate({ invoiceLink }) as React.ReactElement,
		});

		if (error) {
			return NextResponse.json({ error }, { status: 500 });
		}

		return NextResponse.json({ data });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
