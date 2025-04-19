import classes from "./ChildItem.module.css";
import { Child } from "../../store/useChildStore";
import Label from "../ui/label/Label";
import { useNavigate } from "react-router-dom";
import { IconChartBar, IconTableExport } from "@tabler/icons-react";
import useChildStore from "../../store/useChildStore";

const ChildItem = ({ child }: { child: Child }) => {
  const navigate = useNavigate();
  const setSelectedChildId = useChildStore((state) => state.setSelectedChildId);
  return (
    <div className={classes.childCard}>
      <div className={classes.iconContainer}>
        <IconTableExport
          className={classes.icon}
          size={35}
          onClick={() => {
            setSelectedChildId(child.id);
            navigate("/table")}}
        />
        <IconChartBar className={classes.icon} size={35} />
      </div>
      <Label>{child.username}</Label>
    </div>
  );
};

export default ChildItem;
