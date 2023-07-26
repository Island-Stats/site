"use client";
import {
	FloatingArrow,
	arrow,
	autoUpdate,
	offset,
	useFloating,
} from "@floating-ui/react";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function FavoriteButton({ uuid }: { uuid: string }) {
	const [checked, setChecked] = useState(false);
	const [visible, setVisible] = useState(false);

	const arrowRef = useRef(null);
	const { refs, floatingStyles, context } = useFloating({
		open: visible,
		onOpenChange: setVisible,
		middleware: [
			offset(5),
			arrow({
				element: arrowRef,
			}),
		],
		whileElementsMounted: autoUpdate,
	});

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
		<button
			ref={refs.setReference}
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
			{visible && (
				<div ref={refs.setFloating} style={floatingStyles} className="z-20">
					<div className="bg-neutral-800 p-2 rounded-md text-center whitespace-nowrap">
						{checked ? "Added to favorites" : "Removed from favorites"}
					</div>
					<FloatingArrow
						ref={arrowRef}
						context={context}
						className="fill-sky-500"
					/>
				</div>
			)}
			{/* <Tippy
			visible={visible}
			content={checked ? "Added to favorites" : "Removed from favorites"}
		>
			
		</Tippy> */}
		</button>
	);
}
