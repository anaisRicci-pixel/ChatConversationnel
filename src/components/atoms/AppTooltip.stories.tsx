import type { Meta, StoryObj } from "@storybook/react";
import { AppTooltip } from "./AppTooltip";

const meta: Meta<typeof AppTooltip> = {
  title: "Atoms/AppTooltip",
  component: AppTooltip,
  parameters: { layout: "centered" },
  argTypes: {
    type: { control: "select", options: ["default", "llm"] },
    llmMode: { control: "select", options: ["rapide", "avancé"] },
  },
};

export default meta;
type Story = StoryObj<typeof AppTooltip>;

export const Default: Story = {
  args: { type: "default", content: "Ceci est une info-bulle" },
};

export const LLMRapide: Story = {
  args: { type: "llm", llmMode: "rapide" },
};

export const LLMAvancé: Story = {
  args: { type: "llm", llmMode: "avancé" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-6">
      <AppTooltip type="default" content="Info-bulle par défaut" />
      <AppTooltip type="llm" llmMode="rapide" />
      <AppTooltip type="llm" llmMode="avancé" />
    </div>
  ),
};
