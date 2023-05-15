import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		template: "%s | Island Stats",
		default: "Island Stats",
	},
	description: "MCC Island stats, data, and more!",
	themeColor: "#60a5fa",
	openGraph: {
		type: "website",
		title: "Island Stats",
		description: "MCC Island stats, data, and more!",
		url: "https://island.themysterys.com/",
	},
	twitter: {
		card: "summary",
		title: "Island Stats",
		description: "MCC Island stats, data, and more!",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
