import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { PollWithOptionsAndVotes } from "~/types/poll";
import { createClient } from "~/utils/supabase/server";
import { PollCard, PollsContainer, NewPollsAproach } from "./polls";

export async function MainExplore() {
	const supabase = createClient();
	const pollsWithOptionsQuery = supabase.from("polls").select(`
    id,
    question,
    options (id, text),
		votes (id, poll_id, option_id, user_id),
		users (id, username, avatar_url),
		image
  `);

	const { data } = await pollsWithOptionsQuery;

	function calculateVotes() {
		const votesDetailsArray: PollWithOptionsAndVotes[] = [];

		if (!data) return votesDetailsArray;

		for (const pollData of data) {
			const votesByOption: Record<number, number> = {};
			const totalVotes = pollData.votes.length;

			for (const option of pollData.options) {
				votesByOption[option.id] = 0;
			}

			for (const vote of pollData.votes) {
				votesByOption[vote.option_id]++;
			}

			const votesPercentage: Record<number, number> = {};
			for (const optionId in votesByOption) {
				const votes = votesByOption[optionId];
				const percentage =
					totalVotes > 0 ? ((votes ?? 0) / (totalVotes ?? 0)) * 100 : 0;
				votesPercentage[optionId] = percentage;
			}

			const dataToPush: PollWithOptionsAndVotes = {
				id: pollData.id,
				question: pollData.question,
				image: pollData.image ?? undefined,
				options: pollData.options.map((option) => ({
					...option,
					votes: votesByOption[option.id],
					percentage: votesPercentage[option.id],
				})),
				user: {
					id: pollData.users?.id ?? "",
					username: pollData.users?.username ?? "",
					avatar_url: pollData.users?.avatar_url ?? null,
				},
			};

			votesDetailsArray.push(dataToPush);
		}

		return votesDetailsArray;
	}

	const dataToRender = calculateVotes();

	return (
		<div className="mx-auto flex max-w-7xl flex-col px-6 pb-20">
			<div className="grid gap-4">
				<h2 className="text-4xl font-semibold">Explore</h2>
				<ExplorePolls featuredPolls={dataToRender} newPolls={dataToRender} />
			</div>
		</div>
	);
}

export function ExplorePolls({
	newPolls,
	featuredPolls,
}: {
	newPolls: PollWithOptionsAndVotes[];
	featuredPolls: PollWithOptionsAndVotes[];
}) {
	return (
		<Tabs defaultValue="new" className="grid gap-6">
			<TabsList className="flex items-center gap-2 justify-start bg-transparent">
				<TabsTrigger value="new">New Polls</TabsTrigger>
				<TabsTrigger value="featured">Featured</TabsTrigger>
			</TabsList>
			<TabsContent value="new" className="mt-0">
				{newPolls != null ? <NewPollsAproach polls={newPolls} /> : null}
			</TabsContent>
			<TabsContent value="featured" className="mt-0">
				{featuredPolls != null ? <Polls polls={featuredPolls} /> : null}
			</TabsContent>
		</Tabs>
	);
}

export function Polls({ polls }: { polls: PollWithOptionsAndVotes[] }) {
	return (
		<PollsContainer>
			{polls.map((poll, idx) => (
				<PollCard poll={poll} key={`${poll.id}-${idx}`} />
			))}
		</PollsContainer>
	);
}
