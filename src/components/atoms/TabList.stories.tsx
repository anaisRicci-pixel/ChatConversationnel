import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TabList } from "./TabList";

const meta: Meta<typeof TabList> = {
  title: "Atoms/TabList",
  component: TabList,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["large", "small"] },
  },
};

export default meta;
type Story = StoryObj<typeof TabList>;

const defaultTabs = [
  { id: "chats", label: "Discussions" },
  { id: "sources", label: "Sources" },
];

function TabListDemo({ size }: { size?: "large" | "small" }) {
  const [active, setActive] = useState("chats");
  return (
    <TabList
      tabs={defaultTabs}
      activeTab={active}
      onTabChange={setActive}
      size={size}
    />
  );
}

export const LargeChatsActive: Story = {
  render: () => <TabListDemo size="large" />,
};

export const SmallSourcesActive: Story = {
  render: () => {
    const [active, setActive] = useState("sources");
    return (
      <TabList
        tabs={defaultTabs}
        activeTab={active}
        onTabChange={setActive}
        size="small"
      />
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div>
        <p className="text-caption-mobile text-gris-clair-lm mb-2">Large</p>
        <TabListDemo size="large" />
      </div>
      <div>
        <p className="text-caption-mobile text-gris-clair-lm mb-2">Small</p>
        <TabListDemo size="small" />
      </div>
    </div>
  ),
};
