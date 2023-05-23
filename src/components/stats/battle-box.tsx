import { PlayerData } from "@/utils/player";
import Image from "next/image";

export default function BattleBox({
	data,
}: {
	data: PlayerData["data"]["battle_box"];
}) {
	return (
		<div className="flex flex-col mx-auto">
			<div className="flex gap-1 py-1">
				<p className="text-2xl font-semibold">Battle Box</p>
				<Image
					src="/images/icons/battle_box_icon.png"
					alt="Battle Box"
					width={32}
					height={32}
					className="pixelated"
				/>
			</div>
			<p>
				Team First Place:{" "}
				<span className="text-neutral-400">
					{data.team_first_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Team Second Place:{" "}
				<span className="text-neutral-400">
					{data.team_second_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Team Third Place:{" "}
				<span className="text-neutral-400">
					{data.team_third_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Team Fourth Place:{" "}
				<span className="text-neutral-400">
					{data.team_fourth_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Team Rounds Won:{" "}
				<span className="text-neutral-400">
					{data.team_rounds_won?.toLocaleString() ?? "-"}
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
