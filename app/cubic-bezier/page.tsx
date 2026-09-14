import type { Metadata } from "next";
import Component from "./component";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const title = "Cubic bézier";
const description = "Drag dots around to create a bézier curve and try out some easings."

export const metadata: Metadata = {
	metadataBase: new URL("https://tools.ppr.one"),
    title: `${title}.`,
    description: description,
	openGraph: {
        images: [
			{
				url: `https://tools.ppr.one/api/og?title=${title}`,
			},
		],
	},
    twitter: {
        images: [
			{
				url: `https://tools.ppr.one/api/og?title=${title}`,
			},
		],
    }
};

export default function CubicBezier() {
	return (
		<main className="animate-page-in">
			<section>
				<Component />
			</section>
		</main>
	);
}
