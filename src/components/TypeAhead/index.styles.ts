import styled from 'styled-components';
import { rem } from 'polished';

export const Wrapper = styled.div`
	position: relative;
`;

export const Label = styled.label`
	display: block;
	font-weight: bold;
	margin-bottom: ${rem(10)};
`;

export const LabelInfo = styled.span`
	display: block;
	font-weight: normal;
`;

export const Input = styled.input`
	border: 1px solid #ddd;
	padding: ${rem(10)};
`;

const resultsItemPadding = 10;

export const ResultsWrapper = styled.div`
	background: #ffffff;
	border: 1px solid #ddd;
	bottom: calc(-50% - ${resultsItemPadding}) -1px;
	left: 0;
	position: absolute;
	width: 100%;
`;

export const ResultsList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

export const ResultsItem = styled.li`
	border-bottom: 1px solid #ddd;
	margin: 0;
	padding: ${rem(resultsItemPadding)};

	&:last-of-type {
		border-bottom: none;
	}

	&:hover,
	&:focus {
		background: #ddd;
	}
`;
