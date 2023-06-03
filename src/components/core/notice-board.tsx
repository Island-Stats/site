import Link from "next/link";
import Parser from "rss-parser";

export const revalidate = 60 * 60; // 1 hour cache

const rssFeed =
	"https://mcchampionship.com/forums/mcc-island.73/index.rss?order=post_date";

export default async function NoticeBoard() {
	try {
		const feed = await new Parser().parseURL(rssFeed);

		if (!feed) {
			return null;
		}

		const notice = feed.items[0];

		const title = notice.title;
		const link = notice.link!.split("?")[0];
		const body = notice["content:encodedSnippet"].split("\n")[0];
		const date = new Date(notice.pubDate!);

		// If notice is older than 2 weeks then don't display it
		if (date.getTime() < Date.now() - 1000 * 60 * 60 * 24 * 14) {
			return null;
		}

		return (
			<Link
				href={link}
				rel="noreferrer"
				target="_blank"
				className="group col-span-full py-5 transition-transform ease-in-out hover:scale-[1.015] text-center"
			>
				<p className="text-neutral-400 text-xl font-semibold group-hover:text-neutral-200 transition-colors duration-300">
					{title}
				</p>
				<p className="text-neutral-200">{body}</p>
			</Link>
		);
	} catch (ignored) {
		return;
	}
}
