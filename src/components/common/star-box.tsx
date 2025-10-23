import React from "react";

import { Star } from "lucide-react";

type Props = {
  length: number;
};

const StarBox = ({ length = 5 }: Props) => {
  return (
    <div className="flex items-center mb-4">
      {Array.from({ length }).map((_, i) => (
        <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
      ))}
    </div>
  );
};

export default StarBox;
