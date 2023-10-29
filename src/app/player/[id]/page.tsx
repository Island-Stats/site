import MainSearch from "@/components/core/main-search";
//import NoticeBoard from "@/components/core/notice-board";
import Error from "@/components/core/error";
import Favorites from "@/components/core/favorites";
import Profiles from "@/components/core/profiles";
import NameTag from "@/components/player/nametag";
import FavoriteButton from "@/components/utils/favorite";
import ShareButton from "@/components/utils/share";
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

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	let title;
	const player = await getMojangProfile(params.id);
	const playerDataRes = await fetch(
		`http://localhost:3000/api/player/${params.id}`,
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

const testData = {
	currentFaction: "aqua",
	red: {
		level: 10,
		prestige: 0,
		current: 592,
		max: 1000,
	},
	orange: {
		level: 32,
		prestige: 1,
		current: 642,
		max: 1000,
	},
	yellow: {
		level: 0,
		prestige: 0,
		current: 0,
		max: 1000,
	},
	lime: {
		level: 8,
		prestige: 0,
		current: 320,
		max: 1000,
	},
	green: {
		level: 0,
		prestige: 0,
		current: 0,
		max: 1000,
	},
	cyan: {
		level: 42,
		prestige: 1,
		current: 1642,
		max: 2000,
	},
	aqua: {
		level: 63,
		prestige: 2,
		current: 753,
		max: 1000,
	},
	blue: {
		level: 0,
		prestige: 0,
		current: 0,
		max: 1000,
	},
	purple: {
		level: 26,
		prestige: 0,
		current: 294,
		max: 1000,
	},
	pink: {
		level: 0,
		prestige: 0,
		current: 0,
		max: 1000,
	},
};

export const revalidate = 0;

export default async function Stats({ params }: { params: { id: string } }) {
	let error: string | null = null;
	// TODO: Revert to const
	let player = await getMojangProfile(params.id);

	// Check if player has MCC Island profile
	if (!player && params.id.length == 32) {
		// If "id" was a UUID then player has no MCC Island profile
		error = "Player has no MCC Island profile.";
	} else if (!player) {
		// If "id" was a username then player does not exist
		error = `Player with username "${params.id}" does not exist.`;
	}

	const playerDataRes = await fetch(
		`http://localhost:3000/api/player/${params.id}`,
		{ method: "POST" }
	);

	const playerData = await playerDataRes!.json();

	if (playerData.error && !error) {
		error = "Failed to fetch player games.";
	}

	player = {
		id: "4e832e0d14b64f8face2280a9bf9dd98",
		name: "TheMysterys",
	};

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
		return (
			<main className="backdrop-blur-lg backdrop-brightness-50 md:w-4/5 md:mx-auto min-h-full">
				<div
					id="profile"
					className="flex flex-wrap justify-items-center gap-3 py-5 text-2xl md:text-4xl"
				>
					<div className="flex flex-col sm:flex-row sm:space-x-2">
						<span>Stats for</span>
						<div className="flex">
							<NameTag
								{...{
									rank: playerData.rank,
									mcc_plus: {
										active: true,
										since: new Date("10/10/2022"),
										till: new Date("10/10/2023"),
									},
									playerName: player.name,
								}}
							/>
						</div>
					</div>
					<div className="w-full text-sm">
						<FavoriteButton uuid={player.id} />
						<ShareButton username={player.name} />
					</div>
				</div>
				<div
					id="levels"
					className="bg-black bg-opacity-30 p-5 ml-[calc(-1*20px)] mr-[calc(-1*20px)]"
				>
					<div className="w-full">
						<Faction {...testData} />
					</div>
				</div>
				<div
					id="stats"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-5 mt-4"
				>
					Will contain core stats about the player
				</div>
			</main>
		);
	}
}
