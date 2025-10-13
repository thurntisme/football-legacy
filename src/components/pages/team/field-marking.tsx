import React from "react";

const FieldMarking = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-emerald-800">
      <div className="relative h-[90%] aspect-[68/105] border-4 border-white/70 bg-emerald-700 overflow-hidden rotate-90">
        {/* Halfway line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/70 transform -translate-y-1/2"></div>

        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 w-[18%] aspect-square border-4 border-white/70 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Center spot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Penalty area - Top */}
        <div className="absolute top-0 left-1/2 w-[44%] h-[16%] border-4 border-white/70 border-t-0 transform -translate-x-1/2"></div>

        {/* Goal area - Top */}
        <div className="absolute top-0 left-1/2 w-[18%] h-[6%] border-4 border-white/70 border-t-0 transform -translate-x-1/2"></div>

        {/* Penalty spot - Top */}
        <div className="absolute top-[11%] left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"></div>

        {/* Penalty area - Bottom */}
        <div className="absolute bottom-0 left-1/2 w-[44%] h-[16%] border-4 border-white/70 border-b-0 transform -translate-x-1/2"></div>

        {/* Goal area - Bottom */}
        <div className="absolute bottom-0 left-1/2 w-[18%] h-[6%] border-4 border-white/70 border-b-0 transform -translate-x-1/2"></div>

        {/* Penalty spot - Bottom */}
        <div className="absolute bottom-[11%] left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"></div>

        {/* Corner arcs */}
        <div className="absolute top-0 left-0 w-[5%] aspect-square border-b-4 border-r-4 border-white/70 rounded-br-full"></div>
        <div className="absolute top-0 right-0 w-[5%] aspect-square border-b-4 border-l-4 border-white/70 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-[5%] aspect-square border-t-4 border-r-4 border-white/70 rounded-tr-full"></div>
        <div className="absolute bottom-0 right-0 w-[5%] aspect-square border-t-4 border-l-4 border-white/70 rounded-tl-full"></div>
      </div>
    </div>
  );
};

export default FieldMarking;
