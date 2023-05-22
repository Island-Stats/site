import Image from "next/image";

export default function TGTTOS({ data }: { data: any }) {
	return (
		<div className="flex flex-col mx-auto">
			<div className="flex gap-1 py-1">
				<p className="text-2xl font-semibold">TGTTOS</p>
				<Image
					src="/images/icons/tgttos_icon.png"
					alt="TGTTOS"
					width={32}
					height={32}
					className="pixelated"
				/>
			</div>
			<p>
				Round First Place:{" "}
				<span className="text-neutral-300">{data.round_first_place ?? 0}</span>
			</p>
			<p>
				Round Top Three:{" "}
				<span className="text-neutral-300">{data.round_top_three ?? 0}</span>
			</p>
			<p>
				Round Top Five:{" "}
				<span className="text-neutral-300">{data.round_top_five ?? 0}</span>
			</p>
			<p>
				Round Top Eight:{" "}
				<span className="text-neutral-300">{data.round_top_eight ?? 0}</span>
			</p>
			<p>
				Round Top 50%:{" "}
				<span className="text-neutral-300">
					{data.round_top_fifty_percent ?? 0}
				</span>
			</p>
			<p>
				First Place:{" "}
				<span className="text-neutral-300">{data.first_place ?? 0}</span>
			</p>
			<p>
				Top Three:{" "}
				<span className="text-neutral-300">{data.top_three ?? 0}</span>
			</p>
			<p>
				Top Five: <span className="text-neutral-300">{data.top_five ?? 0}</span>
			</p>
			<p>
				Top Eight:{" "}
				<span className="text-neutral-300">{data.top_eight ?? 0}</span>
			</p>
			<p>
				Top 50%:{" "}
				<span className="text-neutral-300">{data.top_fifty_percent ?? 0}</span>
			</p>
			<p>
				Games Played:{" "}
				<span className="text-neutral-300">{data.games_played ?? 0}</span>
			</p>
			<p>
				Chickens Punched:{" "}
				<span className="text-neutral-300">{data.chickens_punched ?? 0}</span>
			</p>
		</div>
	);
}
