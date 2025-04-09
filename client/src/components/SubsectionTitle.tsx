import { FlightClassOutlined } from "@mui/icons-material";
import "./SubsectionTitle.scss";

export function SubsectionTitle(props: {
  icon: typeof FlightClassOutlined;
  text: string;
}) {
  return (
    <div className="subsection-title">
      <props.icon fontSize="large" />
      <h2>{props.text}</h2>
    </div>
  );
}
