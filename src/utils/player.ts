export enum Size {
	small = 32,
	medium = 64,
	large = 128,
	full = 512,
}

export interface MojangProfile {
	id: string;
	name: string;
}

const usernameURL = "https://mojang-api.svc.noxcrew.online/username/";
const uuidURL = "https://mojang-api.svc.noxcrew.online/uuid/";

/**
 * Get the URL of a player's head
 *
 * @param uuid UUID of the player
 * @param size Size of player head (default: Medium | 64px)
 * @returns URL of player head
 */
export function getPlayerHead(uuid: string, size: Size = Size.medium) {
	return `https://crafatar.com/avatars/${uuid}?size=${size}&overlay`;
}

/**
 * Get the mojang profile of a player
 *
 * @param data UUID or Username of player
 * @returns Mojang Profile of player
 */
export async function getMojangProfile(
	data: string
): Promise<MojangProfile | undefined> {
	try {
		let url = uuidURL;
		if (data.length > 16) url = usernameURL;
		const response = await fetch(url + data, { next: { revalidate: 60 * 30 } }); // Cache for 30 minutes
		if (!response.ok) return undefined;
		return await response.json();
	} catch (ignored) {
		return;
	}
}

/**
 * Player Data type
 */
export type PlayerData = {
	uuid: string;
	rank: string;
	data: {
		sky_battle: {
			survival_first_place: number;
			survival_top_three: number;
			survival_top_five: number;
			survival_top_eight: number;
			survival_top_fifty_percent: number;
			players_killed: number;
			games_played: number;
		};
		battle_box: {
			team_first_place: number;
			team_second_place: number;
			team_third_place: number;
			team_fourth_place: number;
			team_rounds_won: number;
			players_killed: number;
			games_played: number;
		};
		tgttos: {
			first_place: number;
			top_three: number;
			top_five: number;
			top_eight: number;
			top_fifty_percent: number;
			round_first_place: number;
			round_top_three: number;
			round_top_five: number;
			round_top_eight: number;
			round_top_fifty_percent: number;
			chickens_punched: number;
			games_played: number;
		};
		hole_in_the_wall: {
			first_place: number;
			top_three: number;
			top_five: number;
			top_eight: number;
			top_fifty_percent: number;
			walls_dodged: number;
			games_played: number;
		};
		games_played: number;
	};
};

export async function getPlayerData(id: string): Promise<PlayerData | undefined> {
	const response = await fetch(`http://localhost:3000/files/${id}.json`, {
		next: {
			revalidate: 0, // Cache for 5 minutes
		},
	});
	if (!response.ok) return undefined;
	return (await response.json());
}

export async function isValidPlayer(id: string): Promise<boolean> {
	const response = await fetch(`http://localhost:3000/files/${id}.json`, {
		next: {
			revalidate: 0, // Cache for 5 minutes
		},
	});
	if (!response.ok) return false;
	return true;
}