import { BattleBox } from "@/utils/mongoose";
import Image from "next/image";

export default function BattleBoxStats({ games }: { games: BattleBox }) {
	return (
		<div className="flex flex-col mx-auto max-md:text-center">
			<div className="flex justify-between gap-1 py-1">
				<p className="text-xl font-semibold">Battle Box</p>
				<Image
					src="/images/icons/battle_box_icon.png"
					alt="Battle Box"
					width={32}
					height={32}
					className="w-8 h-8 pixelated"
				/>
			</div>
			<p>
				Team First Place:{" "}
				<span className="text-neutral-400">
					{games.team_first_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Team Second Place:{" "}
				<span className="text-neutral-400">
					{games.team_second_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Team Third Place:{" "}
				<span className="text-neutral-400">
					{games.team_third_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Team Fourth Place:{" "}
				<span className="text-neutral-400">
					{games.team_fourth_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Team Rounds Won:{" "}
				<span className="text-neutral-400">
					{games.team_rounds_won?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Players Killed:{" "}
				<span className="text-neutral-400">
					{games.players_killed?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Games Played:{" "}
				<span className="text-neutral-400">
					{games.games_played?.toLocaleString() ?? "-"}
				</span>
			</p>
		</div>
	);
}
