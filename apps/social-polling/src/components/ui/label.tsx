"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import type React from "react";

import { cn } from "~/lib/utils";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = ({
	ref,
	className,
	...props
}: React.HTMLAttributes<HTMLLabelElement> & {
	ref?: React.RefObject<HTMLLabelElement>;
}) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(labelVariants(), className)}
		{...props}
	/>
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };