import { Card, IconButton } from "@mui/material";
import { HtmlHTMLAttributes } from "react";
import {
  OpenInNewOutlined as OpenIcon,
  PlaceOutlined as PlaceIcon,
} from "@mui/icons-material";

import "./PropertyCard.scss";

export function PropertyCard(
  props: HtmlHTMLAttributes<HTMLDivElement> & {
    imgSrc: string;
    title: string;
    address: string;
    link?: string;
  }
) {
  return (
    <Card className="property-card">
      <div className="image-container">
        <img src={props.imgSrc} />
      </div>
      <div className="card-content">
        {props.link && (
          <IconButton size="large" onClick={() => window.open(props.link)}>
            <OpenIcon />
          </IconButton>
        )}
        <h2>{props.title}</h2>
        <div className="address">
          <PlaceIcon />
          <span>{props.address}</span>
        </div>
        {props.children}
      </div>
    </Card>
  );
}
