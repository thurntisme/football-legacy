import React from 'react';

import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { INotification } from '@/types/football/common';

type Props = {
  list: INotification[];
  markAsRead: (id: string) => void;
};

const NotificationsList = ({ list, markAsRead }: Props) => {
  return (
    <>
      {list.map((notification, index) => (
        <div key={notification.id} className="relative">
          <div
            className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
              !notification.read ? 'bg-muted/50' : ''
            }`}
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{notification.title}</p>
                <span className="text-xs text-muted-foreground">
                  {notification.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
            </div>
            {!notification.read && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-12 size-6"
                onClick={() => markAsRead(notification.id)}
              >
                <Check className="h-4 w-4" />
                <span className="sr-only">Mark as read</span>
              </Button>
            )}
          </div>
          {index < list.length - 1 && <Separator className="my-2" />}
        </div>
      ))}
    </>
  );
};

export default NotificationsList;
