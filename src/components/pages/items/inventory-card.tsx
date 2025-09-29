import React from "react";

import { Building, Check, User, Users, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { players } from "@/constants/player";
import { InventoryItem } from "@/types/item";

type Props = {
  item: InventoryItem;
  selectedItem: InventoryItem | null;
  setSelectedItem: (item: InventoryItem) => void;
  selectedPlayer: string;
  setSelectedPlayer: (playerName: string) => void;
  handleUseItem: (item: InventoryItem) => void;
};

const InventoryCard = ({
  item,
  selectedItem,
  setSelectedItem,
  selectedPlayer,
  setSelectedPlayer,
  handleUseItem,
}: Props) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "player":
        return <User className="h-4 w-4" />;
      case "team":
        return <Users className="h-4 w-4" />;
      case "club":
        return <Building className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card
      key={item.id}
      className={`${
        item.used ? "border-green-500" : ""
      } flex flex-col relative`}
    >
      {item.used && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-green-500">Active</Badge>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-10 h-10"
            />
          </div>
        </div>
        <CardTitle className="text-center mt-2">{item.name}</CardTitle>
        <CardDescription className="text-center">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-center space-x-2 mb-2">
          <Badge variant="outline" className="flex items-center">
            {getCategoryIcon(item.category)}
            <span className="ml-1 capitalize">{item.category}</span>
          </Badge>
          <Badge variant="outline">{item.duration}</Badge>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          {item.effect}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between py-2 px-3 mt-auto border-t">
        <div className="font-medium">Qty: {item.quantity}</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={item.used ? "outline" : "default"}
              size="sm"
              onClick={() => setSelectedItem(item)}
              disabled={item.used}
            >
              {item.used ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Active
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Use
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>Use Item</DialogTitle>
                  <DialogDescription>
                    {selectedItem.category === "player"
                      ? "Select a player to use this item on"
                      : `Activate ${selectedItem.name} for your ${selectedItem.category}`}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex items-center py-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <img
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.name}
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{selectedItem.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedItem.effect}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Duration: {selectedItem.duration}
                    </p>
                  </div>
                </div>

                {selectedItem.category === "player" && (
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">
                      Select Player
                    </label>
                    <Select
                      value={selectedPlayer}
                      onValueChange={setSelectedPlayer}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a player" />
                      </SelectTrigger>
                      <SelectContent>
                        {players.map((player) => (
                          <SelectItem key={player.id} value={player.name}>
                            {player.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <DialogFooter>
                  <Button onClick={() => handleUseItem(selectedItem)}>
                    <Zap className="mr-2 h-4 w-4" />
                    {selectedItem.category === "player"
                      ? "Apply to Player"
                      : "Activate"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default InventoryCard;
