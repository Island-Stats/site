import Link from "next/link";
import PlayerHead from "./player-head";
import { cookies } from "next/headers";

const lookupURL = "https://mojang-api.svc.noxcrew.online/username/";

export default function Favorites() {
	const cookieStore = cookies();
	let favorites = cookieStore.get("favorites");

	if (!favorites || favorites.value == "") {
		return (
			<div className="relative inline-block p-5">
				<img
					alt="question mark player head"
					src={"/images/q.png"}
					className="rounded-md pixelated"
					width={64}
					height={64}
				/>
				<p className="absolute left-24 top-5 font-semibold text-lg">
					No favorites set!
				</p>
				<p className="absolute left-24 top-12 w-56">
					Why don't you set a favorite?
				</p>
			</div>
		);
	} else {
		return favorites.value.split(",").map(async (uuid) => {
			const name = await fetch(lookupURL + uuid)
				.then((res) => res.json())
				.then((json) => json.name);
			return (
				<Link href={"/player/" + uuid} className="relative inline-block p-5">
					<PlayerHead uuid={uuid} />
					<p className="absolute left-24 top-5 font-semibold text-lg">{name}</p>
					<p className="absolute left-24 top-12 w-56">
						Last online will go here
					</p>
				</Link>
			);
		});
	}
}
