import { Button } from "@nextui-org/react";
import Link from "next/link";

import { createClient } from "~/utils/supabase/server";

type HeaderCTAProps =
	| {
			href: string;
			ctaText: string | JSX.Element;
	  }
	| {
			href?: never;
			ctaText?: never;
	  };

export async function HeaderCTA({
	href = "/create",
	ctaText = (
		<>
			<span className="hidden md:block">Create poll</span>
			<span className="block md:hidden">Create</span>
		</>
	),
}: HeaderCTAProps) {
	const supabase = createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return <AuthCTA />;
	}

	return (
		<Button
			href={href}
			as={Link}
			color="primary"
			size="sm"
			radius="full"
			variant="bordered"
		>
			{ctaText}
		</Button>
	);
}

function AuthCTA() {
	return (
		<>
			<Button
				href="/login"
				as={Link}
				color="primary"
				size="sm"
				radius="full"
				variant="bordered"
			>
				Login
			</Button>
			<Button
				href="/signup"
				as={Link}
				color="primary"
				size="sm"
				radius="full"
				className="ml-2"
			>
				Signup
			</Button>
		</>
	);
}
