import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AppButton } from "./AppButton";

const meta: Meta<typeof AppButton> = {
  title: "Atoms/AppButton",
  component: AppButton,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary"] },
    size: { control: "select", options: ["large", "small"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AppButton>;

export const PrimaryLarge: Story = {
  args: { variant: "primary", size: "large", children: "Bouton" },
};

export const PrimaryLargeWithIcon: Story = {
  args: { variant: "primary", size: "large", icon: Plus, children: "Nouveau projet" },
};

export const SecondaryLarge: Story = {
  args: { variant: "secondary", size: "large", children: "Annuler" },
};

export const SecondaryWithIcon: Story = {
  args: { variant: "secondary", size: "large", icon: Pencil, children: "Modifier" },
};

export const PrimarySmall: Story = {
  args: { variant: "primary", size: "small", children: "Bouton" },
};

export const SecondarySmall: Story = {
  args: { variant: "secondary", size: "small", children: "Annuler" },
};

export const DisabledPrimary: Story = {
  args: { variant: "primary", size: "large", children: "Désactivé", disabled: true },
};

export const DisabledSecondary: Story = {
  args: { variant: "secondary", size: "large", children: "Désactivé", disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex gap-3 items-center">
        <AppButton variant="primary" size="large" icon={Plus}>Nouveau projet</AppButton>
        <AppButton variant="secondary" size="large" icon={Pencil}>Modifier</AppButton>
        <AppButton variant="secondary" size="large" icon={Trash2}>Supprimer</AppButton>
      </div>
      <div className="flex gap-3 items-center">
        <AppButton variant="primary" size="small" icon={Plus}>Ajouter</AppButton>
        <AppButton variant="secondary" size="small">Annuler</AppButton>
        <AppButton variant="primary" size="small" disabled>Désactivé</AppButton>
      </div>
    </div>
  ),
};
