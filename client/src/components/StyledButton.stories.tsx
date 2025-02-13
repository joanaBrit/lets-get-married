import { Meta, StoryObj } from "@storybook/react";
import { StyledButton } from "./StyledButton";

const meta: Meta<typeof StyledButton> = {
    component: StyledButton,
  };
  
  export default meta;
  type Story = StoryObj<typeof StyledButton>;
  
  export const Primary: Story = {
    args: {
      disabled: false,
      children: 'My Text',
      onClick: ()=>window.alert('Hi')
    },
  };

  export const Disabled: Story = {
    args: {
      disabled: true,
      children: 'This is a disabled button',
    },
  };