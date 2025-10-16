import React from "react";

import { Calendar, MessageSquare, Star, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewsArticle } from "@/types/news";

type Props = {
  selectedArticle: NewsArticle | null;
  setSelectedArticle: React.Dispatch<React.SetStateAction<NewsArticle | null>>;
};

const NewsDetailDialog = ({ selectedArticle, setSelectedArticle }: Props) => {
  return (
    <Dialog
      open={!!selectedArticle}
      onOpenChange={(open) => !open && setSelectedArticle(null)}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {selectedArticle && (
          <>
            <DialogHeader>
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-2xl">
                  {selectedArticle.title}
                </DialogTitle>
                <Badge variant="outline" className="w-fit">
                  {selectedArticle.category}
                </Badge>
              </div>
              <DialogDescription>
                <span className="flex items-center text-muted-foreground mt-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{selectedArticle.time}</span>
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="my-4">
              <img
                src={
                  selectedArticle.image ||
                  "/placeholder.svg?height=300&width=800"
                }
                alt={selectedArticle.title}
                className="w-full h-[200px] md:h-[300px] object-cover rounded-md"
              />
            </div>

            <div
              className="prose prose-sm md:prose-base max-w-none dark:prose-invert pb-4"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />

            <DialogFooter className="flex !justify-center">
              <Button
                variant="outline"
                onClick={() => setSelectedArticle(null)}
              >
                <X className="h-4 w-4" />
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewsDetailDialog;
