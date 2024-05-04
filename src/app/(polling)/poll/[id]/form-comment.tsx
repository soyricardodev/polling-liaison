"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { createClient } from "~/utils/supabase/client";

const submitComment = z.object({
	comment: z
		.string({ required_error: "Please enter a comment" })
		.min(1, { message: "Comment must be at least 1 character." }),
});

type FormValues = z.infer<typeof submitComment>;

export function FormComment({ pollId }: { pollId: number }) {
	const supabase = createClient();
	const form = useForm({
		resolver: zodResolver(submitComment),
		defaultValues: {
			comment: "",
		},
		mode: "onChange",
	});

	async function onSubmit(data: FormValues) {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();
		if (!user || error) {
			return toast.error("Sign in to comment");
		}
		const { error: insertCommentError } = await supabase
			.from("comments")
			.insert({
				content: data.comment,
				poll_id: pollId,
				user_id: user.id,
			});

		if (insertCommentError) {
			return toast.error("Error commenting");
		}

		toast.success("Comment added successfully!");
	}

	return (
		<Form {...form}>
			<form
				className="mb-2 mx-2 grid gap-1"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="comment"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder="Comment" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" size={"sm"} className="h-8">
					Submit
				</Button>
			</form>
		</Form>
	);
}