"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
	FloatingArrow,
	arrow,
	autoPlacement,
	autoUpdate,
	offset,
	useFloating,
	useHover,
} from "@floating-ui/react";

export const revalidate = 60 * 5; // 5 minutes

export default function PlayerCount() {
	const [current, setCurrent] = useState(0);
	const [max, setMax] = useState(0);
	const [online, setOnline] = useState(false);
	const [loading, setLoading] = useState(true);

	const [isOpen, setIsOpen] = useState(false);
	const arrowRef = useRef(null);
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset(10),
			arrow({
				element: arrowRef,
			}),
			autoPlacement({
				allowedPlacements: ["bottom", "bottom-end"],
			}),
		],
		whileElementsMounted: autoUpdate,
	});
	useHover(context);

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
		} catch(e) {	
			setCurrent(0);
			setMax(0);
			setOnline(false);
			setLoading(false);
		}
	}, []);

	if (loading) {
		return (
			<div ref={refs.setReference} className="ml-auto mr-4">
				Loading...
				{isOpen && (
					<div ref={refs.setFloating} style={floatingStyles}>
						<div className="bg-neutral-800 p-2 rounded-md">
							Loading player count.
						</div>
						<FloatingArrow
							ref={arrowRef}
							context={context}
							className="fill-sky-500"
						/>
					</div>
				)}
			</div>
		);
	}

	if (!online) {
		return (
			<Link
				href={"https://status.mccisland.net/"}
				target="_blank"
				ref={refs.setReference}
				className="ml-auto mr-4"
			>
				Server Offline
				{isOpen && (
					<div ref={refs.setFloating} style={floatingStyles}>
						<div className="bg-neutral-800 p-2 rounded-md">
							Click for more info.
						</div>
						<FloatingArrow
							ref={arrowRef}
							context={context}
							className="fill-sky-500"
						/>
					</div>
				)}
			</Link>
		);
	} else {
		return (
			<div ref={refs.setReference} className="ml-auto mr-4">
				{current} Online
				{isOpen && (
					<div ref={refs.setFloating} style={floatingStyles}>
						<div className="bg-neutral-800 p-2 rounded-md">
							{current} / {max}
						</div>
						<FloatingArrow
							ref={arrowRef}
							context={context}
							className="fill-sky-500"
						/>
					</div>
				)}
			</div>
		);
	}
}
