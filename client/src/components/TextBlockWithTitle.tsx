import { Card, Typography } from "@mui/material";
import { FC } from "react";

export interface TextBlockProps {
  title: string;
  paragraphs: Array<string>;
}
export const TextBlockWithTitle: FC<TextBlockProps> = ({
  title,
  paragraphs,
}) => {
  return (
    <Card color="yellow">
      <Typography variant="h3">{title}</Typography>
      {paragraphs.map((paragraph) => (
        <Typography variant="body1">{paragraph}</Typography>
      ))}
    </Card>
  );
};
