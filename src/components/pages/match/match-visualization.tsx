"use client";

import FieldMarking from "../team/field-marking";

import React from "react";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { playerInMatch } from "@/mock/match-start";
import { BallPosition, PlayerPosition } from "@/types/match";

type props = {
  matchEvents: { minute: number; text: string; type: string }[];
  psychologicalState: {
    confidence: number;
    pressure: number;
    fatigue: number;
    teamwork: number;
  };
};

export default function MatchVisualization({
  matchEvents,
  psychologicalState,
}: props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ballPosition, setBallPosition] = useState<BallPosition>({
    x: 50,
    y: 50,
    team: "neutral",
    moving: false,
    direction: { x: 0, y: 0 },
  });
  const [players, setPlayers] = useState<PlayerPosition[]>([]);
  const [possession, setPossession] = useState<"home" | "away">("home");
  const [lastEventType, setLastEventType] = useState<string>("");
  const animationRef = useRef<number>(0);

  // Initialize player positions
  useEffect(() => {
    setPlayers(playerInMatch);
  }, []);

  // React to match events
  useEffect(() => {
    if (matchEvents.length === 0) return;

    const latestEvent = matchEvents[0];
    setLastEventType(latestEvent.type);

    // Determine which team the event is for
    const eventTeam = latestEvent.text.includes("Your Team") ? "home" : "away";

    // Update ball position and player movements based on event type
    switch (latestEvent.type) {
      case "shot":
      case "goal":
      case "miss":
        // Move ball towards goal
        setBallPosition({
          x: eventTeam === "home" ? 50 : 50,
          y: eventTeam === "home" ? 10 : 90,
          team: eventTeam,
          moving: true,
          direction: { x: 0, y: eventTeam === "home" ? -1 : 1 },
        });
        setPossession(eventTeam);
        break;
      case "corner":
        // Move ball to corner
        setBallPosition({
          x: Math.random() > 0.5 ? 5 : 95,
          y: eventTeam === "home" ? 15 : 85,
          team: eventTeam,
          moving: true,
          direction: { x: eventTeam === "home" ? 1 : -1, y: 0 },
        });
        setPossession(eventTeam);
        break;
      case "foul":
        // Random position on field
        setBallPosition({
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
          team: "neutral",
          moving: false,
          direction: { x: 0, y: 0 },
        });
        break;
      default: {
        // Random movement
        const randomX = 20 + Math.random() * 60;
        const randomY = 20 + Math.random() * 60;
        setBallPosition({
          x: randomX,
          y: randomY,
          team: eventTeam,
          moving: true,
          direction: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
        });
        setPossession(eventTeam);
        break;
      }
    }

    // Move players based on event
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        // Determine if this player should move towards the ball
        const shouldMoveTowardsBall =
          (player.team === eventTeam && Math.random() > 0.3) ||
          (player.team !== eventTeam && Math.random() > 0.7);

        if (shouldMoveTowardsBall) {
          // Calculate direction towards ball
          const dx = ballPosition.x - player.x;
          const dy = ballPosition.y - player.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Normalize direction
          const dirX = distance > 0 ? dx / distance : 0;
          const dirY = distance > 0 ? dy / distance : 0;

          // Set target position (not too close to the ball)
          const targetDistance = 5 + Math.random() * 10;
          const targetX = ballPosition.x - dirX * targetDistance;
          const targetY = ballPosition.y - dirY * targetDistance;

          return {
            ...player,
            moving: true,
            direction: { x: dirX, y: dirY },
            targetX,
            targetY,
          };
        } else {
          // Random movement
          const randomAngle = Math.random() * Math.PI * 2;
          const randomDistance = 5 + Math.random() * 10;
          const targetX = Math.max(
            5,
            Math.min(95, player.x + Math.cos(randomAngle) * randomDistance),
          );
          const targetY = Math.max(
            5,
            Math.min(95, player.y + Math.sin(randomAngle) * randomDistance),
          );

          return {
            ...player,
            moving: true,
            direction: { x: Math.cos(randomAngle), y: Math.sin(randomAngle) },
            targetX,
            targetY,
          };
        }
      });
    });
  }, [matchEvents]);

  // Animation loop
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

    // Animation function
    const animate = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update player positions
      setPlayers((prevPlayers) => {
        return prevPlayers.map((player) => {
          if (player.moving) {
            // Calculate distance to target
            const dx = player.targetX - player.x;
            const dy = player.targetY - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If close to target, stop moving
            if (distance < 0.5) {
              return { ...player, moving: false };
            }

            // Move towards target
            const speed =
              0.2 *
              (player.team === possession ? 1.2 : 1.0) *
              (psychologicalState.fatigue > 70 ? 0.7 : 1.0);
            const newX = player.x + (dx / distance) * speed;
            const newY = player.y + (dy / distance) * speed;

            return { ...player, x: newX, y: newY };
          }
          return player;
        });
      });

      // Update ball position
      setBallPosition((prev) => {
        if (prev.moving) {
          // Ball speed based on event type
          const ballSpeed =
            lastEventType === "shot" || lastEventType === "goal" ? 2 : 0.5;

          // New position
          const newX = prev.x + prev.direction.x * ballSpeed;
          const newY = prev.y + prev.direction.y * ballSpeed;

          // Check if ball is out of bounds
          if (newX < 0 || newX > 100 || newY < 0 || newY > 100) {
            return { ...prev, moving: false };
          }

          return { ...prev, x: newX, y: newY };
        }
        return prev;
      });

      // Draw players
      players.forEach((player) => {
        const x = (player.x / 100) * canvas.width;
        const y = (player.y / 100) * canvas.height;
        const radius = canvas.width * 0.015;

        // Player circle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = player.team === "home" ? "#3b82f6" : "#ef4444";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Player number
        ctx.fillStyle = "#ffffff";
        ctx.font = `${radius}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(player.id.toString(), x, y);
      });

      // Draw ball
      const ballX = (ballPosition.x / 100) * canvas.width;
      const ballY = (ballPosition.y / 100) * canvas.height;
      const ballRadius = canvas.width * 0.008;

      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [players, ballPosition, lastEventType, possession, psychologicalState]);

  return (
    <div className="relative w-full h-full pt-12 rounded-lg ">
      <canvas ref={canvasRef} className="w-full h-full absolute z-10" />

      <div className="relative w-full h-full">
        <FieldMarking />
      </div>

      <div className="absolute top-2 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
        <Badge
          variant={possession === "home" ? "default" : "destructive"}
          className="mr-2"
        >
          {possession === "home" ? "Your Team" : "City FC"}
        </Badge>
        Possession
      </div>

      {lastEventType && (
        <div className="absolute top-2 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {lastEventType.charAt(0).toUpperCase() + lastEventType.slice(1)}
        </div>
      )}
    </div>
  );
}
