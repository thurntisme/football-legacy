import React from "react";

import { Button } from "@/components/ui/button";
import { StaffCategories, StaffCategoryEnum } from "@/constants/staff";

type Props = {
  selectedCategory: StaffCategoryEnum;
  setSelectedCategory: (category: StaffCategoryEnum) => void;
};

const CategorySelector = ({ selectedCategory, setSelectedCategory }: Props) => {
  return (
    <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
      {StaffCategories.map(({ label, slug, icon: Icon }) => (
        <Button
          key={label}
          variant={selectedCategory === slug ? "default" : "outline"}
          className="rounded-full flex items-center"
          onClick={() => setSelectedCategory(slug)}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default CategorySelector;
