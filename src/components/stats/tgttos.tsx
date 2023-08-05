import { TGTToS } from "@/utils/mongoose";
import Image from "next/image";

export default function TGTTOSStats({
	games,
}: {
	games: TGTToS;
}) {
	return (
		<div className="flex flex-col mx-auto max-md:text-center">
			<div className="flex justify-between gap-1 py-1">
				<p className="text-xl font-semibold">TGTTOS</p>
				<Image
					src="/images/icons/tgttos_icon.png"
					alt="TGTTOS"
					width={32}
					height={32}
					className="w-8 h-8 pixelated"
				/>
			</div>
			<p>
				Round First Place:{" "}
				<span className="text-neutral-400">
					{games.round_first_place?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Round Top Three:{" "}
				<span className="text-neutral-400">
					{games.round_top_three?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Round Top Five:{" "}
				<span className="text-neutral-400">
					{games.round_top_five?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Round Top Eight:{" "}
				<span className="text-neutral-400">
					{games.round_top_eight?.toLocaleString() ?? "-"}
				</span>
			</p>
			<p>
				Round Top 50%:{" "}
				<span className="text-neutral-400">
					{games.round_top_fifty_percent?.toLocaleString() ?? "-"}
				</span>
			</p>
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
				Chickens Punched:{" "}
				<span className="text-neutral-400">
					{games.chickens_punched?.toLocaleString() ?? "-"}
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
