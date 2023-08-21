'use client';

import React, { useRef, useState } from 'react';
import { Wrapper, Label, LabelInfo, Input, ResultsWrapper, ResultsList, ResultsItem } from './index.styles';
import AssistiveContent from './assistive-content';
import { returnKeyPressed } from './helpers/returnKeyPressed';
import { NO_RESULTS_STRING } from './constants';
import type { TypeAheadProps } from './index.d';

const TypeAhead = ({
	dataSource,
	inputId,
	label,
	labelInfo,
	minQueryLength = 3,
	placeholder,
	showAllResultsOnFocus = true,
}: TypeAheadProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const resultsListRef = useRef<HTMLUListElement>(null);

	const [results, setResults] = useState<string[]>([]);
	const [selectedValue, setSelectedValue] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState<string>('');

	const clearResults = (): void => setResults([]);
	const clearSelectedValue = (): void => setSelectedValue(null);

	const getInputValue = (): string => inputRef?.current?.value ?? '';
	const getInputValueLength = (): number => getInputValue().length;
	const getResultsLength = (): number => results?.length;

	const queryDataSource = (): void => {
		if (getInputValueLength() >= minQueryLength) {
			const queryResults: string[] = dataSource.filter((item) =>
				item.toLowerCase().includes(getInputValue().toLowerCase())
			);
			setResults(queryResults);
		} else {
			clearResults();
			clearSelectedValue();
		}
	};

	const selectValueFromList = (item: string): void => {
		setInputValue(item);
		setSelectedValue(item);
		clearResults();
	};

	return (
		<Wrapper>
			<AssistiveContent
				minQueryLength={minQueryLength}
				queryLength={getInputValueLength()}
				resultsLength={results.length}
				noResultsFound={results.length === 1 && results[0] === NO_RESULTS_STRING}
				selectedValue={selectedValue}
				inputId={inputId}
			/>
			<Label htmlFor={inputId}>
				{label}
				{labelInfo && <LabelInfo>{labelInfo}</LabelInfo>}
			</Label>
			<Input
				aria-describedby="typeahead-assistive-hint"
				autoComplete="off"
				id={inputId}
				onChange={(e) => {
					setInputValue(e.target.value);
					queryDataSource();
				}}
				onFocus={() => (showAllResultsOnFocus ? setResults(dataSource) : null)}
				placeholder={`${
					placeholder ? placeholder : `Type ${minQueryLength} or more characters to see suggestions`
				}`}
				ref={inputRef}
				type="text"
				value={inputValue}
			/>
			{getInputValueLength() >= minQueryLength && !!getResultsLength() && (
				<ResultsWrapper>
					{!getResultsLength() && !selectedValue && <p>Sorry, no results for {getInputValue()}.</p>}
					{!!getResultsLength() && (
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

export default TypeAhead;
