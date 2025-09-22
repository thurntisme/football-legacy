import React from 'react';

import { Calendar, MessageSquare, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { NewsArticle } from '@/types/football/news';

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
              <div className="flex items-center gap-2">
                <DialogTitle className="text-2xl">
                  {selectedArticle.title}
                </DialogTitle>
                {selectedArticle.tag && (
                  <Badge
                    variant={
                      selectedArticle.tag === 'Confirmed'
                        ? 'default'
                        : selectedArticle.tag === 'Rumor'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {selectedArticle.tag}
                  </Badge>
                )}
              </div>
              <DialogDescription>
                <div className="flex items-center text-muted-foreground mt-2">
                  <Badge variant="outline" className="mr-2">
                    {selectedArticle.category}
                  </Badge>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{selectedArticle.time}</span>
                  <span className="mx-2">•</span>
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>{selectedArticle.comments} comments</span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="my-4">
              <img
                src={
                  selectedArticle.image ||
                  '/placeholder.svg?height=300&width=800'
                }
                alt={selectedArticle.title}
                className="w-full h-[200px] md:h-[300px] object-cover rounded-md"
              />
            </div>

            <div
              className="prose prose-sm md:prose-base max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />

            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-2">Join the conversation</h4>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewsDetailDialog;
