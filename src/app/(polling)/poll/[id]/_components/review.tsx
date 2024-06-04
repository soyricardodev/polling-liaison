"use client";

import { Icon } from "@iconify/react";
import { Tooltip, User } from "@nextui-org/react";
import type React from "react";
import { downvoteComment, upvoteComment } from "../../actions/comments";

export type ReviewType = {
	user: {
		name: string;
		avatar: string;
	};
	downvotes: number;
	upvotes: number;
	createdAt: string;
	rating: number;
	title: string;
	content: string;
	commentId: number;
};

export type ReviewProps = React.HTMLAttributes<HTMLDivElement> & ReviewType;

const Review = ({
	id,
	downvotes,
	upvotes,
	commentId,
	ref,
	children,
	user,
	title,
	content,
	rating,
	createdAt,
	...props
}: ReviewProps & {
	ref?: React.RefObject<HTMLDivElement>;
}) => (
	<div ref={ref} {...props}>
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<User
					avatarProps={{
						src: user.avatar,
					}}
					classNames={{
						name: "font-medium",
						description: "text-small",
					}}
					description={`commented ${createdAt}`}
					name={user.name}
				/>
			</div>
			<div className="flex items-center gap-1">
				<Tooltip content="Upvote">
					<button type="button" onClick={() => upvoteComment(commentId)}>
						<Icon icon="solar:round-arrow-up-bold-duotone" className="size-8" />
						{upvotes}
					</button>
				</Tooltip>
				<Tooltip content="Downvote">
					<button type="button" onClick={() => downvoteComment(commentId)}>
						<Icon
							icon="solar:round-arrow-down-bold-duotone"
							className="size-8"
						/>
						{downvotes}
					</button>
				</Tooltip>
			</div>
		</div>
		<div className="mt-4 w-full">
			<p className="text-default-900">{content || children}</p>
		</div>
	</div>
);

Review.displayName = "Review";

export default Review;
