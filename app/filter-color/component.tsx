"use client";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import Button from "@/components/Button";

export default function Component() {
	const [sourceColor, setSourceColor] = useState("123456");
	const [targetColor, setTargetColor] = useState("ABCDEF"); // cry about it

	const [brightness, setBrightness] = useState([100]);
	const [contrast, setContrast] = useState([100]);
	const [hueRotate, setHueRotate] = useState([0]);
	const [invert, setInvert] = useState([0]);
	const [saturate, setSaturate] = useState([100]);
	const [sepia, setSepia] = useState([0]);

	const allFilters = [
		brightness[0] !== 100 ? `brightness(${brightness[0]}%)` : "",
		contrast[0] !== 100 ? `contrast(${contrast[0]}%)` : "",
		hueRotate[0] !== 0 ? `hue-rotate(${hueRotate[0]}deg)` : "",
		invert[0] !== 0 ? `invert(${invert[0]}%)` : "",
		saturate[0] !== 100 ? `saturate(${saturate[0]}%)` : "",
		sepia[0] !== 0 ? `sepia(${sepia[0]}%)` : "",
	]
		.filter((filter) => filter !== "")
		.join(" ");

	const filters = allFilters.length > 0 ? allFilters : "none";

	return (
		<div className="grid grid-cols-2 gap-6">
			<div>
				<label htmlFor="source" className="text-xs">
					Source color
				</label>
				<div className="flex items-center text-neutral-50 font-display text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
					#
					<input
						type="text"
						name="source"
						id="source"
						placeholder="123456"
						maxLength={6}
						className="bg-transparent placeholder:text-neutral-600 w-full focus:outline-none"
						onChange={(e) => {
							(e.target.value.length === 3 || e.target.value.length === 6) && setSourceColor(e.target.value);
						}}
					/>
				</div>
			</div>
			<div>
				<label htmlFor="target" className="text-xs">
					Target color
				</label>
				<div className="flex items-center text-neutral-50 font-display text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
					#
					<input
						type="text"
						name="target"
						id="target"
						placeholder="ABCDEF"
						maxLength={6}
						className="bg-transparent placeholder:text-neutral-600 w-full focus:outline-none"
						onChange={(e) => {
							(e.target.value.length === 3 || e.target.value.length === 6) && setTargetColor(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 col-span-2">
				<div
					style={{
						backgroundColor: `#${sourceColor}`,
						filter: allFilters,
					}}
					className="w-full h-12 lg:h-24 rounded-l-lg"
				/>
				<div style={{ backgroundColor: `#${targetColor}` }} className="w-full h-12 lg:h-24 rounded-r-lg" />
			</div>
			<div className="flex gap-3 col-span-2 bg-neutral-900 rounded-lg px-4 py-3">
				<p className="grow">
					filter: <span className="text-neutral-50">{filters}</span>;
				</p>
				<button
					className="text-sm hover:text-neutral-50 duration-100"
					onClick={() => navigator.clipboard.writeText(`filter: ${filters};`)}
				>COPY</button>
			</div>
			<div className="flex flex-col col-span-2 lg:col-span-1">
				<div className="flex justify-between text-xs">
					<label htmlFor="brightness">Brightness</label>
					{brightness[0] !== 100 && (
						<i
							onClick={() => setBrightness([100])}
							className="ri-loop-left-line hover:text-neutral-50 hover:-rotate-180 cursor-pointer duration-300 ease-in-out"
						/>
					)}
				</div>
				<Slider.Root
					name="brightness"
					className="group relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
					value={brightness}
					onValueChange={(newBrightness) => setBrightness(newBrightness)}
					defaultValue={brightness}
					max={500}
					step={1}
				>
					<Slider.Track className="bg-blue-900 relative grow rounded-full h-1 group-hover:h-2 duration-100">
						<Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
					</Slider.Track>
					<Slider.Thumb
						className="block bg-blue w-3 h-3 focus-visible:scale-150 group-hover:scale-150 origin-center rounded-full focus:outline-none duration-100"
						aria-label="Brightness"
					/>
				</Slider.Root>
			</div>
			<div className="flex flex-col col-span-2 lg:col-span-1">
				<div className="flex justify-between text-xs">
					<label htmlFor="contrast">Contrast</label>
					{contrast[0] !== 100 && (
						<i
							onClick={() => setContrast([100])}
							className="ri-loop-left-line hover:text-neutral-50 hover:-rotate-180 cursor-pointer duration-300 ease-in-out"
						/>
					)}
				</div>
				<Slider.Root
					name="contrast"
					className="group relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
					value={contrast}
					onValueChange={(newContrast) => setContrast(newContrast)}
					defaultValue={contrast}
					max={500}
					step={1}
				>
					<Slider.Track className="bg-blue-900 relative grow rounded-full h-1 group-hover:h-2 duration-100">
						<Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
					</Slider.Track>
					<Slider.Thumb
						className="block bg-blue w-3 h-3 focus-visible:scale-150 group-hover:scale-150 origin-center rounded-full focus:outline-none duration-100"
						aria-label="Contrast"
					/>
				</Slider.Root>
			</div>
			<div className="flex flex-col col-span-2 lg:col-span-1">
				<div className="flex justify-between text-xs">
					<label htmlFor="hueRotate">Hue rotate</label>
					{hueRotate[0] !== 0 && (
						<i
							onClick={() => setHueRotate([0])}
							className="ri-loop-left-line hover:text-neutral-50 hover:-rotate-180 cursor-pointer duration-300 ease-in-out"
						/>
					)}
				</div>
				<Slider.Root
					name="hueRotate"
					className="group relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
					value={hueRotate}
					onValueChange={(newHueRotate) => setHueRotate(newHueRotate)}
					defaultValue={hueRotate}
					min={-180}
					max={180}
					step={1}
				>
					<Slider.Track className="bg-blue-900 relative grow rounded-full h-1 group-hover:h-2 duration-100">
						<Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
					</Slider.Track>
					<Slider.Thumb
						className="block bg-blue w-3 h-3 focus-visible:scale-150 group-hover:scale-150 origin-center rounded-full focus:outline-none duration-100"
						aria-label="Hue rotate"
					/>
				</Slider.Root>
			</div>
			<div className="flex flex-col col-span-2 lg:col-span-1">
				<div className="flex justify-between text-xs">
					<label htmlFor="invert">Invert</label>
					{invert[0] !== 0 && (
						<i
							onClick={() => setInvert([0])}
							className="ri-loop-left-line hover:text-neutral-50 hover:-rotate-180 cursor-pointer duration-300 ease-in-out"
						/>
					)}
				</div>
				<Slider.Root
					name="invert"
					className="group relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
					value={invert}
					onValueChange={(newInvert) => setInvert(newInvert)}
					defaultValue={invert}
					max={100}
					step={1}
				>
					<Slider.Track className="bg-blue-900 relative grow rounded-full h-1 group-hover:h-2 duration-100">
						<Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
					</Slider.Track>
					<Slider.Thumb
						className="block bg-blue w-3 h-3 focus-visible:scale-150 group-hover:scale-150 origin-center rounded-full focus:outline-none duration-100"
						aria-label="Invert"
					/>
				</Slider.Root>
			</div>
			<div className="flex flex-col col-span-2 lg:col-span-1">
				<div className="flex justify-between text-xs">
					<label htmlFor="invert">Saturate</label>
					{saturate[0] !== 100 && (
						<i
							onClick={() => setSaturate([100])}
							className="ri-loop-left-line hover:text-neutral-50 hover:-rotate-180 cursor-pointer duration-300 ease-in-out"
						/>
					)}
				</div>
				<Slider.Root
					name="saturate"
					className="group relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
					value={saturate}
					onValueChange={(newSaturate) => setSaturate(newSaturate)}
					defaultValue={saturate}
					max={500}
					step={1}
				>
					<Slider.Track className="bg-blue-900 relative grow rounded-full h-1 group-hover:h-2 duration-100">
						<Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
					</Slider.Track>
					<Slider.Thumb
						className="block bg-blue w-3 h-3 focus-visible:scale-150 group-hover:scale-150 origin-center rounded-full focus:outline-none duration-100"
						aria-label="Saturate"
					/>
				</Slider.Root>
			</div>
			<div className="flex flex-col col-span-2 lg:col-span-1">
				<div className="flex justify-between text-xs">
					<label htmlFor="invert">Sepia</label>
					{sepia[0] !== 0 && (
						<i
							onClick={() => setSepia([0])}
							className="ri-loop-left-line hover:text-neutral-50 hover:-rotate-180 cursor-pointer duration-300 ease-in-out"
						/>
					)}
				</div>
				<Slider.Root
					name="sepia"
					className="group relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
					value={sepia}
					onValueChange={(newSepia) => setSepia(newSepia)}
					defaultValue={sepia}
					max={100}
					step={1}
				>
					<Slider.Track className="bg-blue-900 relative grow rounded-full h-1 group-hover:h-2 duration-100">
						<Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
					</Slider.Track>
					<Slider.Thumb
						className="block bg-blue w-3 h-3 focus-visible:scale-150 group-hover:scale-150 origin-center rounded-full focus:outline-none duration-100"
						aria-label="Sepia"
					/>
				</Slider.Root>
			</div>
			<div className="grid col-span-2 justify-end">
				<Button
					disabled={allFilters.length < 1}
					onClick={() => {
						setBrightness([100]);
						setContrast([100]);
						setHueRotate([0]);
						setInvert([0]);
						setSaturate([100]);
						setSepia([0]);
					}}
				>
					<i className="ri-loop-left-line group-hover:-rotate-180 duration-300 ease-in-out" />
					Reset all
				</Button>
			</div>
		</div>
	);
}
