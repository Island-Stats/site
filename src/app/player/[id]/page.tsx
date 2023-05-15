import MainSearch from "@/components/core/main-search";
import NoticeBoard from "@/components/core/notice-board";
import Error from "@/components/core/error";
import Favorites from "@/components/core/favorites";
import Profiles from "@/components/core/profiles";
import Rank from "@/components/player/rank";
import FavoriteButton from "@/components/buttons/favorite";
import ShareButton from "@/components/buttons/share";
import { Size, getMojangProfile, getPlayerHead } from "@/utils/player";
import { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	let title;
	const player = await getMojangProfile(params.id);
	if (!player) {
		return {};
	}

	return {
		title,
		icons: {
			icon: getPlayerHead(params.id, Size.small),
		},
		openGraph: {
			title,
			images: [
				{
					url: getPlayerHead(params.id, Size.full),
				},
			],
			description: "",
			type: "profile",
			username: player.name,
			siteName: "Island Stats",
		},
		twitter: {
			title,
			card: "summary_large_image",
			images: [
				{
					url: getPlayerHead(params.id, Size.full),
				},
			],
		},
	};
}

export default async function Stats({ params }: { params: { id: string } }) {
	let error: string | null = null;
	const player = await getMojangProfile(params.id);

	// Check if player has MCC Island profile
	if (!player && params.id.length == 32) {
		// If "id" was a UUID then player has no MCC Island profile
		error = "Player has no MCC Island profile.";
	} else if (!player) {
		// If "id" was a username then player does not exist
		error = `Player with username "${params.id}" does not exist.`;
	}

	// If player exists then display their stats
	if (!player) {
		return (
			<main className="grid">
				<MainSearch />
				<Error message={error as string} />
				{/* @ts-expect-error Async Server Component */}
				<NoticeBoard />
				{/* @ts-expect-error Async Server Component */}
				<Favorites />
				{/* @ts-expect-error Async Server Component */}
				<Profiles />
			</main>
		);
	} else {
		return (
			<main className="backdrop-blur-lg backdrop-brightness-50 w-3/5 mx-auto min-h-full">
				<div className="flex flex-wrap justify-items-center gap-3 py-5 text-4xl">
					<span>Stats for</span>
					<Rank rank={"noxcrew"} />
					<span className="font-semibold">{player.name}</span>
					<div className="w-full text-sm">
						<FavoriteButton uuid={player.id} />
						<ShareButton username={player.name} />
					</div>
				</div>
			</main>
		);
	}
}
