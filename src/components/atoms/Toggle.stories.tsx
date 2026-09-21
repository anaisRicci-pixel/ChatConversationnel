import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Atoms/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  argTypes: {
    checked: { control: "boolean" },
    size: { control: "select", options: ["desktop", "mobile"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

function ToggleDemo({ size }: { size?: "desktop" | "mobile" }) {
  const [checked, setChecked] = useState(false);
  return <Toggle checked={checked} onChange={setChecked} size={size} aria-label="Toggle demo" />;
}

export const DesktopOff: Story = {
  render: () => <ToggleDemo size="desktop" />,
};

export const DesktopOn: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <Toggle checked={checked} onChange={setChecked} size="desktop" aria-label="Toggle on" />;
  },
};

export const MobileOff: Story = {
  render: () => <ToggleDemo size="mobile" />,
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div className="flex gap-6 items-center">
        <span className="text-caption-desktop text-gris-fonce-lm w-20">Desktop Off</span>
        <ToggleDemo size="desktop" />
      </div>
      <div className="flex gap-6 items-center">
        <span className="text-caption-desktop text-gris-fonce-lm w-20">Mobile Off</span>
        <ToggleDemo size="mobile" />
      </div>
    </div>
  ),
};
