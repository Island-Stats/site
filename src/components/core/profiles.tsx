import Link from "next/link";
import PlayerHead from "../player/player-head";
import { getMojangProfile } from "@/utils/player";

const profiles = [
	{
		uuid: "4e832e0d14b64f8face2280a9bf9dd98", // TheMysterys
		message: "Just another random player",
	},
];

export default function Profiles() {
	return profiles.map(async (profile) => {
		const player = await getMojangProfile(profile.uuid);
		if (!player) return;

		return (
			<Link
				href={"/player/" + profile.uuid}
				className="relative inline-block p-5"
			>
				<PlayerHead uuid={profile.uuid} username={player.name} />
				<p className="absolute left-24 top-5 font-semibold text-lg">
					{player.name}
				</p>
				<p className="absolute left-24 top-12 w-56">{profile.message}</p>
			</Link>
		);
	});
}
