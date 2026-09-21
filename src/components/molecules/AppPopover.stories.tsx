import type { Meta, StoryObj } from "@storybook/react";
import { AppPopover } from "./AppPopover";
import { AppInput } from "@/components/atoms/AppInput";
import { AppTextarea } from "@/components/atoms/AppTextarea";

const meta: Meta<typeof AppPopover> = {
  title: "Molecules/AppPopover",
  component: AppPopover,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["large", "small"] },
    showPrimary: { control: "boolean" },
    showSecondary: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AppPopover>;

export const CreateProject: Story = {
  render: () => (
    <AppPopover
      title="Créer un projet"
      primaryLabel="Enregistrer"
      secondaryLabel="Annuler"
    >
      <div className="flex flex-col gap-4">
        <AppInput label="Nom du projet" placeholder="Mon projet..." maxLength={15} />
        <AppTextarea label="Instructions (optionnel)" placeholder="Décrivez les instructions pour ce projet..." />
      </div>
    </AppPopover>
  ),
};

export const DeleteConfirm: Story = {
  render: () => (
    <AppPopover
      title="Supprimer ce projet ?"
      size="small"
      primaryLabel="Supprimer"
      secondaryLabel="Annuler"
    >
      <p className="text-body font-inter text-gris-fonce-lm">
        Cette action est irréversible. Toutes les discussions et sources associées seront également supprimées.
      </p>
    </AppPopover>
  ),
};

export const LargeEmpty: Story = {
  args: {
    title: "Titre de la fenêtre",
    size: "large",
    primaryLabel: "Enregistrer",
    secondaryLabel: "Annuler",
  },
};

export const SmallEmpty: Story = {
  args: {
    title: "Confirmer",
    size: "small",
    primaryLabel: "Confirmer",
    secondaryLabel: "Annuler",
  },
};
