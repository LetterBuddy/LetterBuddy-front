import { useLocation, useNavigate } from "react-router-dom";
import {
  IconAbc,
  IconHome,
  IconArticleFilled,
  IconLogout,
} from "@tabler/icons-react";
import useUserStore from "../../../store/useUserStore";
import useChildStore from "../../../store/useChildStore";
import useLoadingStore from "../../../store/useLoadingStore";
import useExerciseStore from "../../../store/useExerciseStore";
import classes from "./Head.module.css";
import axiosAPI from "../../../axiosAPI";

const Head = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isChild = useUserStore((state) => state.isChild);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const clearUser = useUserStore((state) => state.clearUser);
  const removeAllChildren = useChildStore((state) => state.removeAllChildren);
  const clearExercise  = useExerciseStore((state) => state.clearExercise);
  const { isLoading, setIsLoading } = useLoadingStore();

  const isSubmissionPage = location.pathname === "/exercise";
  const isAlphabetPage = location.pathname === "/alphabet";
  const isChildAccountsPage = location.pathname === "/accounts";

  const logoutHandler = async () => {
    if (isLoading) return;
    setIsLoading(true);
    clearUser();
    removeAllChildren();
    clearExercise();
    navigate("/splash");
    console.log("Logging out...");
    try {
      await axiosAPI.post("/accounts/logout/", {
        refresh: localStorage.getItem("refresh_token"),
      });
    } catch (error: any) {
      console.log("Logout Failed", error.response.data);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setIsLoading(false);
    }
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>LetterBuddy</h1>
      <div className={classes.icons}>
        {isSubmissionPage && (
          <IconAbc
            className={classes.icon}
            size={45}
            onClick={() => navigate("/alphabet")}
          />
        )}

        {isAlphabetPage && (
          <IconHome
            className={classes.icon}
            size={35}
            onClick={() => navigate("/exercise")}
          />
        )}
        {!isChildAccountsPage && !isChild && isLoggedIn && (
          <IconHome
            className={classes.icon}
            size={35}
            onClick={() => navigate("/accounts")}
          />
        )}
        {isChildAccountsPage && (
          <IconArticleFilled
            className={classes.icon}
            size={35}
            onClick={() => navigate("/articles")}
          />
        )}
        {isLoggedIn && (
          <IconLogout
            className={classes.icon}
            size={35}
            onClick={() => logoutHandler()}
          />
        )}
      </div>
    </header>
  );
};

export default Head;
