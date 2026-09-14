import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const title = searchParams.get("title");
	
	const fontSilka = await readFile(join(process.cwd(), "/fonts/SilkaMono/silkamono-medium-webfont.ttf"));
	return new ImageResponse(
		(
			<div
				style={{
					backgroundImage: "url(https://tools.ppr.one/images/OG_bg.png)",
					display: "flex",
					width: "100%",
					height: "100%",
					textAlign: "left",
					alignItems: "center",
					justifyContent: "flex-start",
					padding: 128,
				}}
			>
				<h1 style={{ fontFamily: "Silka Mono", fontSize: 80, color: "#eee", lineHeight: 1, width: "60%" }}>{title}</h1>
			</div>
		),
		{
			width: 1600,
			height: 836,
			fonts: [
				{
					name: "Silka Mono",
					data: fontSilka,
					weight: 500,
				},
			],
		}
	);
}
