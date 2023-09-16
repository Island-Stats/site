"use client";
import { Tooltip } from "@mui/material";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function FavoriteButton({ uuid }: { uuid: string }) {
	const [checked, setChecked] = useState(false);
	const [visible, setVisible] = useState(false);

	const clickFavorite = (
		_event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		let favorites = getCookie("favorites")?.toString().trim().split(",") || [];
		if (checked) {
			favorites = favorites.filter((id) => id != uuid);
		} else {
			if (favorites.length == 0 || favorites[0] == "") {
				favorites[0] = uuid;
			} else {
				favorites.push(uuid);
			}
		}
		setCookie("favorites", favorites.join(","), {
			maxAge: 60 * 60 * 24 * 365,
			path: "/",
			sameSite: "lax",
			encode: (value) => value,
		});
		setChecked(!checked);
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, 2000);
	};

	useEffect(() => {
		let favorites = getCookie("favorites")?.toString().split(",") || [];

		if (favorites.includes(uuid)) {
			setChecked(true);
		}
	}, [uuid]);

	return (
		<Tooltip
			open={visible}
			title={checked ? "Added to favorites" : "Removed from favorites"}
			classes={{
				tooltip: "bg-neutral-800 p-2 text-base",
				arrow: "text-sky-500",
			}}
			arrow
		>
			<button
				role="checkbox"
				aria-checked={!checked}
				onClick={clickFavorite}
				className="group bg-blue-400 mt-4 mr-2 p-1 rounded-full"
			>
				<Image
					src={"/images/icons/favorite.png"}
					alt="Favorite"
					title="Favorite"
					width={16}
					height={16}
					className="w-5 h-5 pixelated group-aria-checked:grayscale"
				/>
			</button>
		</Tooltip>
	);
}
