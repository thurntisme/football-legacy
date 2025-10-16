import React, { useMemo } from "react";

import { Calendar, ChevronRight, MessageSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NewsArticle } from "@/types/news";

type Props = {
  allNews: NewsArticle[];
  setSelectedArticle: (article: NewsArticle) => void;
};

const NewsGrid = ({ allNews, setSelectedArticle }: Props) => {
  const firstNews = useMemo(() => {
    if (!allNews.length) return null;
    return allNews[0];
  }, [allNews]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {firstNews && (
        <Card className="md:col-span-3">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={
                  firstNews.image ||
                  "https:/placeholder.svg?height=300&width=1200"
                }
                alt="Featured News"
                className="w-full h-[200px] md:h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <Badge className="w-fit mb-2">{firstNews.category || ""}</Badge>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {firstNews.title || ""}
                </h2>
                <p className="text-white/80 mb-2 max-w-3xl">
                  {firstNews.excerpt || ""}
                </p>
                <div className="flex items-center text-white/60 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{firstNews.time || ""}</span>
                </div>
                <Button
                  variant="secondary"
                  className="mt-4 w-fit"
                  onClick={() => setSelectedArticle(allNews[0])}
                >
                  Read Full Article
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {allNews.length ? (
        allNews.map((news, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge variant="outline">{news.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-bold mb-2">{news.title}</h3>
              <p className="text-muted-foreground mb-4">{news.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{news.time}</span>
                </div>
              </div>
              <Button
                variant="link"
                className="p-0 h-auto mt-2"
                onClick={() => {
                  const article = allNews.find((item) => item.id === news.id);
                  if (article) setSelectedArticle(article);
                }}
              >
                Read more
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="md:col-span-3">
          <p className="text-center text-muted-foreground">No news available</p>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
