import { type } from "os";

const ranks = {
	noxcrew: "Noxcrew",
	admin: "Admin",
	mod: "Mod",
	creator: "Creator",
	contestant: "Contestant",
	vip: "VIP",
	"gc-royal": "Grand Champ Royale",
	"grand-champ": "Grand Champ",
	champ: "Champ",
};

type RankType = keyof typeof ranks;

export default function Rank({ rank }: { rank: string }) {
	return (
		<div
			className="mcc-colors flex mt-1 px-4 rounded-full font-bold text-lg justify-center items-center"
			style={{ backgroundColor: `var(--${rank})` }}
		>
			{ranks[rank as RankType]}{" "}
		</div>
	);
}
