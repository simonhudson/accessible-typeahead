'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Label, LabelInfo, Input, ResultsWrapper, ResultsList, ResultsItem } from './index.styles';
import AssistiveContent from './assistive-content';
import returnKeyPressed from '@/helpers/returnKeyPressed';
import type { AutoCompleteProps } from '@/types/auto-complete';

const AutoComplete = ({ dataSource, inputId, label, labelInfo, minQueryLength = 3 }: AutoCompleteProps) => {
	const [results, setResults] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState<string>('');
	const [inputValueMeetsMinQueryLength, setInputValueMeetsMinQueryLength] = useState<boolean>(false);
	const [selectedValue, setSelectedValue] = useState<string | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);
	const resultsListRef = useRef<HTMLUListElement>(null);

	const handleKeyUp = (): void => {
		if (inputRef?.current) {
			const value = inputRef?.current?.value;
			setInputValueMeetsMinQueryLength(value.length >= minQueryLength);
			setInputValue(value);
		}
	};

	const clearResults = (): void => setResults([]);

	const selectValueFromList = (item: string): void => {
		setInputValue(item);
		setSelectedValue(item);
		clearResults();
	};

	useEffect(() => {
		setResults(dataSource);
	}, [dataSource]);

	// useEffect(() => {
	// 	if (inputValueMeetsMinQueryLength && resultsListRef?.current) {
	// 		Array.from(resultsListRef.current.querySelectorAll('li')).forEach((item) => {
	// 			item.innerHTML = item.innerHTML.replace(
	// 				new RegExp(inputValue, 'i'),
	// 				(str: string) => `<strong>${str}</strong>`
	// 			);
	// 		});
	// 	}
	// }, [inputValue, inputValueMeetsMinQueryLength]);

	useEffect(() => {
		if (inputValueMeetsMinQueryLength) {
			const filteredData = dataSource?.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()));
			setResults(filteredData);
		} else {
			clearResults();
		}
	}, [dataSource, inputValue, inputValueMeetsMinQueryLength]);

	return (
		<Wrapper>
			<AssistiveContent
				minQueryLength={minQueryLength}
				queryLength={inputValue.length}
				resultsLength={results.length}
				selectedValue={selectedValue}
			/>
			<Label htmlFor={inputId}>
				{label}
				{labelInfo && <LabelInfo>{labelInfo}</LabelInfo>}
			</Label>
			<Input
				aria-describedby="auto-complete-assistive-hint"
				autoComplete="off"
				id={inputId}
				onChange={(e) => {
					setInputValue(e.target.value);
					handleKeyUp();
				}}
				ref={inputRef}
				type="text"
				value={inputValue}
			/>
			{inputValueMeetsMinQueryLength && !!results.length && (
				<ResultsWrapper>
					{!results.length && !selectedValue && <p>Sorry, no results for {inputValue}.</p>}
					{!!results.length && (
						<ResultsList ref={resultsListRef}>
							{results.map((item: string) => {
								const slug: string = item.toLowerCase().replace(/\s/g, '-');
								return (
									<ResultsItem
										key={`results-list--${slug}`}
										onClick={() => selectValueFromList(item)}
										onKeyUp={(e) => {
											if (returnKeyPressed(e)) selectValueFromList(item);
										}}
										tabIndex={0}
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

export default AutoComplete;
