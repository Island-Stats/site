import ProgressBar from "./progress-bar";

const factions = [
	"aqua",
	"blue",
	"cyan",
	"green",
	"lime",
	"orange",
	"pink",
	"purple",
	"red",
	"yellow",
];

const factionsNames: { [key: string]: string } = {
	aqua: "Aqua Axolotls",
	blue: "Blue Bats",
	cyan: "Cyan Coyotes",
	green: "Green Geckos",
	lime: "Lime Llamas",
	orange: "Orange Ocelots",
	pink: "Pink Parrots",
	purple: "Purple Pandas",
	red: "Red Rabbits",
	yellow: "Yellow Yaks",
};

export default function Faction() {
	// Pick a number between 0 and 50 exclusive
	const level = Math.floor(Math.random() * 50);
	// Pick a faction
	const faction = factions[Math.floor(Math.random() * factions.length)];
	// Pick a number between 0 and 100_000 exclusive
	const current = Math.floor(Math.random() * 100_000);

	return (
		<ProgressBar
			{...{
				title: "Faction Level",
				level,
				current,
				max: 100_000,
				suffix: "XP",
				icon: `factions/${faction}.png`,
				iconHover: { factionName: factionsNames[faction], prestige: 0 },
			}}
		/>
	);
}
