import FactionProgress from "./faction-progress";

const factions = [
	"red",
	"orange",
	"yellow",
	"lime",
	"green",
	"cyan",
	"aqua",
	"blue",
	"purple",
	"pink",
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
	const level = () => Math.floor(Math.random() * 30);
	// Pick a number between 0 and 100_000 exclusive
	const current = () => Math.floor(Math.random() * 100_000);

	return (
		<>
			<h1 className="text-2xl font-bold col-span-2">Faction Levels</h1>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[0],
					factionName: factionsNames[factions[0]],
					prestige: 0,
				}}
			/>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[1],
					factionName: factionsNames[factions[1]],
					prestige: 1,
				}}
			/>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[2],
					factionName: factionsNames[factions[2]],
					prestige: 2,
				}}
			/>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[3],
					factionName: factionsNames[factions[3]],
					prestige: 3,
				}}
			/>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[4],
					factionName: factionsNames[factions[4]],
					prestige: 4,
				}}
			/>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[5],
					factionName: factionsNames[factions[5]],
					prestige: 5,
				}}
			/>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[6],
					factionName: factionsNames[factions[6]],
					prestige: 6,
				}}
			/>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[7],
					factionName: factionsNames[factions[7]],
					prestige: 7,
				}}
			/>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[8],
					factionName: factionsNames[factions[8]],
					prestige: 8,
				}}
			/>
			<FactionProgress
				{...{
					level: level(),
					current: current(),
					max: 100_000,
					suffix: "XP",
					faction: factions[9],
					factionName: factionsNames[factions[9]],
					prestige: 9,
				}}
			/>
		</>
	);
}
