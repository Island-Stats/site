import { getPlayerHead } from "@/utils/player";
import Image from "next/image";

export default function PlayerHead({ uuid, username }: { uuid: string, username:string }) {
	return (
		<Image
			alt={`${username}'s player head`}
			src={getPlayerHead(uuid)}
			className="rounded-md pixelated"
			width={64}
			height={64}
		/>
	);
}
