import React, { FC } from "react";

interface ContentBlockProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  image: string;
  children: React.ReactNode;
  imagePosition: 'left' | 'right'
  gap?: string
}

import './ContentBlockWithIllustration.scss'

export const ContentBlockWithIllustration: FC<ContentBlockProps> = ({
  image,
  children,
  imagePosition, 
  gap
}) => {
  return (
    <div className={`content-block illustration-${imagePosition}`} style={{gap}}>
      <img src={image} />
      {children}
    </div>
  );
};
