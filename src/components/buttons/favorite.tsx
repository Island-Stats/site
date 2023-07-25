"use client";
import Tippy from "@tippyjs/react";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { useEffect, useState } from "react";

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
		<Tippy
			visible={visible}
			content={checked ? "Added to favorites" : "Removed from favorites"}
		>
			<button
				role="checkbox"
				aria-checked={!checked}
				onClick={clickFavorite}
				className="group bg-blue-400 mt-4 mr-2 p-1 rounded-full"
			>
				{/* <svg viewBox="0 0 24 24" className="w-5 h-5">
					<title>Favorite</title>
					<path
						className="solid"
						fill="white"
						visibility={checked ? "visible" : "hidden"}
						d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
					></path>
					<path
						className="solid"
						fill="white"
						visibility={!checked ? "visible" : "hidden"}
						d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"
					></path>
				</svg> */}
				<Image
					src={"/images/icons/favorite.png"}
					alt="Favorite"
					title="Favorite"
					width={16}
					height={16}
					className="w-5 h-5 pixelated group-aria-checked:grayscale"
				/>
			</button>
		</Tippy>
	);
}
