'use client';

import Link from 'next/link';
import AutoComplete from '@/components/auto-complete';
import data from './data';
import styled from 'styled-components';
import { rem } from 'polished';

const MIN_QUERY_LENGTH = 3;

const AppWrapper = styled.div`
	font-family: sans-serif;
	margin: 0 auto;
	padding: ${rem(20)} 0;
	width: 90%;

	@media only screen and (min-width: 1024px) {
		width: 60%;
	}
`;

const Header = styled.header`
	border-bottom: 1px solid #eee;
	margin: 0 0 ${rem(40)} 0;
	padding: 0 0 ${rem(20)};

	p {
		line-height: ${rem(24)};
	}
`;

const Footer = styled.footer`
	border-top: 1px solid #eee;
	margin: ${rem(40)} 0 0;
	padding: ${rem(10)} 0;

	span {
		display: block;
		margin-bottom: 10px;
	}
`;

const now = new Date();
const REPO_URL = 'https://github.com/simonhudson/auto-complete';

const Home = () => {
	return (
		<AppWrapper>
			<Header>
				<h1>Auto Complete</h1>
				<p>
					Form input which provides filtered suggestions based on input. Support added for screen readers
					which announces instructions for use, how many results are available, and which result has been
					selected.
				</p>
			</Header>
			<AutoComplete
				dataSource={data}
				inputId="input-id"
				label="Search for film titles from the AFI's Top 100 list"
				labelInfo={`Type ${MIN_QUERY_LENGTH} or more characters to see suggestions`}
				minQueryLength={MIN_QUERY_LENGTH}
			/>
			<Footer>
				<p>
					<span>
						<Link href={REPO_URL}>{REPO_URL}</Link>
					</span>
					<span>&copy; {now.getFullYear()} Simon Hudson</span>
				</p>
			</Footer>
		</AppWrapper>
	);
};

export default Home;
