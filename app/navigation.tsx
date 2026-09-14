"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition, a, easings } from "@react-spring/web";

import Logo from "@public/images/logo.svg";

const Links = [
	{
		name: "Home",
		path: "/",
		icon: "ri-home-line",
	},
	{
		name: "Lorem ipsum",
		path: "/lorem-ipsum",
		icon: "ri-file-list-2-line",
	},
	{
		name: "Color converter",
		path: "/color-converter",
		icon: "ri-arrow-left-right-line",
	},
	{
		name: "CSS filter to color",
		path: "/filter-color",
		icon: "ri-contrast-line",
	},
	{
		name: "Cubic bézier",
		path: "/cubic-bezier",
		icon: "ri-pulse-line",
	},
];

function DesktopNavigation() {
	const path = usePathname();

	const [navOpen, setNavOpen] = useState(false);
	const navTransition = useTransition(navOpen, {
		from: { maxWidth: 0 },
		enter: { maxWidth: 400 },
		leave: { maxWidth: 0 },
		config: {
			easing: easings.easeOutExpo,
			duration: 400,
		},
	});

	return (
		<nav className="hidden md:block">
			<a.button
				onClick={() => setNavOpen(!navOpen)}
				className="group fixed text-neutral-50 w-10 h-10 rounded-full left-7 bottom-7 z-50 overflow-hidden"
			>
				<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0">
					<rect
						x="0"
						y="0"
						width="40"
						height="40"
						className="fill-neutral-800 group-hover:fill-neutral-700 duration-100"
					/>
					<path
						d={navOpen ? "M12.7,20.7 20.5,13" : "M11,13 29,13"}
						fill="transparent"
						stroke="#eee"
						strokeWidth="2"
						className="duration-400 ease-out-quint"
					/>
					<path
						d={navOpen ? "M14,20 28,20" : "M11,20 29,20"}
						fill="transparent"
						stroke="#eee"
						strokeWidth="2"
						className="duration-400 ease-out-quint"
					/>
					<path
						d={navOpen ? "M12.7,19.3 20.5,27" : "M11,27 29,27"}
						fill="transparent"
						stroke="#eee"
						strokeWidth="2"
						className="duration-400 ease-out-quint"
					/>
				</svg>
			</a.button>
			{navTransition((styles, item) =>
				item ? (
					<a.div style={styles} className="relative w-full h-full rounded-r-3xl bg-neutral-900 overflow-hidden">
						<div className="flex flex-col gap-3 whitespace-nowrap w-[400px] h-full p-6 lg:p-8">
							<Image src={Logo} alt="tools logo" className="h-9 lg:h-12 w-auto mb-6" />
							{Links.map((link) => (
								<Link
									key={link.path}
									href={link.path}
									className={`group flex gap-3 rounded-[20px] ${
										path === link.path
											? "mx-0 my-0 px-4 py-2 text-neutral-950 bg-blue"
											: "mx-2 hover:mx-0 my-1 hover:my-0 px-2 hover:px-4 py-1 hover:py-2 hover:text-neutral-50 hover:bg-neutral-700 active:bg-neutral-800"
									} active:scale-[97%] duration-200 ease-out`}
								>
									<i className={link.icon} />
									<span className={`hidden md:block ${path === link.path ? "font-medium" : ""}`}>{link.name}</span>
								</Link>
							))}
							<div className="mt-auto ml-16">
								<p>
									Made by{" "}
									<Link
										href="https://pprmint.de"
										target="_blank"
										rel="noopener noreferrer"
										className="group hover:text-neutral-50 duration-200"
									>
										pprmint<span className="group-hover:text-[#0c6] duration-200">.</span>
										<span className="opacity-0 group-hover:opacity-100 duration-200">de</span>
									</Link>
								</p>
								<p className="text-xs">
									[
									<Link
										href={
											Links.some((link) => path === link.path) && path != "/"
												? `https://github.com/pprmint/tools.ppr.one/tree/main/app${path}`
												: "https://github.com/pprmint/tools.ppr.one"
										}
										target="_blank"
										rel="noopener noreferrer"
										className="group hover:text-neutral-50 duration-200"
									>
										source
									</Link>
									]
								</p>
							</div>
						</div>
					</a.div>
				) : null
			)}
		</nav>
	);
}

function MobileNavigation() {
	const path = usePathname();
	return (
		<nav className="flex md:hidden fixed z-50 bg-neutral-900 flex-col w-full px-6 py-3 overflow-x-auto">
			<div className="flex whitespace-nowrap gap-3">
				<Image src={Logo} alt="tools logo" className="h-6 w-auto mt-1.5 mr-3" />
				{Links.map((link) => (
					<Link
						key={link.path}
						href={link.path}
						className={`group flex gap-3 rounded-[20px] ${
							path === link.path
								? "mx-0 my-0 px-3 py-2 text-neutral-950 bg-blue"
								: "mx-1 hover:mx-0 my-1 hover:my-0 px-2 hover:px-3 py-1 hover:py-2 hover:text-neutral-50 hover:bg-neutral-700 active:bg-neutral-800"
						} active:scale-[97%] duration-200 ease-out`}
					>
						<i className={link.icon} />
					</Link>
				))}
			</div>
		</nav>
	);
}

export default function Navigation() {
	return (
		<>
			<DesktopNavigation />
			<MobileNavigation />
		</>
	);
}
