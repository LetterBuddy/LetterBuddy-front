import { create } from "zustand";

interface Article {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface ArticleStore {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
}

const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  setArticles: (articles) => set({ articles }),
}));

export default useArticleStore;
