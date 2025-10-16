"use client";

import type React from "react";
import { useState } from "react";

import ContentWrapper from "@/components/common/content-wrapper";
import PageTitle from "@/components/common/page-title";
import NewsDetailDialog from "@/components/pages/news/news-detail-dialog";
import NewsGrid from "@/components/pages/news/news-grid";
import NewsList from "@/components/pages/news/news-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsCategoryEnum } from "@/constants/news";
import { internalApi } from "@/lib/api/internal";
import { allNews } from "@/mock/news";
import { NewsArticle } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null,
  );

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list-news"],
    queryFn: async () => {
      const res = await internalApi.get("/news");
      return res.data?.data || [];
    },
  });

  return (
    <>
      <PageTitle title="News & Updates" />

      <ContentWrapper isLoading={isLoading} error={error} onRefetch={refetch}>
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="all">All News</TabsTrigger>
            <TabsTrigger value={NewsCategoryEnum.TEAM}>My Team</TabsTrigger>
            <TabsTrigger value={NewsCategoryEnum.PLAYER}>
              My Players
            </TabsTrigger>
            <TabsTrigger value={NewsCategoryEnum.TRANSFER}>
              Transfer
            </TabsTrigger>
            <TabsTrigger value={NewsCategoryEnum.LEAGUE}>League</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <NewsGrid allNews={data} setSelectedArticle={setSelectedArticle} />
          </TabsContent>

          <TabsContent value={NewsCategoryEnum.TEAM} className="space-y-6">
            <NewsList allNews={data} setSelectedArticle={setSelectedArticle} />
          </TabsContent>

          <TabsContent value={NewsCategoryEnum.PLAYER} className="space-y-6">
            <NewsList allNews={data} setSelectedArticle={setSelectedArticle} />
          </TabsContent>

          <TabsContent value={NewsCategoryEnum.TRANSFER} className="space-y-6">
            <NewsList allNews={data} setSelectedArticle={setSelectedArticle} />
          </TabsContent>

          <TabsContent value={NewsCategoryEnum.LEAGUE} className="space-y-6">
            <NewsList allNews={data} setSelectedArticle={setSelectedArticle} />
          </TabsContent>
        </Tabs>

        <NewsDetailDialog
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
        />
      </ContentWrapper>
    </>
  );
}
