import ChildItem from "./ChildItem";
import classes from "./ChildList.module.css";
import useChildStore from "../../store/useChildStore";
import { useEffect } from "react";
import axiosAPI from "../../axiosAPI";
import useLoadingStore from "../../store/useLoadingStore";

const ChildList = () => {
  const { children, setChildren } = useChildStore();
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    if (children.length > 0) return;
    const fetchChildren = async () => {
      try {
        setIsLoading(true);
        const response = await axiosAPI.get("/accounts/child/");
        setChildren(response.data);
      } catch (error: any) {
        console.error("Failed to fetch children", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChildren();
  }, []);

  return (
    <ul className={classes.childList}>
      {children.map((child) => (
        <ChildItem key={child.id} child={child} />
      ))}
    </ul>
  );
};

export default ChildList;
