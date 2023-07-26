import MainSearch from "@/components/core/main-search";
//import NoticeBoard from "@/components/core/notice-board";
import Favorites from "@/components/core/favorites";
import Profiles from "@/components/core/profiles";

export default function Home() {
	return (
		<main className="grid">
			<MainSearch />
			{/* <NoticeBoard /> */}
			<div
				className="group col-span-full py-5 text-center"
			>
				<p className="text-neutral-200 text-xl font-bold transition-colors">
					Site preview
				</p>
				<p className="text-neutral-200">This is a preview of what Island Stats will hopefully be in the future once an MCC Island API is released to the public.</p>
				<p className="text-neutral-200 font-semibold">Only the below profiles contain stats</p>
			</div>
			<Favorites />
			<Profiles />
		</main>
	);
}
