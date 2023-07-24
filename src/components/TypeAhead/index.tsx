'use client';

import React, { useRef, useState } from 'react';
import { Wrapper, Label, LabelInfo, Input, ResultsWrapper, ResultsList, ResultsItem } from './index.styles';

interface TypeAheadProps {
	dataSource: string[];
	inputId: string;
	label: string;
	labelInfo?: string;
	minQueryLength?: number;
}

const TypeAhead = ({ dataSource, inputId, label, labelInfo, minQueryLength = 3 }: TypeAheadProps) => {
	const inputRef = useRef<HTMLInputElement>();
	const resultsListRef = useRef<HTMLUListElement>();

	const [results, setResults] = useState(undefined);
	const [selectedValue, setSelectedValue] = useState(undefined);
	const [inputValue, setInputValue] = useState('');

	const clearResults = (): void => setResults(null);
	const clearSelectedValue = (): void => setSelectedValue(undefined);

	const queryDataSource = (): void => {
		const inputValue = inputRef?.current?.value;
		const inputValueLength = inputValue?.length ?? 0;
		if (inputValueLength >= minQueryLength) {
			const queryResults = dataSource.filter((item) => item.toLowerCase().includes(inputValue?.toLowerCase()));
			setResults(queryResults);
		} else {
			clearResults();
			clearSelectedValue();
		}
	};

	return (
		<Wrapper>
			<p>selectedValue -> {selectedValue}</p>
			<Label htmlFor={inputId}>
				{label}
				{labelInfo && <LabelInfo>{labelInfo}</LabelInfo>}
			</Label>
			<Input
				id={inputId}
				onChange={(e) => {
					setInputValue(e.target.value);
					queryDataSource();
				}}
				ref={inputRef}
				type="text"
				value={selectedValue ?? inputValue}
			/>
			{inputRef?.current?.value?.length >= minQueryLength && !!results?.length && (
				<ResultsWrapper>
					{(!results || !results.length) && !selectedValue && (
						<p>Sorry, no results for {inputRef?.current?.value}.</p>
					)}
					{!!results?.length && (
						<ResultsList ref={resultsListRef}>
							{results.map((item: string) => {
								const slug = item.toLowerCase().replace(/\s/g, '-');
								return (
									<ResultsItem
										key={`results-list--${slug}`}
										onClick={() => {
											setSelectedValue(item);
											clearResults();
										}}
									>
										{item}
									</ResultsItem>
								);
							})}
						</ResultsList>
					)}
				</ResultsWrapper>
			)}
		</Wrapper>
	);
};

export default TypeAhead;
