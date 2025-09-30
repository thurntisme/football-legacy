import React from "react";

const FieldMarking = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[80%] h-[90%] border-2 border-white/50"></div>
      <div className="absolute w-[40%] h-[20%] bottom-0 border-2 border-white/50 border-b-0"></div>
      <div className="absolute w-[40%] h-[20%] top-0 border-2 border-white/50 border-t-0"></div>
      <div className="absolute w-[15%] aspect-square rounded-full border-2 border-white/50"></div>
      <div className="absolute w-1 h-1 bg-white rounded-full"></div>
    </div>
  );
};

export default FieldMarking;
