import "./globals.css";

export const metadata = {
	title: "Island Stats",
	description: "MCC Island stats, data, and more!",
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
