import clientPromise from "@/utils/mongodb";
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

	let dbOffline = false;
	let playerCollection;
	let player;

	try {
		const db = (await clientPromise).db(process.env.MONGODB_DB);
		playerCollection = db.collection("players");

		player = await playerCollection.findOne({ uuid });
	} catch {
		dbOffline = true;
	}

	if (
		(player == null ||
			Date.now() - player.last_modified! > revalidateTime * 1000) &&
		process.env.CACHE_ONLY != "true" &&
		dbOffline
	) {
		const res = await fetch(`http://localhost:3000/files/${uuid}.json`);

		if (res.status == 404) {
			return NextResponse.json({ error: "Player not found" }, { status: 404 });
		}

		const resJSON = await res.json();

		if (resJSON.username == undefined) {
			resJSON.username = (await getMojangProfile(resJSON.uuid))?.name;
		}

		player = resJSON;
		player!.last_modified = Date.now();

		try {
			const result = await playerCollection!.updateOne(
				{ uuid },
				{ $set: player },
				{ upsert: true }
			);

			if (result.upsertedId) {
				player!._id = result.upsertedId;
			}
		} catch {}
	}

	if (player == null) {
		if (process.env.CACHE_ONLY == "true") {
			return NextResponse.json(
				{ error: "Player not in cache" },
				{ status: 404 }
			);
		} else {
			return NextResponse.json({ error: "Player not found" }, { status: 404 });
		}
	}

	if (game != "" && game != null) {
		if (player!.games[game] == undefined) {
			return NextResponse.json({ error: "Game not found" }, { status: 404 });
		}

		player!.games = { [game]: player!.games[game] };
	}

	return NextResponse.json(player);
}
