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
