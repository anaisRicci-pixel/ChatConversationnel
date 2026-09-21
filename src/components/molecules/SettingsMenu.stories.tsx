import type { Meta, StoryObj } from "@storybook/react";
import { SettingsMenu } from "./SettingsMenu";

const meta: Meta<typeof SettingsMenu> = {
  title: "Molecules/SettingsMenu",
  component: SettingsMenu,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["desktop", "mobile"] },
  },
};

export default meta;
type Story = StoryObj<typeof SettingsMenu>;

export const Desktop: Story = {
  args: { size: "desktop" },
};

export const Mobile: Story = {
  args: { size: "mobile" },
};

export const BothSizes: Story = {
  render: () => (
    <div className="flex gap-6 items-start">
      <div>
        <p className="text-caption-mobile text-gris-clair-lm mb-2">Desktop</p>
        <SettingsMenu size="desktop" />
      </div>
      <div>
        <p className="text-caption-mobile text-gris-clair-lm mb-2">Mobile</p>
        <SettingsMenu size="mobile" />
      </div>
    </div>
  ),
};
