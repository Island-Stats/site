"use client";

import { Tooltip } from "@mui/material";
import { useState } from "react";

function validateURL(url: string) {
	if (
		url.match(
			/^([0-9a-fA-F]{8})-?([0-9a-fA-F]{4})-?([0-9a-fA-F]{4})-?([0-9a-fA-F]{4})-?([0-9a-fA-F]{12})$/
		)
	) {
		url = url.replaceAll("-", "");
	} else if (url.match(/^[\w ]{3,16}$/)) {
		url = url.replace(" ", "_");
	} else {
		throw new Error(`"${url}" is not a valid username or UUID`);
	}
	return "/player/" + url;
}

export default function MainSearch() {
	const [error, setError] = useState("");
	const [visible, setVisible] = useState(false);
	const show = () => setVisible(true);
	const hide = () => setVisible(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const ign = (form.querySelector("#ign") as HTMLInputElement).value;

		try {
			window.location.href = validateURL(ign);
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: String(
							error ??
								"please enter a valid Minecraft username or UUID"
					  )
			);

			show();

			setTimeout(() => {
				hide();
			}, 2000);
		}
	};

	return (
		<form
			className="grid col-span-full grid-cols-1 justify-items-center gap-6 py-5 text-center"
			onSubmit={handleSubmit}
		>
			<p className="text-2xl font-bold">Show Island stats for:</p>
			<Tooltip
				open={visible}
				title={error}
				classes={{
					tooltip: "bg-neutral-800 p-2 text-base",
					arrow: "text-sky-500",
				}}
				arrow
			>
				<input
					// TODO: re-enable search input
					disabled
					id="ign"
					enterKeyHint="go"
					placeholder="Enter Username"
					aria-label="username"
					className="h-9 w-full bg-white bg-opacity-10 text-center text-white text-xl"
					required
				/>
			</Tooltip>
			<button
				// TODO: re-enable search button
				disabled
				type="submit"
				className="flex h-9 items-center bg-sky-500 rounded-md uppercase text-sm text-black font-bold px-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-sky-400"
			>
				Search
			</button>
		</form>
	);
}
