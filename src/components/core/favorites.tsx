import Link from "next/link";
import PlayerHead from "../player/player-head";
import { cookies } from "next/headers";
import { getMojangProfile } from "@/utils/player";
import Image from "next/image";

export default function Favorites() {
	//const cookieStore = cookies();
	let favorites = { value: "" }; //cookieStore.get("favorites");

	if (!favorites || favorites.value == "") {
		return (
			<div className="relative p-5 grid grid-cols-4 space-x-2">
				<Image
					alt="question mark player head"
					src={"/images/q.png"}
					className="rounded-md pixelated m-auto"
					width={64}
					height={64}
				/>
				<div className="col-span-3">
					<p className="font-semibold text-lg">No favorites set!</p>
					<p className="pr-2">
						Why don{"'"}t you set a favorite? (Currently Disabled)
					</p>
				</div>
			</div>
		);
	} else {
		return favorites.value.split(",").map(async (uuid) => {
			const player = await getMojangProfile(uuid);
			if (!player) return;

			return (
				<Link
					key={uuid}
					href={"/player/" + uuid}
					className="grid grid-cols-4 space-x-2 p-5 border-2 border-transparent hover:border-sky-500 transition-colors duration-500"
				>
					<PlayerHead {...{ uuid, username: player.name }} />
					<div className="col-span-3">
						<p className="font-semibold text-lg">
							{player.name}
						</p>
						<p className="pr-2">
							Last online will go here
						</p>
					</div>
				</Link>
			);
		});
	}
}
