import type { Meta, StoryObj } from "@storybook/react";
import { Globe, Tag } from "lucide-react";
import { AppBadge } from "./AppBadge";

const meta: Meta<typeof AppBadge> = {
  title: "Atoms/AppBadge",
  component: AppBadge,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["outline", "filled"] },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof AppBadge>;

export const OutlineWithIcon: Story = {
  args: {
    variant: "outline",
    label: "Rechercher sur le web",
    icon: Globe,
  },
};

export const OutlineWithRemove: Story = {
  args: {
    variant: "outline",
    label: "Rechercher sur le web",
    icon: Globe,
    onRemove: () => {},
  },
};

export const FilledWithIcon: Story = {
  args: {
    variant: "filled",
    label: "Rechercher sur le web",
    icon: Globe,
  },
};

export const FilledWithRemove: Story = {
  args: {
    variant: "filled",
    label: "Web",
    icon: Globe,
    onRemove: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <AppBadge variant="outline" label="Rechercher sur le web" icon={Globe} />
      <AppBadge variant="outline" label="Rechercher sur le web" icon={Globe} onRemove={() => {}} />
      <AppBadge variant="filled" label="Rechercher sur le web" icon={Globe} />
      <AppBadge variant="filled" label="Rechercher sur le web" icon={Globe} onRemove={() => {}} />
      <AppBadge variant="outline" label="Étiquette" icon={Tag} />
    </div>
  ),
};
