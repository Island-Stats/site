"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

export const revalidate = 60 * 5; // 5 minutes

export default function PlayerCount() {
	const [current, setCurrent] = useState(0);
	const [max, setMax] = useState(0);
	const [online, setOnline] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			fetch("https://mcapi.us/server/status?port=25565&ip=play.mccisland.net")
				.then((res) => res.json())
				.then((data) => {
					setCurrent(data.players.now);
					setMax(data.players.max);
					setOnline(data.server.protocol >= 762);
					setLoading(false);
				});
		} catch (e) {
			setCurrent(0);
			setMax(0);
			setOnline(false);
			setLoading(false);
		}
	}, []);

	if (loading) {
		return (
			<Tooltip
				title="Loading player count."
				classes={{
					tooltip: "bg-neutral-800 p-2 text-base",
					arrow: "text-sky-500",
				}}
				arrow
			>
				<div className="ml-auto mr-4">Loading...</div>
			</Tooltip>
		);
	}

	if (!online) {
		return (
			<Tooltip
				title="Click for more info."
				classes={{
					tooltip: "bg-neutral-800 p-2 text-base",
					arrow: "text-sky-500",
				}}
				arrow
			>
				<Link
					href={"https://status.mccisland.net/"}
					target="_blank"
					className="ml-auto mr-4"
				>
					Server Offline
				</Link>
			</Tooltip>
		);
	} else {
		return (
			<Tooltip
				title={`${current} / ${max}`}
				classes={{
					tooltip: "bg-neutral-800 p-2 text-base",
					arrow: "text-sky-500",
				}}
				arrow
			>
				<div className="ml-auto mr-4">{current} Online</div>
			</Tooltip>
		);
	}
}
