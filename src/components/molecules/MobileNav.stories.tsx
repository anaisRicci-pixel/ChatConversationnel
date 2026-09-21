import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { MobileNav } from "./MobileNav";

const meta: Meta<typeof MobileNav> = {
  title: "Molecules/MobileNav",
  component: MobileNav,
  parameters: { layout: "centered" },
  args: {
    onClose: fn(),
    onNewDiscussion: fn(),
    onProjectsClick: fn(),
    onItemClick: fn(),
    onPinItem: fn(),
    onUnpinItem: fn(),
    onDeleteItem: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof MobileNav>;

const pinnedItems = [
  { id: "p1", label: "A quoi sert Open Router ?" },
  { id: "p2", label: "Peux tu me proposer un plan de migration AZURE?" },
];

const recentItems = [
  { id: "c1", label: "Quelle est ma consommation de token de ce mois ?" },
  { id: "c2", label: "Dans quels cas utiliser Fable 5 ?" },
  { id: "c3", label: "What are Pros and Cons for LLM use ?", isProject: true },
  { id: "c4", label: "Je souhaite réaliser une automation avec N8N", isProject: true },
  { id: "c5", label: "Réalise un benchmark des outils open sources" },
];

export const Default: Story = {
  render: (args) => (
    <div className="w-[320px] h-[700px] border border-separateurs-lm rounded-r-lg overflow-hidden">
      <MobileNav {...args} pinnedItems={pinnedItems} recentItems={recentItems} activeItemId="c2" />
    </div>
  ),
};

export const Empty: Story = {
  render: (args) => (
    <div className="w-[320px] h-[700px] border border-separateurs-lm rounded-r-lg overflow-hidden">
      <MobileNav {...args} />
    </div>
  ),
};

export const WithActiveItem: Story = {
  render: (args) => (
    <div className="w-[320px] h-[700px] border border-separateurs-lm rounded-r-lg overflow-hidden">
      <MobileNav {...args} pinnedItems={pinnedItems} recentItems={recentItems} activeItemId="p1" />
    </div>
  ),
};

export const DiscussionsCollapsed: Story = {
  render: (args) => (
    <div className="w-[320px] h-[700px] border border-separateurs-lm rounded-r-lg overflow-hidden">
      <MobileNav {...args} pinnedItems={pinnedItems} recentItems={recentItems} activeItemId="c1" />
    </div>
  ),
};
