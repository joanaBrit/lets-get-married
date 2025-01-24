import React, { FC } from "react";

interface ContentBlockProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  image: String;
  children: React.ReactNode;
}

export const ContentBlockWithIllustration: FC<ContentBlockProps> = ({
  image,
  children,
}) => {
  return (
    <div>
      <img>{image}</img>
      {children}
    </div>
  );
};
