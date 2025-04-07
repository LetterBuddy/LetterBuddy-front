import { useEffect } from "react";

import Label from "../../ui/label/Label";
import classes from "./Articles.module.css";
import axiosAPI from "../../../axiosAPI";
import useArticleStore from "../../../store/useArticleStore";
import useLoadingStore from "../../../store/useLoadingStore";

const Articles = () => {
  const { articles, setArticles } = useArticleStore();
  const { setIsLoading } = useLoadingStore();
  useEffect(() => {
    if (articles.length === 0) {
      const fetchArticles = async () => {
        setIsLoading(true);
        try {
          const response = await axiosAPI.get("/exercises/articles/");
          setArticles(response.data);
        } catch (error: any) {
          console.error("Failed to fetch articles", error);
        }
        finally {
          setIsLoading(false);
        }
      };
      fetchArticles();
    }
  }, []);

  return (
    <div className={classes.articlesDiv}>
      <Label>Handwriting Tips</Label>
      {articles.map((article) => (
        <div className={classes.article} key={article.id}>
          <a href={article.link} className={classes.link}>
          <h3>{article.title}</h3>
          </a>
          <label>{article.description}</label>
        </div>
      ))}
    </div>
  );
};

export default Articles;
