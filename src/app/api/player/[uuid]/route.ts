import { Player, playerModel } from "@/utils/mongoose";
import { getMojangProfile } from "@/utils/player";
import { NextResponse } from "next/server";

const revalidateTime = 5 * 60; // 5 minutes

export async function POST(
	request: Request,
	{ params }: { params: { uuid: string } }
) {
	// Get the player's uuid from the url
	const { searchParams } = new URL(request.url);
	const uuid = params.uuid;

	const game = searchParams.get("game");

	let player = await playerModel.findOne({ uuid }).exec();

	if (
		player == null ||
		Date.now() - player.last_modified! > revalidateTime * 1000 ||
		process.env.CACHE_ONLY != "true"
	) {
		const res = await fetch(`http://localhost:3000/files/${uuid}.json`);

		if (res.status == 404) {
			return NextResponse.json(
				{ error: "Player not found" },
				{ status: 404 }
			);
		}

		const resJSON = await res.json();

		if (player == null) {
			if (resJSON.username == undefined) {
				resJSON.username = (await getMojangProfile(resJSON.uuid))?.name;
			}

			player = new playerModel({
				uuid: resJSON.uuid,
				username: resJSON.username,
				rank: resJSON.rank,
				games: resJSON.games,
				games_played: resJSON.games_played,
				last_modified: Date.now(),
			});
		} else {
			player.username = resJSON.username;
			player.rank = resJSON.rank;
			player.games = resJSON.games;
			player.games_played = resJSON.games_played;
			player.last_modified = Date.now();
		}

		await player.save();
	}

	if (game != "" && game != null) {
		// Remove games that aren't the requested game but keep the games object

		if (player.games[game] == undefined) {
			return NextResponse.json(
				{ error: "Game not found" },
				{ status: 404 }
			);
		}

		const json = {
			uuid: player.uuid,
			username: player.username,
			rank: player.rank,
			games: { [game]: player.games[game] },
			games_played: player.games_played,
			last_modified: player.last_modified,
		};

		return NextResponse.json(json);
	}

	return NextResponse.json(player);
}
