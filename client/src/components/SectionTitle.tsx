import { HtmlHTMLAttributes } from "react";
import "./SectionTitle.scss";

export const SectionTitle = (props: HtmlHTMLAttributes<HTMLHeadingElement>) => {
  return (
    <div className="section-title">
      <h1 {...props} />
    </div>
  );
};
