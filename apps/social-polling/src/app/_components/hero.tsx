import { Button } from "@nextui-org/react";
import { ChevronRightIcon, MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

import AnimatedGradientText from "~/components/magicui/animated-gradient-text";
import type { Category } from "~/lib/categories";
import { categories } from "~/lib/categories";
import { SearchForm } from "./search-form";

export function Hero() {
	return (
		<div className="relative -mt-28 mb-4 flex items-center justify-center py-[24vh] sm:pt-[26vh]">
			<div className="relative flex w-full flex-col items-center gap-6 px-6 text-center">
				<div className="flex w-full flex-col items-center gap-2 pb-8">
					<Link href="/ai" className="z-10 flex items-center justify-center">
						<AnimatedGradientText>
							🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-400/80" />{" "}
							<span className="animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
								Introducing The Liaison AI
							</span>
							<ChevronRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
						</AnimatedGradientText>
					</Link>
					<h1 className="font-heading text-balance bg-gradient-to-br from-black from-40% to-black/40 bg-clip-text py-6 text-5xl font-bold leading-none tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-7xl">
						Ask The Liaison
					</h1>
					<p className="max-w-[60rem] text-pretty text-lg tracking-tight text-gray-500 md:text-xl">
						<strong>Speak Your Mind. Find Your People.</strong> <br />
						Unfiltered opinions on life, love, and everything in between.
					</p>
				</div>
				<div className="relative z-10 m-auto flex w-full flex-col rounded-full sm:max-w-xl">
					<SearchForm />
				</div>

				<div className="mx-auto flex max-w-sm flex-wrap items-center justify-center gap-2 whitespace-nowrap px-4 text-sm md:max-w-xl lg:max-w-2xl">
					{categories.map((category, idx) => (
						<CategoryCTA key={`${category.name}-${idx}`} {...category} />
					))}
				</div>
			</div>
		</div>
	);
}

export function CategoryCTA({ name, href, icon, color }: Category) {
	return (
		<Button
			as={Link}
			href={href}
			endContent={<MoveUpRightIcon width={15} height={15} />}
			startContent={icon}
			variant="flat"
			color={color}
		>
			{name}
		</Button>
	);
}
