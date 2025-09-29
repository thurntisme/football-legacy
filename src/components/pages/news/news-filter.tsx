import React from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewsFilter = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search news..." className="pl-8" />
      </div>

      <div className="flex gap-2">
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="team">Team News</SelectItem>
            <SelectItem value="transfers">Transfers</SelectItem>
            <SelectItem value="league">League News</SelectItem>
            <SelectItem value="players">Player Updates</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="recent">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="relevant">Most Relevant</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default NewsFilter;
