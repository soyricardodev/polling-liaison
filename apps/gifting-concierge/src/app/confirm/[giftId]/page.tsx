import { cn } from "@theliaison/ui";
import { buttonVariants } from "@theliaison/ui/button";
import {
	ChevronRightIcon,
	GiftIcon,
	HeartHandshakeIcon,
	ZapIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import giftboxGIF from "~/assets/giftbox2.gif";
import { createClient } from "~/supabase/server";
import { ConfirmGift } from "./confirm-gift";
import ShippingForm from "./details/shipping-form";

export default async function Confirm({
	params: { giftId },
}: {
	params: { giftId: string };
}) {
	const supabase = createClient();

	const { data, error } = await supabase
		.from("gifts")
		.select("id, recipient_id, sender_id")
		.eq("id", giftId)
		.single();

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center">
				<h1>This gift does not exist anymore.</h1>
				<Link
					href="/gifts"
					className={cn(
						buttonVariants(),
						"bg-white text-black hover:text-black hover:bg-white/90",
					)}
				>
					Go back to the list of gifts
				</Link>
			</div>
		);
	}

	return (
		<div className="flex flex-col relative z-20">
			<section className="w-full py-12 md:py-24 lg:py-32 h-[calc(100vh-60px)] flex flex-col items-center justify-center">
				<Image
					src={giftboxGIF}
					alt="Giftbox"
					className="mx-auto max-w-md hover:scale-105 transition-all hover:[filter:drop-shadow(0_0_8px_#f0f0f0)] w-48 md:w-64"
					width={192}
					height={192}
				/>
				<div className="relative mx-auto flex max-w-2xl flex-col items-center">
					<p className="rounded-full h-[32px] [line-height:0] bg-[linear-gradient(90deg,#02fcef70,#ffb52b70_50%,#a02bfe70)] mb-10 inline-flex items-center justify-center text-[14px] animate-background-shine bg-[length:190%_100%]">
						<span className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-1 leading-none m-[1px] rounded-full w-[calc(100%-2px)] h-[calc(32px-2px)] bg-[#0b0e14] text-white">
							Your Gifting Concierge
						</span>
					</p>
					<h1 className="text-center bg-[linear-gradient(110deg,#f1f1f1,45%,#DBD0C5,55%,#f1f1f1)] bg-[length:190%_100%] bg-clip-text text-transparent font-medium tracking-tighter text-4xl/none sm:text-5xl/none text-pretty">
						Someone wants to{" "}
						<span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#DBD0C5,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-transparent leading-tight">
							send you a gift!
						</span>
					</h1>
					<p className="sans mb-8 mt-4 max-w-[30rem] text-center leading-7 text-base md:text-[1.125rem] md:leading-[1.5] text-default-800 font-normal">
						Enter your address{" "}
						<strong className="hidden sm:inline">securely</strong> to receive
						your gift! <br />
						<strong>The Liaison</strong> will handle the rest.
					</p>
					<div className="flex flex-col justify-center gap-4 w-full max-w-xl">
						<ConfirmGift>
							<ShippingForm
								hideTitle
								giftId={data.id}
								recipientId={data.recipient_id}
								senderId={data.sender_id}
							/>
						</ConfirmGift>
						<Link
							href="/how-it-works"
							className={cn(
								buttonVariants({ variant: "ghost" }),
								"pl-5 pr-2 text-base h-12 rounded-full text-[#f1f7feb5] hover:text-[#fcfdffef] transition-colors",
							)}
						>
							How it works
							<span className="text-[#70757E]">
								<ChevronRightIcon />
							</span>
						</Link>
					</div>
				</div>
			</section>
			<div className="w-full mx-auto flex items-center justify-center gap-6 my-20 py-12">
				<div className="w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
					<InstructionCard
						icon={<HeartHandshakeIcon className="text-secondary" />}
						title="Secure"
						description={
							<p>
								Rest assured, your address will only be used to deliver your
								gift and <strong>will remain private</strong>. The sender will
								not know your address.
							</p>
						}
					/>
					<InstructionCard
						icon={<ZapIcon className="text-secondary" />}
						title="Fast"
						description={
							<p>
								Once you provide your address, we'll take care of the rest and
								deliver your gift promptly.
							</p>
						}
					/>
					<InstructionCard
						icon={<GiftIcon className="text-secondary" />}
						title="Surprise"
						description={
							<p>
								The gift sender wanted to keep this gift a surprise, so{" "}
								<strong>enjoy the anticipation</strong>.
							</p>
						}
					/>
				</div>
			</div>
		</div>
	);
}

function InstructionCard({
	description,
	icon,
	title,
}: { icon: JSX.Element; title: string; description: string | JSX.Element }) {
	return (
		<div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none border-transparent bg-default-400/10 backdrop-blur-lg backdrop-saturate-[1.8]">
			<div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large gap-2 pb-0">
				<div className="flex justify-center p-2 rounded-full items-center bg-primary/80 text-secondary">
					{icon}
				</div>
				<div className="text-base font-semibold">{title}</div>
			</div>

			<div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased [&>p]:font-normal [&>p]:text-base [&>p]:text-default-600">
				{description}
			</div>
		</div>
	);
}
