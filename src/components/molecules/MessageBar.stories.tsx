import type { Meta, StoryObj } from "@storybook/react";
import { MessageBar } from "./MessageBar";

const meta: Meta<typeof MessageBar> = {
  title: "Molecules/MessageBar",
  component: MessageBar,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["warning", "error", "success", "info"] },
    message: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof MessageBar>;

export const Warning: Story = {
  args: {
    variant: "warning",
    message: "Malheureusement, la gestion des documents dans ce format n'est pas encore prise en charge. Nous acceptons pour l'instant les fichiers au format PDF, PPT, TXT et DOCX.",
    onDismiss: () => {},
  },
};

export const Dismissible: Story = {
  args: {
    variant: "warning",
    message: "Ce projet expire dans 3 jours. Pensez à renouveler votre accès.",
    onDismiss: () => {},
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    message: "Un fichier avec ce nom existe déjà dans ce projet.",
    onDismiss: () => {},
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    message: "Fichier téléchargé avec succès.",
    onDismiss: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[400px]">
      <MessageBar variant="warning" message="Ce projet expire dans 3 jours." onDismiss={() => {}} />
      <MessageBar variant="error" message="Format de fichier non supporté." onDismiss={() => {}} />
      <MessageBar variant="success" message="Fichier ajouté avec succès." onDismiss={() => {}} />
      <MessageBar variant="info" message="Astuce : vous pouvez glisser-déposer des fichiers." />
    </div>
  ),
};
