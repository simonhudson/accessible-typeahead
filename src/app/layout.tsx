import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Auto Complete by Simon Hudson',
	description: 'Auto Complete by Simon Hudson',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
