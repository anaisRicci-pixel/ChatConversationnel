import type { Meta, StoryObj } from "@storybook/react";
import { AppInput } from "./AppInput";

const meta: Meta<typeof AppInput> = {
  title: "Atoms/AppInput",
  component: AppInput,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["large", "small"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AppInput>;

export const LargeRest: Story = {
  args: {
    label: "Nom du projet",
    placeholder: "Mon projet...",
    size: "large",
  },
};

export const SmallRest: Story = {
  args: {
    label: "Rechercher",
    placeholder: "Rechercher...",
    size: "small",
  },
};

export const WithValue: Story = {
  args: {
    label: "Nom du projet",
    defaultValue: "Mon projet secret",
    size: "large",
  },
};

export const WithError: Story = {
  args: {
    label: "Nom du projet",
    placeholder: "Mon projet...",
    size: "large",
    error: "Ce champ est obligatoire",
  },
};

export const Disabled: Story = {
  args: {
    label: "Nom du projet",
    placeholder: "Mon projet...",
    size: "large",
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[520px]">
      <AppInput label="Large" placeholder="Texte ici..." size="large" />
      <AppInput label="Small" placeholder="Texte ici..." size="small" />
    </div>
  ),
};
