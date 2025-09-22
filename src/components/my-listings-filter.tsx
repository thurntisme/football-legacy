import React from 'react';

import { Filter, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {};

const MyListingsFilter = (props: Props) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [positionFilter, setPositionFilter] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('rating');

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search players..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Select value={positionFilter} onValueChange={setPositionFilter}>
          <SelectTrigger className="w-[130px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            <SelectItem value="gk">Goalkeepers</SelectItem>
            <SelectItem value="def">Defenders</SelectItem>
            <SelectItem value="mid">Midfielders</SelectItem>
            <SelectItem value="att">Attackers</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="age">Age</SelectItem>
            <SelectItem value="value">Market Value</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MyListingsFilter;
