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
			options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
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

export const Default: Story = {
	args: {
		variant: "default",
		size: "default",
		children: "Click me",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		size: "default",
		children: "Delete",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		size: "default",
		children: "Outline",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		size: "default",
		children: "Secondary",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		size: "default",
		children: "Ghost",
	},
};

export const Link: Story = {
	args: {
		variant: "link",
		size: "default",
		children: "Learn more",
	},
};

export const Small: Story = {
	args: {
		variant: "default",
		size: "sm",
		children: "Small",
	},
};

export const Large: Story = {
	args: {
		variant: "default",
		size: "lg",
		children: "Large",
	},
};

export const Icon: Story = {
	args: {
		variant: "default",
		size: "icon",
		children: "🔔 Click",
	},
};
