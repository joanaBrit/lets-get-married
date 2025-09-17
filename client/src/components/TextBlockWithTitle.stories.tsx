import type { Meta, StoryObj } from "@storybook/react";
import { TextBlockWithTitle } from "./TextBlockWithTitle";

const meta: Meta<typeof TextBlockWithTitle> = {
  component: TextBlockWithTitle,
};

export default meta;
type Story = StoryObj<typeof TextBlockWithTitle>;

export const Primary: Story = {
  args: {
    title: "Title of the story",
    paragraphs: [
      "Some interesting story from a time.",
      "Story is very interesting!",
    ],
  },
};
