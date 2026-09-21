import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenu } from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Molecules/ContextMenu",
  component: ContextMenu,
  parameters: { layout: "centered" },
  argTypes: {
    type: { control: "select", options: ["projet", "chat", "source", "chat-epingle"] },
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const ProjetMenu: Story = {
  args: { type: "projet" },
};

export const ChatMenu: Story = {
  args: { type: "chat" },
};

export const ChatEpingleMenu: Story = {
  args: { type: "chat-epingle" },
};

export const SourceMenu: Story = {
  args: { type: "source" },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex gap-6 items-start">
      <div>
        <p className="text-caption-mobile text-gris-clair-lm mb-2">Projet</p>
        <ContextMenu type="projet" />
      </div>
      <div>
        <p className="text-caption-mobile text-gris-clair-lm mb-2">Chat</p>
        <ContextMenu type="chat" />
      </div>
      <div>
        <p className="text-caption-mobile text-gris-clair-lm mb-2">Chat épinglé</p>
        <ContextMenu type="chat-epingle" />
      </div>
      <div>
        <p className="text-caption-mobile text-gris-clair-lm mb-2">Source</p>
        <ContextMenu type="source" />
      </div>
    </div>
  ),
};
