import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/button";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"success",
				"warning",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link",
			],
		},
		size: {
			control: "select",
			options: ["default", "sm", "lg", "icon"],
		},
		asChild: {
			control: "boolean",
		},
	},
	args: {
		children: "Click me",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButton: Story = {
	args: {
		variant: "default",
		size: "default",
		children: "Click me",
	},
};

export const ErrorButton: Story = {
	args: {
		variant: "destructive",
		size: "default",
		children: "Delete",
	},
};
