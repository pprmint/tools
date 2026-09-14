/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheComponents: true,
	async redirects() {
		return [
			{
				source: "/lorem",
				destination: "/lorem-ipsum",
				permanent: true,
			},
			{
				source: "/filter",
				destination: "/filter-color",
				permanent: true,
			},
			{
				source: "/cubic",
				destination: "/cubic-bezier",
				permanent: true,
			},
			{
				source: "/easing",
				destination: "/cubic-bezier",
				permanent: true,
			},
			{
				source: "/svg",
				destination: "/svg-generators",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
