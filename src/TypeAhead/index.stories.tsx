import type { Meta, StoryObj } from '@storybook/react';
import TypeAhead from './index';

const meta = {
	title: 'TypeAhead',
	component: TypeAhead,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'fullscreen',
	},
} satisfies Meta<typeof TypeAhead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeAheadStory: Story = {
	args: {
		dataSource: ['Foo', 'Bar', 'Lorem', 'Ipsum', 'Foobar'],
		inputId: 'input-id',
		label: 'Some label',
		labelInfo: 'This is some label info',
		minQueryLength: 3,
		placeholder: 'Some placeholder',
		showAllResultsOnFocus: true,
	},
};
