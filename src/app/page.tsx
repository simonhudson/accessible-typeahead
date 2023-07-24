'use client';

import TypeAhead from '@/components/TypeAhead';
import data from './data';
import styled from 'styled-components';

const MIN_QUERY_LENGTH = 3;

const AppWrapper = styled.div`
	margin: 0 auto;
	width: 85%;
`;

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
		</AppWrapper>
	);
};

export default Home;
