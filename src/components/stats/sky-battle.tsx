import { PlayerData } from "@/utils/player";
import Image from "next/image";

export default function SkyBattle({
	data,
}: {
	data: PlayerData["data"]["sky_battle"];
}) {
	return (
		<div className="flex flex-col mx-auto">
			<div className="flex gap-1 py-1">
				<p className="text-2xl font-semibold">Sky Battle</p>
				<Image
					src="/images/icons/sky_battle_icon.png"
					alt="Sky Battle"
					width={32}
					height={32}
					className="pixelated"
				/>
			</div>
			<p>
				Survival First Place:{" "}
				<span className="text-neutral-400">
					{data.survival_first_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Survival Top Three:{" "}
				<span className="text-neutral-400">
					{data.survival_top_three?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Survival Top Five:{" "}
				<span className="text-neutral-400">
					{data.survival_top_five?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Survival Top Eight:{" "}
				<span className="text-neutral-400">
					{data.survival_top_eight?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Survival Top 50%:{" "}
				<span className="text-neutral-400">
					{data.survival_top_fifty_percent?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Players Killed:{" "}
				<span className="text-neutral-400">
					{data.players_killed?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Games Played:{" "}
				<span className="text-neutral-400">
					{data.games_played?.toLocaleString() ?? "-"}
				</span>
			</p>
		</div>
	);
}
