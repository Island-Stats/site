import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
	// Get the player's uuid from the url
	const { searchParams } = new URL(request.url);
	const uuid = searchParams.get("uuid");

	const game = searchParams.get("game");

	const revalidateTime = 30; // 30 seconds
	let req = await fetch(`http://localhost:3000/files/${uuid}.json`, {
		cache: "default",	

	});

	const lastModified = new Date(req.headers.get("last-modified") ?? 0).getTime();
	const now = Date.now();

	console.log("Last modified", lastModified);
	console.log("Current time", now);
	console.log("Last modified Human", new Date(lastModified));
	console.log("Current time Human", new Date(now));
	console.log(lastModified + revalidateTime * 1000 < now)

	if (lastModified + revalidateTime * 1000 < now) {
		// What does the above line do?
		// It checks if the last modified time + the revalidate time is less than the current time
		// If it is, then the cache is stale and we need to revalidate
		console.log("Cache stale");

		req = await fetch(`http://localhost:3000/files/${uuid}.json`, {
			/* next: {
				revalidate: revalidateTime,
			}, */
		});
	} else {
		console.log("Cache hit");
	}

	const text = await req.text();
	const json = JSON.parse(text);

	if (game != "" && game != null) {
		json.data = json.data[game];
		return NextResponse.json(json);
	}

	return NextResponse.json(json);
}
