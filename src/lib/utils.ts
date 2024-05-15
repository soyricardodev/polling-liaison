import { type ClassValue, clsx } from "clsx";

import { extendTailwindMerge } from "tailwind-merge";

const COMMON_UNITS = ["small", "medium", "large"];

/**
 * We need to extend the tailwind merge to include NextUI's custom classes.
 *
 * So we can use classes like `text-small` or `text-default-500` and override them.
 */
const twMerge = extendTailwindMerge({
	extend: {
		theme: {
			opacity: ["disabled"],
			spacing: ["divider"],
			borderWidth: COMMON_UNITS,
			borderRadius: COMMON_UNITS,
		},
		classGroups: {
			shadow: [{ shadow: COMMON_UNITS }],
			"font-size": [{ text: ["tiny", ...COMMON_UNITS] }],
			"bg-image": ["bg-stripe-gradient"],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getSubscriptionProgress(endDatetime: string) {
	const today = new Date().getDate();
	const endDate = new Date(endDatetime).getDate();

	const remainingDays = endDate - today;
	const totalDaysInMonth = 31;
	const percentage = (remainingDays / totalDaysInMonth) * 100;

	return { remainingDays, percentage };
}

export function getTimeAgo(date: string) {
	const now = new Date();
	const then = new Date(date);

	const diffMs = now.getTime() - then.getTime();
	const diffSeconds = Math.floor(diffMs / 1000);

	let unit: "second" | "minute" | "hour" | "day";
	let value: number;

	if (diffMs < 0) {
		return "recently";
	}

	if (diffSeconds < 60) {
		unit = "second";
		value = Math.floor(diffSeconds);
	} else if (diffSeconds < 3600) {
		unit = "minute";
		value = Math.floor(diffSeconds / 60);
	} else if (diffSeconds < 86400) {
		unit = "hour";
		value = Math.floor(diffSeconds / 3600);
	} else {
		unit = "day";
		value = Math.floor(diffSeconds / 86400);
	}

	return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}
