import React from "react";

const FieldMarking = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-emerald-800">
      <div className="w-[80%] h-[90%] border-2 border-white/50 relative flex items-center justify-center overflow-hidden">
        <div className="absolute w-[20%] h-[10%] bottom-0 border-2 border-white/50 border-b-0"></div>
        <div className="absolute w-2 h-2 bottom-16 bg-white opacity-60 rounded-full"></div>
        <div className="absolute w-[40%] h-[20%] bottom-0 border-2 border-white/50 border-b-0"></div>
        <div className="absolute w-[20%] h-[10%] top-0 border-2 border-white/50 border-t-0"></div>
        <div className="absolute w-2 h-2 top-16 bg-white opacity-60 rounded-full"></div>
        <div className="absolute w-[40%] h-[20%] top-0 border-2 border-white/50 border-t-0"></div>
        <div className="absolute w-[15%] aspect-square rounded-full border-2 border-white/50"></div>
        <div className="absolute w-2 h-2 bg-white opacity-60 rounded-full"></div>
        <div className="absolute w-full h-1 border-0 border-t-2 border-white/50 "></div>
        <div className="absolute w-6 -top-3 -left-3 aspect-square rounded-full border-2 border-white/50"></div>
        <div className="absolute w-6 -top-3 -right-3 aspect-square rounded-full border-2 border-white/50"></div>
        <div className="absolute w-6 -bottom-3 -right-3 aspect-square rounded-full border-2 border-white/50"></div>
        <div className="absolute w-6 -bottom-3 -left-3 aspect-square rounded-full border-2 border-white/50"></div>
      </div>
    </div>
  );
};

export default FieldMarking;
