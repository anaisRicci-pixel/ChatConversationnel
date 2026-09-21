import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LLMChip, LLMSwitcher } from "./LLMChip";

const meta: Meta<typeof LLMChip> = {
  title: "Atoms/LLMChip",
  component: LLMChip,
  parameters: { layout: "centered" },
  argTypes: {
    mode: { control: "select", options: ["rapide", "avancé"] },
    active: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["desktop", "mobile"] },
  },
};

export default meta;
type Story = StoryObj<typeof LLMChip>;

export const RapideActive: Story = {
  args: { mode: "rapide", active: true, size: "desktop" },
};

export const AvancéInactive: Story = {
  args: { mode: "avancé", active: false, size: "desktop" },
};

export const RapideDisabled: Story = {
  args: { mode: "rapide", active: false, disabled: true, size: "desktop" },
};

export const Switcher: Story = {
  render: () => {
    const [mode, setMode] = useState<"rapide" | "avancé">("rapide");
    return <LLMSwitcher mode={mode} onModeChange={setMode} />;
  },
};

export const SwitcherMobile: Story = {
  render: () => {
    const [mode, setMode] = useState<"rapide" | "avancé">("rapide");
    return <LLMSwitcher mode={mode} onModeChange={setMode} size="mobile" />;
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex gap-2">
        <LLMChip mode="rapide" active size="desktop" />
        <LLMChip mode="avancé" active={false} size="desktop" />
      </div>
      <div className="flex gap-2">
        <LLMChip mode="rapide" active={false} size="desktop" />
        <LLMChip mode="avancé" active size="desktop" />
      </div>
      <div className="flex gap-2">
        <LLMChip mode="rapide" active disabled size="desktop" />
        <LLMChip mode="avancé" active={false} disabled size="desktop" />
      </div>
      <div className="flex gap-2">
        <LLMChip mode="rapide" active size="mobile" />
        <LLMChip mode="avancé" active={false} size="mobile" />
      </div>
    </div>
  ),
};
