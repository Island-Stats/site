import MainSearch from "@/components/core/main-search";
import NoticeBoard from "@/components/core/notice-board";
import Favorites from "@/components/core/favorites";
import Profiles from "@/components/core/profiles";

export default function Home() {
	return (
		<main className="grid">
			<MainSearch />
			{/* @ts-expect-error Async Server Component */}
			<NoticeBoard />
			{/* @ts-expect-error Async Server Component */}
			<Favorites />
			{/* @ts-expect-error Async Server Component */}
			<Profiles />
		</main>
	);
}
