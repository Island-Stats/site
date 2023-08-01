import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col mt-32 backdrop-blur-md backdrop-brightness-50 backdrop-filter items-center justify-center w-[50%] mx-auto rounded-md p-5">
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
