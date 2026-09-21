import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ProjetCard } from "./ProjetCard";
import { MOCK_PROJECTS, projectToCardProps } from "@/lib/mock-data";

const meta: Meta<typeof ProjetCard> = {
  title: "Molecules/ProjetCard",
  component: ProjetCard,
  parameters: { layout: "centered" },
  args: {
    onClick: fn(),
    onPin: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["large", "small"],
    },
    pinned: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ProjetCard>;

const p = MOCK_PROJECTS.map(projectToCardProps);

export const LargeDefault: Story = {
  name: "Large — Default",
  render: (args) => (
    <div className="w-[440px]">
      <ProjetCard {...args} />
    </div>
  ),
  args: { ...p[0] },
};

export const LargePinned: Story = {
  name: "Large — Épinglé",
  render: (args) => (
    <div className="w-[440px]">
      <ProjetCard {...args} />
    </div>
  ),
  args: { ...p[1] },
};

export const LargeNoDescription: Story = {
  name: "Large — Sans description",
  render: (args) => (
    <div className="w-[440px]">
      <ProjetCard {...args} />
    </div>
  ),
  args: { ...p[2], description: undefined },
};

export const LargeLongTitle: Story = {
  name: "Large — Titre long",
  render: (args) => (
    <div className="w-[440px]">
      <ProjetCard {...args} />
    </div>
  ),
  args: { ...p[3], titre: "Ce titre est vraiment très long et devrait être tronqué" },
};

export const SmallDefault: Story = {
  name: "Small — Default",
  render: (args) => (
    <div className="w-[289px]">
      <ProjetCard {...args} />
    </div>
  ),
  args: { ...p[0], size: "small" },
};

export const SmallPinned: Story = {
  name: "Small — Épinglé",
  render: (args) => (
    <div className="w-[289px]">
      <ProjetCard {...args} />
    </div>
  ),
  args: { ...p[1], size: "small" },
};

export const GridView: Story = {
  name: "Grille — 2 colonnes",
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 w-[920px]">
      {p.slice(0, 4).map((projet) => (
        <ProjetCard key={projet.id} {...args} {...projet} />
      ))}
    </div>
  ),
  args: { size: "large" },
};

export const SmallGridView: Story = {
  name: "Grille — Small (3 colonnes)",
  render: (args) => (
    <div className="grid grid-cols-3 gap-4 w-[920px]">
      {p.slice(0, 3).map((projet) => (
        <ProjetCard key={projet.id} {...args} {...projet} size="small" />
      ))}
    </div>
  ),
  args: { size: "small" },
};
