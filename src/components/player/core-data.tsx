import Image from "next/image";

export default function CoreData() {
	// Get a random number of coins, gems and champion score
	const coins = Math.floor(Math.random() * 1000000);
	const gems = Math.floor(Math.random() * 1000);
	// Round champion score to nearest 5
	const championScore = Math.floor(Math.random() * 1000) * 5;

	return (
		<div className="flex flex-col md:flex-row md:space-x-3 justify-center">
			<div className="flex items-center">
				<span className="font-bold">{coins.toLocaleString()}</span>
				<Image
					src="/images/icons/coin.png"
					alt="Coins"
                    title="Coins"
					width={16}
					height={16}
					className="pixelated w-4 h-4 ml-1"
				/>
			</div>
            <div className="flex items-center">
				<span className="font-bold">{gems.toLocaleString()}</span>
				<Image
					src="/images/icons/gem.png"
					alt="Gems"
                    title="Gems"
					width={16}
					height={16}
					className="pixelated w-4 h-4 ml-1"
				/>
			</div>
            <div className="flex items-center">
				<span className="font-bold">{championScore.toLocaleString()}</span>
				<Image
					src="/images/icons/championscore.png"
					alt="Champion Score"
                    title="Champion Score"
					width={16}
					height={16}
					className="pixelated w-4 h-4 ml-1"
				/>
			</div>
		</div>
	);
}
