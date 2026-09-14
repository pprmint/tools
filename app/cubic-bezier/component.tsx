"use client";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import BezierEasing from "bezier-easing";

import "./animate.css";
import Button from "@/components/Button";

export default function Component() {
	const dragAref = useRef(null);
	const dragBref = useRef(null);

	// Grid offset from the top in pixels
	const [offset, setOffset] = useState(200);
	function toggleOffset() {
		if (offset === 200) {
			setTransitionDisabled(false);
			setPositionA({ x: positionA.x, y: positionA.y + 200 });
			setPositionB({ x: positionB.x, y: positionB.y + 200 });
			setOffset(400);
			setTimeout(() => {
				setTransitionDisabled(true);
			}, 300);
		} else {
			setTransitionDisabled(false);
			if (positionA.y < 400) {
				setPositionA({ x: positionA.x, y: 0 });
			} else if (positionA.y > 1000) {
				setPositionA({ x: positionA.x, y: 800 });
			} else {
				setPositionA({ x: positionA.x, y: positionA.y - 200 });
			}
			if (positionB.y < 400) {
				setPositionB({ x: positionB.x, y: 0 });
			} else if (positionB.y > 1000) {
				setPositionB({ x: positionB.x, y: 800 });
			} else {
				setPositionB({ x: positionB.x, y: positionB.y - 200 });
			}
			setOffset(200);
			setTimeout(() => {
				setTransitionDisabled(true);
			}, 300);
		}
	}

	const Presets = [
		{
			type: "in",
			group: "sine",
			positionA: { x: 48, y: offset + 400 },
			positionB: { x: 156, y: offset + 400 },
		},
		{
			type: "out",
			group: "sine",
			positionA: { x: 244, y: offset },
			positionB: { x: 352, y: offset },
		},
		{
			type: "in-out",
			group: "sine",
			positionA: { x: 148, y: offset + 400 },
			positionB: { x: 248, y: offset },
		},
		{
			type: "in",
			group: "quad",
			positionA: { x: 44, y: offset + 400 },
			positionB: { x: 200, y: offset + 400 },
		},
		{
			type: "out",
			group: "quad",
			positionA: { x: 200, y: offset },
			positionB: { x: 356, y: offset },
		},
		{
			type: "in-out",
			group: "quad",
			positionA: { x: 180, y: offset + 400 },
			positionB: { x: 220, y: offset },
		},
		{
			type: "in",
			group: "cubic",
			positionA: { x: 128, y: offset + 400 },
			positionB: { x: 268, y: offset },
		},
		{
			type: "out",
			group: "cubic",
			positionA: { x: 132, y: offset },
			positionB: { x: 272, y: offset },
		},
		{
			type: "in-out",
			group: "cubic",
			positionA: { x: 260, y: offset + 400 },
			positionB: { x: 140, y: offset },
		},
		{
			type: "in",
			group: "quart",
			positionA: { x: 200, y: offset + 400 },
			positionB: { x: 300, y: offset + 400 },
		},
		{
			type: "out",
			group: "quart",
			positionA: { x: 100, y: offset },
			positionB: { x: 200, y: offset },
		},
		{
			type: "in-out",
			group: "quart",
			positionA: { x: 304, y: offset + 400 },
			positionB: { x: 96, y: offset },
		},
		{
			type: "in",
			group: "quint",
			positionA: { x: 256, y: offset + 400 },
			positionB: { x: 312, y: offset + 400 },
		},
		{
			type: "out",
			group: "quint",
			positionA: { x: 88, y: offset },
			positionB: { x: 144, y: offset },
		},
		{
			type: "in-out",
			group: "quint",
			positionA: { x: 332, y: offset + 400 },
			positionB: { x: 68, y: offset },
		},
		{
			type: "in",
			group: "expo",
			positionA: { x: 280, y: offset + 400 },
			positionB: { x: 312, y: offset + 400 },
		},
		{
			type: "out",
			group: "expo",
			positionA: { x: 64, y: offset },
			positionB: { x: 144, y: offset },
		},
		{
			type: "in-out",
			group: "expo",
			positionA: { x: 348, y: offset + 400 },
			positionB: { x: 52, y: offset },
		},
	];

	// Position of draggable handles.
	const [positionA, setPositionA] = useState({ x: 200, y: 560 });
	const [positionB, setPositionB] = useState({ x: 200, y: 240 });

	// Get cubic-bezier from positions of handles; rounded to two decimals after comma.
	const cubicBezierA = positionA.x / 400;
	const cubicBezierB = parseFloat((1 - (positionA.y - offset) / 400).toFixed(2));
	const cubicBezierC = positionB.x / 400;
	const cubicBezierD = parseFloat((1 - (positionB.y - offset) / 400).toFixed(2));
	const cubicBezierText = `${cubicBezierA}, ${cubicBezierB}, ${cubicBezierC}, ${cubicBezierD}`;

	// Duration of animation previews (boxes on hover, spinny circle for easing presets).
	const [duration, setDuration] = useState([1]);
	const [transitionDisabled, setTransitionDisabled] = useState(true);

	// Collapsible for easing presets.
	const [presetsVisible, setPresetsVisible] = useState(false);

	// Functions to handle selection of easing presets.
	async function handleEasingClickA(newPosition: { x: number; y: number }) {
		setTransitionDisabled(false);
		setPositionA({ x: newPosition.x, y: newPosition.y });
		setTimeout(() => {
			setTransitionDisabled(true);
		}, 300);
	}
	async function handleEasingClickB(newPosition: { x: number; y: number }) {
		setTransitionDisabled(false);
		setPositionB({ x: newPosition.x, y: newPosition.y });
		setTimeout(() => {
			setTransitionDisabled(true);
		}, 300);
	}

	// Calculate position of circles in one of the test fields.
	const calculatePosition = (cubicBezier: [number, number, number, number], percent: number): number => {
		const easingFunction = BezierEasing(...cubicBezier);
		return easingFunction(percent) * 100;
	};
	const [dotCount, setDotCount] = useState(21);
	// Increase and decrease the amount of dots on scroll.
	const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
		setDotCount((prevCount) => {
			const newCount = prevCount + (event.deltaY > 0 ? -1 : 1);
			// Make sure dot count is at least 3.
			return Math.max(newCount, 3);
		});
		event.preventDefault();
	};

	// Invert easing curve by swapping positions.
	function invertCurves() {
		setTransitionDisabled(false);
		let aX = positionA.x;
		let aY = positionA.y;

		let bX = positionB.x;
		let bY = positionB.y;

		setPositionA({ x: 400 - bX, y: offset - bY + offset + 400 });
		setPositionB({ x: 400 - aX, y: offset - aY + offset + 400 });
		setTimeout(() => {
			setTransitionDisabled(true);
		}, 300);
	}

	return (
		<div>
			<div className="flex flex-col 2xl:flex-row gap-9">
				<div className="flex 2xl:w-max">
					<div
						className={`relative flex-row w-[424px] ${
							offset === 400 ? "h-[1224px]" : "h-[824px]"
						} mx-auto duration-300 ease-in-out-cubic`}
					>
						<svg
							width={400}
							height={400 + offset * 2}
							xmlns="http://www.w3.org/2000/svg"
							className="group absolute left-0 duration-200 ease-in-cubic"
						>
							<g id="backdrop">
								<rect
									x={1}
									y={offset}
									width={398}
									height={400}
									strokeWidth={2}
									className="fill-transparent stroke-neutral-900 duration-300 ease-in-out-cubic"
								/>
								<rect
									x={0.5}
									y={0.5}
									width={399}
									height={offset * 2 + 399}
									strokeWidth={1}
									className="fill-transparent stroke-neutral-900 duration-300 ease-in-out-cubic"
								/>
								<g id="vertical">
									<path
										d="M40.5,0 40.5,1200"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M80.5,0 80.5,1200"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M120.5,0 120.5,1200"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M160.5,0 160.5,1200"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M200.5,0 200.5,1200"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M240.5,0 240.5,1200"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M280.5,0 280.5,1200"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M320.5,0 320.5,1200"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M360.5,0 360.5,1200"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
								</g>
								<g id="horizontal">
									<path
										d="M0,40.5 400,40.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,80.5 400,80.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,120.5 400,120.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,160.5 400,160.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,200.5 400,200.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,240.5 400,240.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,280.5 400,280.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,320.5 400,320.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,360.5 400,360.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,400.5 400,400.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,440.5 400,440.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,480.5 400,480.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,520.5 400,520.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,560.5 400,560.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,600.5 400,600.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,640.5 400,640.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,680.5 400,680.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,720.5 400,720.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,760.5 400,760.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,800.5 400,800.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,840.5 400,840.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,880.5 400,880.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,920.5 400,920.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,960.5 400,960.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,1000.5 400,1000.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,1040.5 400,1040.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,1080.5 400,1080.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,1120.5 400,1120.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
									<path
										d="M0,1160.5 400,1160.5"
										className="fill-none stroke-neutral-900"
										strokeWidth={1}
										strokeDasharray={4}
										strokeDashoffset={1.5}
									/>
								</g>
								<path
									d={`M1,${offset - 1} V${offset + 400} H400`}
									className="fill-none stroke-neutral-800 duration-300 ease-in-out-cubic"
									strokeWidth={2}
								/>
							</g>
							<g id="draw">
								<path
									d={`M0,${offset + 400} C${positionA.x},${positionA.y} ${positionB.x},${
										positionB.y
									} 400,${offset}`}
									strokeWidth={2}
									strokeLinecap="round"
									className={`fill-transparent stroke-neutral-50 ${
										transitionDisabled ? "duration-0" : "duration-300"
									} ease-in-out-cubic`}
								/>
								<path
									d={`M0,${offset + 400} ${positionA.x},${positionA.y}`}
									strokeWidth={4}
									strokeLinecap="round"
									className={`fill-transparent stroke-blue-600 ${
										transitionDisabled ? "duration-0" : "duration-300"
									} ease-in-out-cubic`}
								/>
								<path
									d={`M400,${offset} ${positionB.x},${positionB.y}`}
									strokeWidth={4}
									strokeLinecap="round"
									className={`fill-transparent stroke-blue-800 ${
										transitionDisabled ? "duration-0" : "duration-300"
									} ease-in-out-cubic`}
								/>
							</g>
						</svg>
						<Draggable
							nodeRef={dragAref}
							bounds="parent"
							grid={[4, 4]}
							position={positionA}
							defaultPosition={positionA}
							onDrag={(e, position) => {
								const { x, y } = position;
								setPositionA(position);
							}}
							positionOffset={{ x: "-11.5px", y: "-11.5px" }}
						>
							<div
								ref={dragAref}
								className={`absolute w-[24px] h-[24px] rounded-full bg-blue cursor-grab active:cursor-grabbing ${
									transitionDisabled ? "duration-0" : "duration-300"
								} ease-in-out-cubic`}
							/>
						</Draggable>
						<Draggable
							nodeRef={dragBref}
							bounds="parent"
							grid={[4, 4]}
							position={positionB}
							defaultPosition={positionB}
							onDrag={(e, position) => {
								const { x, y } = position;
								setPositionB(position);
							}}
							positionOffset={{ x: "-11.5px", y: "-11.5px" }}
						>
							<div
								ref={dragBref}
								className={`absolute w-[24px] h-[24px] rounded-full bg-blue-700 cursor-grab active:cursor-grabbing ${
									transitionDisabled ? "duration-0" : "duration-300"
								} ease-in-out-cubic`}
							/>
						</Draggable>
					</div>
				</div>
				<div className="w-full flex flex-col gap-6">
					<div className="flex flex-col gap-3">
						<h1 className="text-neutral-50 font-display font-medium text-3xl md:text-5xl">
							Cubic bézier<span className="text-blue">.</span>
						</h1>
						<p>
							Drag the dots around to create a bézier curve, and test your easing by hovering over the
							boxes below.
						</p>
					</div>
					<div className="flex items-center justify-between gap-6">
						<div className="flex items-center gap-3">
							<Switch.Root
								className="group relative w-14 h-8 rounded-full data-[state='unchecked']:bg-neutral-900 data-[state='unchecked']:hover:bg-neutral-800 data-[state='unchecked']:active:bg-neutral-900 data-[state='checked']:bg-blue data-[state='checked']:hover:bg-blue-400 data-[state='checked']:active:bg-blue-600 duration-300 active:duration-100 ease-out"
								id="toggle-size"
								onClick={toggleOffset}
								checked={offset === 400}
							>
								<Switch.Thumb className="flex items-center justify-center h-3 w-3 rounded-full group-data-[state='checked']:w-0 ring-2 group-data-[state='checked']:ring-1 ring-neutral-50 group-data-[state='checked']:ring-neutral-900 translate-x-3 data-[state='checked']:translate-x-10 duration-300 ease-out" />
							</Switch.Root>
							<label htmlFor="toggle-size">Increase canvas size</label>
						</div>
						<Button onClick={invertCurves}>
							<i className="ri-arrow-left-right-line" />
							Invert curves
						</Button>
					</div>
					<div
						id="cubic-bezier-code"
						className="flex gap-3 col-span-2 bg-neutral-900 rounded-lg px-4 py-3 w-full"
					>
						<p className="grow">
							cubic-bezier(<span className="text-neutral-50">{cubicBezierText}</span>);
						</p>
						<button
							className="text-sm hover:text-neutral-50 duration-100"
							onClick={() => navigator.clipboard.writeText(`cubic-bezier(${cubicBezierText})`)}
						>
							COPY
						</button>
					</div>
					<div id="duration-controls">
						<div className="flex justify-between text-xs">
							<label htmlFor="duration">Transition duration</label>
							<p>{duration[0] === 0 ? "Might as well not bother." : `${duration}s`}</p>
						</div>
						<Slider.Root
							name="duration"
							className="group relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
							value={duration}
							onValueChange={(newDuration) => setDuration(newDuration)}
							defaultValue={duration}
							max={2}
							step={0.01}
						>
							<Slider.Track className="bg-blue-900 relative grow rounded-full h-1 group-hover:h-2 duration-100">
								<Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
							</Slider.Track>
							<Slider.Thumb
								className="block bg-blue w-3 h-3 focus-visible:scale-150 group-hover:scale-150 origin-center rounded-full focus:outline-none duration-100"
								aria-label="transition duration"
							/>
						</Slider.Root>
					</div>
					<div id="previews" className="grid grid-cols-3 gap-6 z-10">
						<div
							className="group relative w-full h-16 col-span-3 bg-neutral-900 rounded-lg pt-5 px-8 overflow-clip"
							onWheel={handleScroll}
						>
							<div className="relative z-10 w-full">
								{[...Array(dotCount)].map((_, index) => {
									const left = calculatePosition(
										[cubicBezierA, cubicBezierB, cubicBezierC, cubicBezierD],
										index / (dotCount - 1)
									);
									return (
										<div
											key={index}
											className={`absolute w-6 h-6 -translate-x-1/2 bg-blue/25 rounded-full ${
												transitionDisabled ? "duration-0" : "duration-300"
											} ease-in-out-cubic`}
											style={{ left: `${left}%` }}
										/>
									);
								})}
							</div>
						</div>
						<div className="group relative w-full h-32 col-span-3 bg-neutral-900 rounded-lg">
							<div
								className="absolute left-0 group-hover:left-full group-hover:-translate-x-full w-[calc(33%-14px)] h-full bg-blue rounded-lg"
								style={{ transition: `all ${duration}s cubic-bezier(${cubicBezierText})` }}
							/>
						</div>
						<div className="group w-full h-32 bg-neutral-900 rounded-lg">
							<div
								className="w-full h-full opacity-0 group-hover:opacity-100 bg-blue rounded-lg"
								style={{ transition: `all ${duration}s cubic-bezier(${cubicBezierText})` }}
							/>
						</div>
						<div className="group w-full h-32 bg-neutral-900 rounded-lg">
							<div
								className="w-full h-full rotate-0 group-hover:rotate-180 bg-blue rounded-lg"
								style={{ transition: `all ${duration}s cubic-bezier(${cubicBezierText})` }}
							/>
						</div>
						<div className="group w-full h-32 bg-neutral-900 rounded-lg">
							<div
								className="w-full h-full scale-0 group-hover:scale-100 bg-blue rounded-lg"
								style={{ transition: `all ${duration}s cubic-bezier(${cubicBezierText})` }}
							/>
						</div>
					</div>
				</div>
			</div>
			<Collapsible.Root open={presetsVisible} onOpenChange={setPresetsVisible}>
				<div className="flex items-baseline gap-6 text-xl">
					<Collapsible.Trigger asChild>
						<button onClick={() => setPresetsVisible(!presetsVisible)} className="flex gap-3">
							<h2 className="font-display text-neutral-50">Presets</h2>
							<i
								className={`ri-arrow-down-s-line ${
									presetsVisible ? "rotate-180" : "rotate-0"
								} duration-200 ease-out`}
							/>
						</button>
					</Collapsible.Trigger>
					<hr className="border-neutral-50 grow" />
				</div>
				<Collapsible.Content className="grid grid-cols-3 xl:grid-cols-6 2xl:grid-cols-9 gap-6 xl:gap-9 pt-6 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
					{Presets.map((easing) => (
						<button
							key={easing.type + easing.group}
							onClick={() => {
								handleEasingClickA(easing.positionA);
								handleEasingClickB(easing.positionB);
							}}
							className="group relative"
						>
							<svg
								viewBox="0 0 100 100"
								xmlns="http://www.w3.org/2000/svg"
								className="absolute top-0 left-0 w-full h-auto opacity-0 group-hover:opacity-100 duration-200 animate-rotate"
								style={{
									animationDuration: `${duration}s`,
									// jesus christ
									animationTimingFunction: `cubic-bezier(${easing.positionA.x / 400}, ${
										1 - (easing.positionA.y - offset) / 400
									}, ${easing.positionB.x / 400}, ${1 - (easing.positionB.y - offset) / 400})`,
								}}
							>
								<circle cx="50" cy="5" r="5" fill="#2cf" />
							</svg>
							<div className="w-full flex items-center justify-center aspect-square p-3 mb-3 rounded-full overflow-hidden bg-neutral-900 group-hover:bg-neutral-800 duration-200">
								<svg viewBox="0 0 400 800" xmlns="http://www.w3.org/2000/svg" className="w-2/3 h-auto">
									<path
										d="M4,200 V600 H400"
										fill="transparent"
										stroke="#555"
										strokeWidth={8}
										strokeDasharray={17}
									/>
									<path
										d={`M4,600 C${easing.positionA.x},${
											easing.positionA.y - (offset === 400 ? 200 : 0)
										} ${easing.positionB.x},${
											easing.positionB.y - (offset === 400 ? 200 : 0)
										} 394,196`}
										stroke={`url(#${easing.type})`}
										strokeWidth={8}
										strokeLinecap="round"
										fill="transparent"
									/>
									<defs>
										<linearGradient
											id="in"
											gradientUnits="objectBoundingBox"
											x1="0"
											y1="0"
											x2="1"
											y2="0"
										>
											<stop stopColor="#eee" />
											<stop offset="75%" stopColor="#eee" />
											<stop offset="100%" stopColor="#2cf" />
										</linearGradient>
										<linearGradient
											id="out"
											gradientUnits="objectBoundingBox"
											x1="0"
											y1="0"
											x2="1"
											y2="0"
										>
											<stop stopColor="#2cf" />
											<stop offset="25%" stopColor="#eee" />
											<stop offset="100%" stopColor="#eee" />
										</linearGradient>
										<linearGradient
											id="in-out"
											gradientUnits="objectBoundingBox"
											x1="0"
											y1="0"
											x2="1"
											y2="0"
										>
											<stop stopColor="#2cf" />
											<stop offset="33%" stopColor="#eee" />
											<stop offset="66%" stopColor="#eee" />
											<stop offset="100%" stopColor="#2cf" />
										</linearGradient>
									</defs>
								</svg>
							</div>
							<p className="text-xs group-hover:text-neutral-50 duration-200">
								{easing.type} <span className="font-medium text-neutral-50">{easing.group}</span>
							</p>
						</button>
					))}
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
	);
}
