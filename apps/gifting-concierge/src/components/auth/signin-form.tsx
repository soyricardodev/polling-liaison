"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { SocialAuth } from "./social-auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { z } from "zod";

import { cn } from "@theliaison/ui";
import { Button } from "@theliaison/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@theliaison/ui/form";
import { Input } from "@theliaison/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { signInWithEmail } from "./actions";

const FormSchema = z.object({
	email: z.string().email({ message: "Invalid Email Address" }),
	password: z.string().min(6, { message: "Password is too short" }),
});

export default function SignIn() {
	const queryString =
		typeof window !== "undefined" ? window?.location.search : "";
	const urlParams = new URLSearchParams(queryString);

	// Get the value of the 'next' parameter
	const next = urlParams.get("next");

	return (
		<div className="w-full sm:w-[26rem] shadow sm:p-5  border dark:border-zinc-800 rounded-md">
			<div className="p-5 space-y-5">
				<div className="text-center space-y-3">
					<h1 className="font-bold">Sign in to The Liaison</h1>
					<p className="text-sm">Welcome back! Please sign in to continue</p>
				</div>
				<SocialAuth redirectTo={next || "/"} />
				<div className="flex items-center gap-5">
					<div className="flex-1 h-[0.5px] w-full bg-zinc-400 dark:bg-zinc-800" />
					<div className="text-sm">or</div>
					<div className="flex-1 h-[0.5px] w-full bg-zinc-400 dark:bg-zinc-800" />
				</div>
				<SignInForm redirectTo={next || "/"} />
			</div>
		</div>
	);
}

export function SignInForm({ redirectTo }: { redirectTo: string }) {
	const [passwordReveal, setPasswordReveal] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!isPending) {
			startTransition(async () => {
				const error = await signInWithEmail({
					email: data.email,
					password: data.password,
					redirectTo,
				});
				if (error != null) {
					toast.error(error);
				}
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className=" font-semibold test-sm">
								Email Address
							</FormLabel>
							<FormControl>
								<Input
									className="h-8"
									placeholder="example@gmail.com"
									type="email"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-sm font-semibold">Password</FormLabel>
							<FormControl>
								<div className=" relative">
									<Input
										className="h-8"
										type={passwordReveal ? "text" : "password"}
										{...field}
									/>
									<button
										className="absolute right-2 top-[30%] cursor-pointer group"
										onClick={() => setPasswordReveal(!passwordReveal)}
										type="button"
									>
										{passwordReveal ? (
											<FaRegEye className=" group-hover:scale-105 transition-all" />
										) : (
											<FaRegEyeSlash className=" group-hover:scale-105 transition-all" />
										)}
									</button>
								</div>
							</FormControl>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full h-8 bg-indigo-500 hover:bg-indigo-600 transition-all text-white flex items-center gap-2"
				>
					<AiOutlineLoading3Quarters
						className={cn(!isPending ? "hidden" : "block animate-spin")}
					/>
					Continue
				</Button>
			</form>
			<div className="text-center text-sm">
				<p>
					Doest not have account yet?{" "}
					<Link
						href={redirectTo ? `/register?next=${redirectTo}` : "/register"}
						className="text-blue-400"
					>
						Register
					</Link>
				</p>
			</div>
		</Form>
	);
}
