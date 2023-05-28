import MainSearch from "@/components/core/main-search";
import NoticeBoard from "@/components/core/notice-board";
import Error from "@/components/core/error";
import Favorites from "@/components/core/favorites";
import Profiles from "@/components/core/profiles";
import Rank from "@/components/player/rank";
import FavoriteButton from "@/components/buttons/favorite";
import ShareButton from "@/components/buttons/share";
import { PlayerData, Size, getMojangProfile, getPlayerData, getPlayerHead } from "@/utils/player";
import { Metadata } from "next";
import Faction from "@/components/player/faction";
import TGTTOS from "@/components/stats/tgttos";
import HoleInTheWall from "@/components/stats/hole-in-the-wall";
import SkyBattle from "@/components/stats/sky-battle";
import BattleBox from "@/components/stats/battle-box";
import CoreData from "@/components/player/core-data";

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
		title: `${player.name}`,
		icons: {
			icon: getPlayerHead(player.id, Size.small),
		},
		openGraph: {
			title,
			images: [
				{
					url: getPlayerHead(player.id, Size.full),
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
					url: getPlayerHead(player.id, Size.full),
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
		const playerData = await getPlayerData(player.id);
		let data;
		if (!playerData) {
			data = {
				tgttos: {},
				hole_in_the_wall: {},
				sky_battle: {},
				battle_box: {},
			};
		} else {
			data = playerData.data;
		}
		return (
			<main className="backdrop-blur-lg backdrop-brightness-50 w-3/5 mx-auto min-h-full">
				<div
					id="profile"
					className="flex flex-wrap justify-items-center gap-3 py-5 text-2xl md:text-4xl"
				>
					<span>Stats for</span>
					<Rank rank={(playerData?.rank ?? "player")} />
					<span className="font-semibold">{player.name}</span>
					<div className="w-full text-sm">
						<FavoriteButton uuid={player.id} />
						<ShareButton username={player.name} />
					</div>
				</div>
				<div
					id="levels"
					className="bg-black bg-opacity-30 p-5 ml-[calc(-1*20px)] mr-[calc(-1*20px)]"
				>
					<div className="w-full grid grid-cols-1 gap-x-1 gap-y-5">
						<Faction />
						<CoreData />
					</div>
				</div>
				<div id="stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-5 mt-4">
					<div className="col-span-full flex flex-col md:flex-row md:items-end">
					<p className="text-2xl md:text-4xl font-semibold pr-1">Game Stats</p>
					<p className="text-neutral-400 text-base">Total games played: {data.games_played?.toLocaleString() ?? 0}</p>
					</div>
					<TGTTOS data={data.tgttos as PlayerData["data"]["tgttos"]} />
					<HoleInTheWall data={data.hole_in_the_wall as PlayerData["data"]["hole_in_the_wall"]} />
					<SkyBattle data={data.sky_battle as PlayerData["data"]["sky_battle"]} />
					<BattleBox data={data.battle_box as PlayerData["data"]["battle_box"]} />
				</div>
			</main>
		);
	}
}
