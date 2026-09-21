import type { Meta, StoryObj } from "@storybook/react";
import { ReactionBar } from "./ReactionBar";

const meta: Meta<typeof ReactionBar> = {
  title: "Atoms/ReactionBar",
  component: ReactionBar,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ReactionBar>;

export const Default: Story = {
  args: {},
};

export const WithHandlers: Story = {
  args: {
    onCopy: () => alert("Copié !"),
    onLike: () => alert("Aimé !"),
    onDislike: () => alert("Pas aimé !"),
    onAudio: () => alert("Audio !"),
    onReset: () => alert("Régénéré !"),
  },
};
