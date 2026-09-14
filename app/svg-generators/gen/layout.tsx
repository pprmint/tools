// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<div>{children}</div>
            <div className="flex whitespace-nowrap overflow-x-auto bg-neutral-900">
                
            </div>
		</main>
	);
}
