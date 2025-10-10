import React, { useState } from "react";

import { Loader2, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlayerEditionEnum } from "@/constants/player";

type Props = {
  slug: PlayerEditionEnum;
};

const PlayerCardItem = ({ slug }: Props) => {
  const [isGeneratingPlayer, setIsGeneratingPlayer] = useState(false);

  const onGeneratePlayer = () => {
    setIsGeneratingPlayer(true);
    // Simulate generating player
    setTimeout(() => {
      setIsGeneratingPlayer(false);
      // onConfirm();
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>generate player {slug} edition</div>
      {isGeneratingPlayer ? (
        <Button disabled className="w-full">
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating Player...
        </Button>
      ) : (
        <Button onClick={onGeneratePlayer} className="w-full">
          <Wand2 className="h-4 w-4" />
          Generate Player
        </Button>
      )}
    </div>
  );
};

export default PlayerCardItem;
