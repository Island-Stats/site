import Link from "next/link";
import PlayerHead from "../player/player-head";
import { getMojangProfile } from "@/utils/player";

const profiles = [
	{
		uuid: "4e832e0d14b64f8face2280a9bf9dd98", // TheMysterys
		message: "Just another random player. (Sole Dev)",
	},
	{
		uuid: "3e7a89eec4e24392a317444b861b0794", // Noxite
		message: "Such a smooth mustache",
	},
	{
		uuid: "6817a59a9c914f5eac0301cc9b2fd66e", // MrManzo
		message: "Most Games played before end of closed beta",
	},
	{
		uuid: "a61953e835674760993e7c3037118b9f", // HackedByReamery
		message: "A crystal in a cave",
	},
	{
		uuid: "e01d8da3993941dc98d8cec81d6a92d2", // Flameri
		message: "Just some flames in a robe",
	},
];

export default function Profiles() {
	return profiles.map(async (profile) => {
		const player = await getMojangProfile(profile.uuid);
		if (!player) return;

		return (
			<Link
				key={profile.uuid}
				href={"/player/" + profile.uuid}
				className="grid grid-cols-4 space-x-2 p-5 border-2 border-transparent hover:border-sky-500 transition-colors duration-500"
			>
				<PlayerHead
					{...{ uuid: profile.uuid, username: player.name }}
				/>
				<div className="col-span-3">
					<p className="flex font-semibold text-lg">
						{player.name}
					</p>
					<p className="pr-2">{profile.message}</p>
				</div>
			</Link>
		);
	});
}
