'use client';

import React, { useRef, useState } from 'react';
import { Wrapper, Label, LabelInfo, Input, ResultsWrapper, ResultsList, ResultsItem } from './index.styles';

type TypeAheadProps = {
	dataSource: string[];
	inputId: string;
	label: string;
	labelInfo?: string;
	minQueryLength?: number;
};

const TypeAhead = ({ dataSource, inputId, label, labelInfo, minQueryLength = 3 }: TypeAheadProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const resultsListRef = useRef<HTMLUListElement>(null);

	const [results, setResults] = useState<string[]>([]);
	const [selectedValue, setSelectedValue] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState<string>('');

	const clearResults = (): void => setResults([]);
	const clearSelectedValue = (): void => setSelectedValue(null);

	const queryDataSource = (): void => {
		const inputValue: string = inputRef?.current?.value ?? '';
		const inputValueLength: number = inputValue?.length ?? 0;
		if (inputValueLength >= minQueryLength) {
			const queryResults: string[] = dataSource.filter((item) =>
				item.toLowerCase().includes(inputValue?.toLowerCase())
			);
			setResults(queryResults);
		} else {
			clearResults();
			clearSelectedValue();
		}
	};

	return (
		<Wrapper>
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
			{!!inputRef.current && inputRef.current.value.length >= minQueryLength && !!results?.length && (
				<ResultsWrapper>
					{(!results || !results.length) && !selectedValue && (
						<p>Sorry, no results for {inputRef?.current?.value}.</p>
					)}
					{!!results?.length && (
						<ResultsList ref={resultsListRef}>
							{results.map((item: string) => {
								const slug: string = item.toLowerCase().replace(/\s/g, '-');
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
