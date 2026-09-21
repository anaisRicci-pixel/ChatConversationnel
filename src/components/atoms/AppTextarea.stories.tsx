import type { Meta, StoryObj } from "@storybook/react";
import { AppTextarea } from "./AppTextarea";

const meta: Meta<typeof AppTextarea> = {
  title: "Atoms/AppTextarea",
  component: AppTextarea,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["large", "small"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AppTextarea>;

export const LargeRest: Story = {
  args: {
    label: "Instructions du projet",
    placeholder: "Décrivez les instructions pour ce projet...",
    size: "large",
  },
};

export const SmallRest: Story = {
  args: {
    label: "Notes",
    placeholder: "Ajouter des notes...",
    size: "small",
  },
};

export const WithValue: Story = {
  args: {
    label: "Instructions",
    defaultValue: "Vous êtes un assistant spécialisé dans l'analyse de données financières. Répondez toujours en français.",
    size: "large",
  },
};

export const WithError: Story = {
  args: {
    label: "Instructions",
    placeholder: "Instructions...",
    size: "large",
    error: "Veuillez saisir des instructions",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[520px]">
      <AppTextarea label="Large" placeholder="Texte ici..." size="large" />
      <AppTextarea label="Small" placeholder="Texte ici..." size="small" />
    </div>
  ),
};
