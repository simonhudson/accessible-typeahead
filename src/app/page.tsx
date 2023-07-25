'use client';

import Link from 'next/link';
import TypeAhead from '@/components/TypeAhead';
import data from './data';
import styled from 'styled-components';
import { rem } from 'polished';

const MIN_QUERY_LENGTH = 3;

const AppWrapper = styled.div`
	margin: 0 auto;
	width: 90%;
`;

const Footer = styled.footer`
	border-top: 1px solid #eee;
	margin: ${rem(20)} 0 0;
	padding: ${rem(10)} 0;
`;

const now = new Date();
const REPO_URL = 'https://github.com/simonhudson/accessible-typeahead';

const Home = () => {
	return (
		<AppWrapper>
			<h1>Accessible Typeahead</h1>
			<TypeAhead
				dataSource={data}
				inputId="input-id"
				label="Search for film titles from the AFI's Top 100 list"
				labelInfo={`Type ${MIN_QUERY_LENGTH} or more characters to see suggestions`}
				minQueryLength={MIN_QUERY_LENGTH}
			/>
			<Footer>
				<p>&copy; {now.getFullYear()} Simon Hudson</p>
				<p>
					<Link href={REPO_URL}>{REPO_URL}</Link>
				</p>
			</Footer>
		</AppWrapper>
	);
};

export default Home;
