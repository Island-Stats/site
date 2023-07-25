import Link from "next/link";

export const runtime = "nodejs";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<h1 className="text-4xl font-bold">404</h1>
			<h2 className="text-2xl font-semibold">Page not found</h2>
			<Link
				className="px-3 py-2 mt-5 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
				href={"/"}
			>
				Go back home
			</Link>
		</div>
	);
}
