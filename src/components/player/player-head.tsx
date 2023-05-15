import { getPlayerHead } from "@/utils/player";

export default function PlayerHead({ uuid, username }: { uuid: string, username:string }) {
	return (
		<img
			alt={`${username}'s player head`}
			src={getPlayerHead(uuid)}
			className="rounded-md pixelated"
			width={64}
			height={64}
		/>
	);
}
