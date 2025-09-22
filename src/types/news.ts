export type NewsArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  time: string;
  comments: number;
  image: string;
  badge?: string;
  tag?: string;
};
