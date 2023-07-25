"use client";

import Tippy from "@tippyjs/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const revalidate = 60 * 5; // 5 minutes

export default function PlayerCount() {
	const [current, setCurrent] = useState(0);
	const [max, setMax] = useState(0);
	const [online, setOnline] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://mcapi.us/server/status?port=25565&ip=play.mccisland.net")
			.then((res) => res.json())
			.then((data) => {
				setCurrent(data.players.now);
				setMax(data.players.max);
				setOnline(data.server.protocol >= 762);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<Tippy content="Loading player count">
				<div className="ml-auto mr-4">Loading...</div>
			</Tippy>
		);
	}

	if (!online) {
		return (
			<Tippy content="Check the status page by clicking here">
				<Link
					href={"https://status.mccisland.net/"}
					target="_blank"
					className="ml-auto mr-4"
				>
					Server Offline
				</Link>
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
