import type { Meta, StoryObj } from "@storybook/react";

import { ContentBlockWithIllustration } from "./ContentBlockWithIllustration";
import { StyledButton } from "./StyledButton";

const meta: Meta<typeof ContentBlockWithIllustration> = {
  component: ContentBlockWithIllustration,
};

export default meta;
type Story = StoryObj<typeof ContentBlockWithIllustration>;

export const Primary: Story = {
  args: {
    image: "https://placehold.co/600x400",
    imagePosition: "left",
    children: (
      <div>
        <h1>Some content</h1>
        <p>This is more content.</p>
        <StyledButton>Confirm</StyledButton>
      </div>
    ),
  },
};
