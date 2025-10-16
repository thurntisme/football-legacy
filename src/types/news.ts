import { NewsCategoryEnum } from "@/constants/news";

export type NewsArticle = {
  id: string;
  category: NewsCategoryEnum;
  title: string;
  excerpt: string;
  content: string;
  time: string;
  image: string;
};
