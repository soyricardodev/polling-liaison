import type React from "react";

import { cn } from "@theliaison/ui";
import { ExternalLink } from "../external-link";

export function FooterText({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"px-2 text-center text-xs leading-normal text-muted-foreground",
				className,
			)}
			{...props}
		>
			Open source AI chatbot built with{" "}
			<ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{" "}
			<ExternalLink href="https://github.com/vercel/ai">
				Vercel AI SDK
			</ExternalLink>
			.
		</p>
	);
}
