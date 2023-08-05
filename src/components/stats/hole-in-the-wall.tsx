import { HoleInTheWall } from "@/utils/mongoose";
import Image from "next/image";

export default function HoleInTheWallStats({
	games,
}: {
	games: HoleInTheWall;
}) {
	return (
		<div className="flex flex-col mx-auto max-md:text-center">
			<div className="flex justify-between gap-1 py-1">
				<p className="text-xl font-semibold">Hole in the Wall</p>
				<Image
					src="/images/icons/hole_in_the_wall_icon.png"
					alt="Hole in the Wall"
					width={32}
					height={32}
					className="w-8 h-8 pixelated"
				/>
			</div>
			<p>
				First Place:{" "}
				<span className="text-neutral-400">
					{games.first_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Top Three:{" "}
				<span className="text-neutral-400">
					{games.top_three?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Top Five:{" "}
				<span className="text-neutral-400">
					{games.top_five?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Top Eight:{" "}
				<span className="text-neutral-400">
					{games.top_eight?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Top 50%:{" "}
				<span className="text-neutral-400">
					{games.top_fifty_percent?.toLocaleString() ?? "-"}
				</span>
			</p>

			<p>
				Walls Dodged:{" "}
				<span className="text-neutral-400">
					{games.walls_dodged?.toLocaleString() ?? "-"}
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
