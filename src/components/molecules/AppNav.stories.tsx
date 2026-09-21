import type { Meta, StoryObj } from "@storybook/react";
import { AppNav } from "./AppNav";

const meta: Meta<typeof AppNav> = {
  title: "Molecules/AppNav",
  component: AppNav,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["large", "small"] },
  },
};

export default meta;
type Story = StoryObj<typeof AppNav>;

const pinnedChats = [
  { id: "p1", label: "Analyse rapport Q3 2024", pinned: true },
  { id: "p2", label: "Stratégie commerciale EMEA", pinned: true },
];

const recentChats = [
  { id: "c1", label: "Synthèse réunion directeurs" },
  { id: "c2", label: "Rédaction email client Bouygues" },
  { id: "c3", label: "Budget prévisionnel 2025" },
  { id: "c4", label: "Plan de projet — site vitrine" },
];

export const EmptyNav: Story = {
  args: { size: "large" },
};

export const WithContent: Story = {
  args: {
    size: "large",
    pinnedChats,
    recentChats,
    activeItemId: "c1",
  },
};

export const ActiveChat: Story = {
  args: {
    size: "large",
    pinnedChats,
    recentChats,
    activeItemId: "c2",
  },
};

export const SmallSize: Story = {
  args: {
    size: "small",
    pinnedChats,
    recentChats,
    activeItemId: "p1",
  },
};

export const OnlyRecent: Story = {
  args: {
    size: "large",
    recentChats,
    activeItemId: "c3",
  },
};
