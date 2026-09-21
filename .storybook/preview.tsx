import type { Preview } from "@storybook/react";
import React from "react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#212121" },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals?.backgrounds?.value === "#212121";
      return (
        <div className={isDark ? "dark" : ""} style={{ minHeight: "100vh", padding: "1rem" }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
