import type { Meta, StoryObj } from "@storybook/react";
import { MoreVertical, Pin, X, Plus, Search, Mic, Send } from "lucide-react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["large", "medium", "small"] },
    variant: { control: "select", options: ["default", "hover", "selected", "disabled"] },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { icon: MoreVertical, size: "medium", variant: "default", "aria-label": "Menu" },
};

export const Selected: Story = {
  args: { icon: Pin, size: "medium", variant: "selected", "aria-label": "Épingler" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <IconButton icon={MoreVertical} size="large" aria-label="Large" />
      <IconButton icon={MoreVertical} size="medium" aria-label="Medium" />
      <IconButton icon={MoreVertical} size="small" aria-label="Small" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <IconButton icon={Pin} size="medium" variant="default" aria-label="Default" />
        <IconButton icon={Pin} size="medium" variant="hover" aria-label="Hover" />
        <IconButton icon={Pin} size="medium" variant="selected" aria-label="Selected" />
        <IconButton icon={Pin} size="medium" variant="disabled" aria-label="Disabled" />
      </div>
      <div className="flex gap-3 items-center">
        <IconButton icon={Search} size="large" aria-label="Rechercher" />
        <IconButton icon={Plus} size="large" aria-label="Ajouter" />
        <IconButton icon={X} size="large" aria-label="Fermer" />
        <IconButton icon={Mic} size="large" aria-label="Micro" />
        <IconButton icon={Send} size="large" aria-label="Envoyer" />
      </div>
    </div>
  ),
};
