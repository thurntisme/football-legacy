import React from "react";

const PitchMarking = () => {
  return (
    <div className="flex items-center justify-center bg-emerald-800 py-[2%]">
      <div className="relative w-[96%] aspect-[105/68] border-2 border-white/70 bg-emerald-700 overflow-hidden">
        {/* Halfway line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/70 transform -translate-x-1/2"></div>

        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 h-[18%] aspect-square border-2 border-white/70 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Center spot */}
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Penalty area - Left */}
        <div className="absolute left-0 top-1/2 h-[44%] w-[16%] border-2 border-white/70 border-l-0 transform -translate-y-1/2"></div>

        {/* Goal area - Left */}
        <div className="absolute left-0 top-1/2 h-[18%] w-[6%] border-2 border-white/70 border-l-0 transform -translate-y-1/2"></div>

        {/* Penalty spot - Left */}
        <div className="absolute left-[11%] top-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-y-1/2"></div>

        {/* Penalty area - Right */}
        <div className="absolute right-0 top-1/2 h-[44%] w-[16%] border-2 border-white/70 border-r-0 transform -translate-y-1/2"></div>

        {/* Goal area - Right */}
        <div className="absolute right-0 top-1/2 h-[18%] w-[6%] border-2 border-white/70 border-r-0 transform -translate-y-1/2"></div>

        {/* Penalty spot - Right */}
        <div className="absolute right-[11%] top-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-y-1/2"></div>

        {/* Corner arcs */}
        <div className="absolute top-0 left-0 h-[5%] aspect-square border-r-2 border-b-2 border-white/70 rounded-br-full"></div>
        <div className="absolute bottom-0 left-0 h-[5%] aspect-square border-r-2 border-t-2 border-white/70 rounded-tr-full"></div>
        <div className="absolute top-0 right-0 h-[5%] aspect-square border-l-2 border-b-2 border-white/70 rounded-bl-full"></div>
        <div className="absolute bottom-0 right-0 h-[5%] aspect-square border-l-2 border-t-2 border-white/70 rounded-tl-full"></div>
      </div>
    </div>
  );
};

export default PitchMarking;
