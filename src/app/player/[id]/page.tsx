import MainSearch from "@/components/core/main-search";
//import NoticeBoard from "@/components/core/notice-board";
import Error from "@/components/core/error";
import Favorites from "@/components/core/favorites";
import Profiles from "@/components/core/profiles";
import Rank from "@/components/player/rank";
import FavoriteButton from "@/components/buttons/favorite";
import ShareButton from "@/components/buttons/share";
import {
	Size,
	getMojangProfile,
	getPlayerData,
	getPlayerHead,
	isValidPlayer,
} from "@/utils/player";
import { Metadata } from "next";
import Faction from "@/components/player/faction";
import TGTTOSStats from "@/components/stats/tgttos";
import HoleInTheWallStats from "@/components/stats/hole-in-the-wall";
import SkyBattleStats from "@/components/stats/sky-battle";
import BattleBoxStats from "@/components/stats/battle-box";
import CoreData from "@/components/player/core-data";
import {
	BattleBox,
	HoleInTheWall,
	Player,
	SkyBattle,
	TGTToS,
} from "@/utils/mongoose";

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	let title;
	const player = await getMojangProfile(params.id);
	const playerDataRes = await fetch(
		`http://localhost:3000/api/player/${player!.id}`,
		{ method: "POST" }
	);

	const playerData = await playerDataRes!.json();

	if (!player || playerData.error) {
		return {};
	}

	title = `${player.name} | Island Stats`;

	return {
		title: `${player.name}`,
		icons: {
			icon: getPlayerHead(player.id, Size.small),
		},
		description: `${player.name}'s MCC Island stats.`,
		openGraph: {
			title,
			images: [
				{
					url: getPlayerHead(player.id, Size.full),
				},
			],
			description: `${player.name}'s MCC Island stats.`,
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

export const revalidate = 0;

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

	const playerDataRes = await fetch(
		`http://localhost:3000/api/player/${player!.id}`,
		{ method: "POST" }
	);

	const playerData = await playerDataRes!.json();

	if (playerData.error && !error) {
		error = "Failed to fetch player games.";
	}

	// If player exists then display their stats
	if (!player || playerData.error) {
		return (
			<main className="grid">
				<MainSearch />
				<Error message={error as string} />
				{/* <NoticeBoard /> */}
				<Favorites />
				<Profiles />
			</main>
		);
	} else {
		let games;
		if (!playerData) {
			games = {
				tgttos: {},
				hole_in_the_wall: {},
				sky_battle: {},
				battle_box: {},
			};
		} else {
			games = playerData.games;
		}
		return (
			<main className="backdrop-blur-lg backdrop-brightness-50 w-3/5 mx-auto min-h-full">
				<div
					id="profile"
					className="flex flex-wrap justify-items-center gap-3 py-5 text-2xl md:text-4xl"
				>
					<span>Stats for</span>
					<Rank rank={playerData?.rank ?? "player"} />
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
				<div
					id="stats"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-5 mt-4"
				>
					<div className="col-span-full flex flex-col md:flex-row md:items-end">
						<p className="text-2xl md:text-4xl font-semibold pr-1">
							Game Stats
						</p>
						<p className="text-neutral-400 text-base">
							Total games played:{" "}
							{playerData.games_played?.toLocaleString() ?? 0}
						</p>
					</div>
					<TGTTOSStats games={games!.tgttos as TGTToS} />
					<HoleInTheWallStats
						games={games!.hole_in_the_wall as HoleInTheWall}
					/>
					<SkyBattleStats games={games!.sky_battle as SkyBattle} />
					<BattleBoxStats games={games!.battle_box as BattleBox} />
				</div>
			</main>
		);
	}
}
