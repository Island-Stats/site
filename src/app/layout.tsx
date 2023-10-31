import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "@/components/nav/nab-bar";
import Script from "next/script";

export const viewport: Viewport = {
	themeColor: "#60a5fa",
}

export const metadata: Metadata = {
	metadataBase: new URL("https://islandstats.xyz"),
	title: {
		template: "%s | Island Stats",
		default: "Island Stats",
	},
	icons: {
		icon: "/images/favicon.ico",
	},
	description: "MCC Island stats, data, and more!",
	keywords: ["MCC", "Minecraft", "Island", "Stats", "Data"],
	openGraph: {
		type: "website",
		title: "Island Stats",
		description: "MCC Island stats, data, and more!",
		images: [
			{
				url: "https://islandstats.xyz/images/icons/logo-big.png",
				width: 512,
				height: 512,
			},
		],
	},
	twitter: {
		card: "summary",
		title: "Island Stats",
		description: "MCC Island stats, data, and more!",
		images: [
			{
				url: "https://islandstats.xyz/images/icons/logo-big.png",
				width: 512,
				height: 512,
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<NavBar />
				{children}
				{process.env.NODE_ENV === "production" && (
					<>
						<Script
							async
							src="https://www.googletagmanager.com/gtag/js?id=G-T7B6GR01E3"
						/>
						<Script id="google-analytics">
							{`window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-T7B6GR01E3');`}
						</Script>
					</>
				)}
			</body>
		</html>
	);
}
