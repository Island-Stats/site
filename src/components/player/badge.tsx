import { Tooltip } from "@mui/material";

export default function Badge({title, description, type, completed, stage}:{title: string,
	description: string,
	type: string,
	completed: Date,
	stage?: number,}) {
	// Convert stage to roman numerals
	let stageRoman = "";
	switch (stage) {
		case 1:
			stageRoman = "I";
			break;
		case 2:
			stageRoman = "II";
			break;
		case 3:
			stageRoman = "III";
			break;
		case 4:
			stageRoman = "IV";
			break;
		case 5:
			stageRoman = "V";
			break;
		case 6:
			stageRoman = "VI";
			break;
		case 7:
			stageRoman = "VII";
			break;
		case 8:
			stageRoman = "VIII";
			break;
		case 9:
			stageRoman = "IX";
			break;
		case 10:
			stageRoman = "X";
			break;
		default:
			break;
	}

	// Format date to DD MMM YYYY
	const date = completed.toLocaleString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	return (
		<Tooltip
			title={
				<div>
					<h3 className="text-xl font-bold text-orange-400">
						{title} {stageRoman}
					</h3>
					<p className="text-base text-gray-400">
						Stage completed on{" "}
						<span className="text-white">{date}</span>
					</p>
					<p className="text-base text-yellow-300">{description}</p>
				</div>
			}
			placement="right"
			classes={{
				tooltip: "bg-black bg-opacity-70",
				arrow: "text-sky-500",
			}}
			arrow
		>
			<div
				className="w-8 h-8 pixelated"
				style={{
					backgroundImage: `url(https://cdn.islandstats.xyz/badges/${type}/${title.replaceAll(" ", "_").toLowerCase()}.png)`,
					backgroundSize: "cover",
				}}
			/>
		</Tooltip>
	);
}
