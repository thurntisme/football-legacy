"use client";

import type React from "react";
import { useState } from "react";

import PageTitle from "@/components/common/page-title";
import NewsDetailDialog from "@/components/pages/news/news-detail-dialog";
import NewsFilter from "@/components/pages/news/news-filter";
import NewsGrid from "@/components/pages/news/news-grid";
import NewsList from "@/components/pages/news/news-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allNews } from "@/mock/news";
import { NewsArticle } from "@/types/news";

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null,
  );

  return (
    <>
      <PageTitle title="News & Updates" />

      <NewsFilter />

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="team">My Team</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="league">League</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <NewsGrid allNews={allNews} setSelectedArticle={setSelectedArticle} />
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <NewsList allNews={allNews} setSelectedArticle={setSelectedArticle} />
        </TabsContent>

        <TabsContent value="transfers" className="space-y-6">
          <NewsList allNews={allNews} setSelectedArticle={setSelectedArticle} />
        </TabsContent>

        <TabsContent value="league" className="space-y-6">
          <NewsList allNews={allNews} setSelectedArticle={setSelectedArticle} />
        </TabsContent>

        <TabsContent value="players" className="space-y-6">
          <NewsList allNews={allNews} setSelectedArticle={setSelectedArticle} />
        </TabsContent>
      </Tabs>

      <NewsDetailDialog
        selectedArticle={selectedArticle}
        setSelectedArticle={setSelectedArticle}
      />
    </>
  );
}
