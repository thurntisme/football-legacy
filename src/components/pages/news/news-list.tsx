import React from "react";

import { Calendar, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsArticle } from "@/types/news";

type Props = {
  allNews: NewsArticle[];
  setSelectedArticle: (article: NewsArticle) => void;
};

const NewsList = ({ allNews, setSelectedArticle }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team News</CardTitle>
        <CardDescription>Latest updates about your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {allNews.map((news, index) => (
            <div key={index} className="flex gap-4 pb-6 border-b last:border-0">
              <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-24 h-24 object-cover rounded-md hidden md:block"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">{news.title}</h3>
                <p className="text-muted-foreground mb-2">{news.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{news.time}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{news.comments} comments</span>
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
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsList;
