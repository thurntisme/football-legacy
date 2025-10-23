"use client";

import { useEffect, useRef } from "react";

type TacticalOverlayProps = {
  formation: string;
  playerPositions: { id: string; x: number; y: number; name: string }[];
  heatmap: number[][];
};

export default function TacticalOverlay({
  formation,
  playerPositions,
  heatmap,
}: TacticalOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Default formations if no player positions provided
  const getDefaultFormation = (formationName: string) => {
    switch (formationName) {
      case "4-3-3":
        return [
          { id: "gk", x: 50, y: 90, name: "GK" },
          { id: "lb", x: 20, y: 70, name: "LB" },
          { id: "cb1", x: 35, y: 70, name: "CB" },
          { id: "cb2", x: 65, y: 70, name: "CB" },
          { id: "rb", x: 80, y: 70, name: "RB" },
          { id: "cm1", x: 30, y: 50, name: "CM" },
          { id: "cdm", x: 50, y: 55, name: "CDM" },
          { id: "cm2", x: 70, y: 50, name: "CM" },
          { id: "lw", x: 20, y: 30, name: "LW" },
          { id: "st", x: 50, y: 25, name: "ST" },
          { id: "rw", x: 80, y: 30, name: "RW" },
        ];
      case "4-4-2":
        return [
          { id: "gk", x: 50, y: 90, name: "GK" },
          { id: "lb", x: 20, y: 70, name: "LB" },
          { id: "cb1", x: 35, y: 70, name: "CB" },
          { id: "cb2", x: 65, y: 70, name: "CB" },
          { id: "rb", x: 80, y: 70, name: "RB" },
          { id: "lm", x: 20, y: 50, name: "LM" },
          { id: "cm1", x: 35, y: 50, name: "CM" },
          { id: "cm2", x: 65, y: 50, name: "CM" },
          { id: "rm", x: 80, y: 50, name: "RM" },
          { id: "st1", x: 35, y: 30, name: "ST" },
          { id: "st2", x: 65, y: 30, name: "ST" },
        ];
      case "5-3-2":
        return [
          { id: "gk", x: 50, y: 90, name: "GK" },
          { id: "lwb", x: 10, y: 65, name: "LWB" },
          { id: "cb1", x: 30, y: 75, name: "CB" },
          { id: "cb2", x: 50, y: 75, name: "CB" },
          { id: "cb3", x: 70, y: 75, name: "CB" },
          { id: "rwb", x: 90, y: 65, name: "RWB" },
          { id: "cm1", x: 30, y: 50, name: "CM" },
          { id: "cdm", x: 50, y: 50, name: "CDM" },
          { id: "cm2", x: 70, y: 50, name: "CM" },
          { id: "st1", x: 35, y: 30, name: "ST" },
          { id: "st2", x: 65, y: 30, name: "ST" },
        ];
      default:
        return [
          { id: "gk", x: 50, y: 90, name: "GK" },
          { id: "lb", x: 20, y: 70, name: "LB" },
          { id: "cb1", x: 35, y: 70, name: "CB" },
          { id: "cb2", x: 65, y: 70, name: "CB" },
          { id: "rb", x: 80, y: 70, name: "RB" },
          { id: "lm", x: 20, y: 50, name: "LM" },
          { id: "cm1", x: 35, y: 50, name: "CM" },
          { id: "cm2", x: 65, y: 50, name: "CM" },
          { id: "rm", x: 80, y: 50, name: "RM" },
          { id: "st1", x: 35, y: 30, name: "ST" },
          { id: "st2", x: 65, y: 30, name: "ST" },
        ];
    }
  };

  // Draw the tactical overlay
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw field
    drawField(ctx, canvas.width, canvas.height);

    // Draw heatmap
    drawHeatmap(ctx, canvas.width, canvas.height, heatmap);

    // Draw formation
    const positions =
      playerPositions.length > 0
        ? playerPositions
        : getDefaultFormation(formation);
    drawFormation(ctx, canvas.width, canvas.height, positions);

    // Draw formation name
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(formation, canvas.width / 2, 30);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [formation, playerPositions, heatmap]);

  // Draw field markings
  const drawField = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    // Field background
    ctx.fillStyle = "#4ade80";
    ctx.fillRect(0, 0, width, height);

    // Field lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 2;

    // Outer boundary
    ctx.strokeRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9);

    // Center line
    ctx.beginPath();
    ctx.moveTo(width * 0.05, height * 0.5);
    ctx.lineTo(width * 0.95, height * 0.5);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, width * 0.1, 0, Math.PI * 2);
    ctx.stroke();

    // Center spot
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, width * 0.01, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fill();

    // Penalty areas
    ctx.strokeRect(width * 0.3, height * 0.05, width * 0.4, height * 0.15);
    ctx.strokeRect(width * 0.3, height * 0.8, width * 0.4, height * 0.15);

    // Goal areas
    ctx.strokeRect(width * 0.4, height * 0.05, width * 0.2, height * 0.06);
    ctx.strokeRect(width * 0.4, height * 0.89, width * 0.2, height * 0.06);

    // Penalty spots
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.15, width * 0.01, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.85, width * 0.01, 0, Math.PI * 2);
    ctx.fill();
  };

  // Draw heatmap
  const drawHeatmap = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    heatmapData: number[][],
  ) => {
    if (!heatmapData || heatmapData.length === 0) return;

    const cellWidth = width / heatmapData[0].length;
    const cellHeight = height / heatmapData.length;

    // Draw heatmap cells
    for (let y = 0; y < heatmapData.length; y++) {
      for (let x = 0; x < heatmapData[y].length; x++) {
        const intensity = heatmapData[y][x];
        if (intensity > 0) {
          const alpha = Math.min(0.7, intensity / 10); // Cap at 0.7 opacity
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }
      }
    }
  };

  // Draw formation
  const drawFormation = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    positions: { id: string; x: number; y: number; name: string }[],
  ) => {
    // Draw player positions
    positions.forEach((pos) => {
      const x = (pos.x / 100) * width;
      const y = (pos.y / 100) * height;
      const radius = width * 0.02;

      // Player circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#3b82f6";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Player position
      ctx.fillStyle = "#ffffff";
      ctx.font = `${radius * 0.8}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(pos.name, x, y);
    });

    // Draw connections between players
    ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
    ctx.lineWidth = 2;

    // Connect players in the same line
    const lines = formation.split("-").map(Number);
    let currentIndex = 1; // Skip goalkeeper (index 0)

    for (let i = 0; i < lines.length; i++) {
      const lineCount = lines[i];
      const linePositions = positions.slice(
        currentIndex,
        currentIndex + lineCount,
      );

      // Connect players in the same line
      for (let j = 0; j < linePositions.length - 1; j++) {
        const pos1 = linePositions[j];
        const pos2 = linePositions[j + 1];

        ctx.beginPath();
        ctx.moveTo((pos1.x / 100) * width, (pos1.y / 100) * height);
        ctx.lineTo((pos2.x / 100) * width, (pos2.y / 100) * height);
        ctx.stroke();
      }

      // Connect to previous line (if exists)
      if (i > 0) {
        const prevLinePositions = positions.slice(
          currentIndex - lines[i - 1],
          currentIndex,
        );

        // Connect middle player of current line to middle player of previous line
        const currentMiddle =
          linePositions[Math.floor(linePositions.length / 2)];
        const prevMiddle =
          prevLinePositions[Math.floor(prevLinePositions.length / 2)];

        ctx.beginPath();
        ctx.moveTo(
          (currentMiddle.x / 100) * width,
          (currentMiddle.y / 100) * height,
        );
        ctx.lineTo((prevMiddle.x / 100) * width, (prevMiddle.y / 100) * height);
        ctx.stroke();
      }

      currentIndex += lineCount;
    }
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
