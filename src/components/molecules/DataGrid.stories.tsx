import type { Meta, StoryObj } from "@storybook/react";
import { Pin, FileText, FileSpreadsheet, Image } from "lucide-react";
import { DataGrid } from "./DataGrid";

const meta: Meta<typeof DataGrid> = {
  title: "Molecules/DataGrid",
  component: DataGrid,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["large", "small"] },
  },
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

const chatRows = [
  { id: "c1", name: "Analyse rapport Q3 2024", date: "12 déc. 2024", pinned: true },
  { id: "c2", name: "Stratégie commerciale EMEA", date: "10 déc. 2024", pinned: false },
  { id: "c3", name: "Rédaction email client Bouygues", date: "8 déc. 2024", pinned: false },
  { id: "c4", name: "Budget prévisionnel 2025", date: "5 déc. 2024", pinned: false },
];

const chatColumns = [
  {
    key: "name",
    header: "Nom",
    render: (row: typeof chatRows[0]) => (
      <div className="flex items-center gap-2 px-3 h-[56px]">
        {row.pinned && <Pin size={14} className="text-orange shrink-0" />}
        <span className="text-body font-inter font-normal text-title-lm overflow-hidden text-ellipsis whitespace-nowrap">
          {row.name}
        </span>
      </div>
    ),
  },
  { key: "date", header: "Date" },
];

const sourceRows = [
  { id: "s1", name: "Rapport Gartner 2024.pdf", type: "PDF", date: "12 déc. 2024" },
  { id: "s2", name: "Budget_2025.xlsx", type: "Excel", date: "10 déc. 2024" },
  { id: "s3", name: "Photo_site.jpg", type: "Image", date: "8 déc. 2024" },
  { id: "s4", name: "Cahier_des_charges.docx", type: "Word", date: "5 déc. 2024" },
];

const typeIconMap: Record<string, React.ElementType> = {
  PDF: FileText,
  Excel: FileSpreadsheet,
  Image: Image,
  Word: FileText,
};

const sourceColumns = [
  {
    key: "name",
    header: "Nom",
    render: (row: typeof sourceRows[0]) => {
      const Icon = typeIconMap[row.type] ?? FileText;
      return (
        <div className="flex items-center gap-2 px-3 h-[56px]">
          <Icon size={16} className="text-gris-clair-lm shrink-0" />
          <span className="text-body font-inter font-normal text-title-lm overflow-hidden text-ellipsis whitespace-nowrap">
            {row.name}
          </span>
        </div>
      );
    },
  },
  { key: "type", header: "Type" },
  { key: "date", header: "Date" },
];

export const ChatsLarge: Story = {
  render: () => (
    <div className="w-[600px] bg-blanc-lm rounded-r-lg border border-separateurs-lm overflow-hidden shadow-card">
      <DataGrid
        columns={chatColumns as never}
        rows={chatRows}
        size="large"
        activeRowId="c1"
      />
    </div>
  ),
};

export const SourcesLarge: Story = {
  render: () => (
    <div className="w-[700px] bg-blanc-lm rounded-r-lg border border-separateurs-lm overflow-hidden shadow-card">
      <DataGrid
        columns={sourceColumns as never}
        rows={sourceRows}
        size="large"
      />
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div className="w-[600px] bg-blanc-lm rounded-r-lg border border-separateurs-lm overflow-hidden shadow-card">
      <DataGrid
        columns={chatColumns as never}
        rows={chatRows}
        size="small"
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-[600px] bg-blanc-lm rounded-r-lg border border-separateurs-lm overflow-hidden shadow-card">
      <DataGrid
        columns={chatColumns as never}
        rows={[]}
        size="large"
      />
    </div>
  ),
};
