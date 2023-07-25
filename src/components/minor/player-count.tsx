import Tippy from "@tippyjs/react";
import Link from "next/link";

export const revalidate = 60 * 5; // 5 minutes

export default async function PlayerCount() {
	
	const response = await (await fetch("https://mcapi.us/server/status?port=25565&ip=play.mccisland.net")).json();
	const current = response.players.now;
	const max = response.players.max;
	const online = response.server.protocol >= 762;

	if (!online) {
		return (
			<Tippy content="Check the status page by clicking here">
				<Link href={"https://status.mccisland.net/"} target="_blank" className="ml-auto mr-4">Server Offline</Link>
			</Tippy>
		);
	} else {
		return (
			<Tippy content={`${current} / ${max}`}>
				<div className="ml-auto mr-4">{current} Online</div>
			</Tippy>
		);
	}
}