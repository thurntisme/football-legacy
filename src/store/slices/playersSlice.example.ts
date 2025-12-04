// Example: Players slice using external API
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { externalApi } from "@/lib/api/externalApi";

interface Player {
  id: string;
  name: string;
  position: string;
  rating: number;
  team?: string;
}

interface PlayersState {
  players: Player[];
  selectedPlayer: Player | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  players: [],
  selectedPlayer: null,
  isLoading: false,
  error: null,
};

// Async thunks using external API
export const fetchPlayers = createAsyncThunk(
  "players/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data, ok } = await externalApi.get<{ players: Player[] }>(
        "players",
      );
      if (!ok) {
        return rejectWithValue("Failed to fetch players");
      }
      return data.players;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch players");
    }
  },
);

export const fetchPlayerById = createAsyncThunk(
  "players/fetchById",
  async (playerId: string, { rejectWithValue }) => {
    try {
      const { data, ok } = await externalApi.get<Player>(
        `players/${playerId}`,
      );
      if (!ok) {
        return rejectWithValue("Failed to fetch player");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch player");
    }
  },
);

export const createPlayer = createAsyncThunk(
  "players/create",
  async (playerData: Omit<Player, "id">, { rejectWithValue }) => {
    try {
      const { data, ok } = await externalApi.post<Player>(
        "players",
        playerData,
      );
      if (!ok) {
        return rejectWithValue("Failed to create player");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create player");
    }
  },
);

export const updatePlayer = createAsyncThunk(
  "players/update",
  async (
    { id, ...playerData }: Partial<Player> & { id: string },
    { rejectWithValue },
  ) => {
    try {
      const { data, ok } = await externalApi.put<Player>(
        `players/${id}`,
        playerData,
      );
      if (!ok) {
        return rejectWithValue("Failed to update player");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update player");
    }
  },
);

export const deletePlayer = createAsyncThunk(
  "players/delete",
  async (playerId: string, { rejectWithValue }) => {
    try {
      const { ok } = await externalApi.delete(`players/${playerId}`);
      if (!ok) {
        return rejectWithValue("Failed to delete player");
      }
      return playerId;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete player");
    }
  },
);

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setSelectedPlayer: (state, action: PayloadAction<Player | null>) => {
      state.selectedPlayer = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all players
      .addCase(fetchPlayers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch player by ID
      .addCase(fetchPlayerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPlayer = action.payload;
      })
      .addCase(fetchPlayerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create player
      .addCase(createPlayer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.players.push(action.payload);
      })
      .addCase(createPlayer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update player
      .addCase(updatePlayer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.players.findIndex(
          (p) => p.id === action.payload.id,
        );
        if (index !== -1) {
          state.players[index] = action.payload;
        }
        if (state.selectedPlayer?.id === action.payload.id) {
          state.selectedPlayer = action.payload;
        }
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete player
      .addCase(deletePlayer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.players = state.players.filter((p) => p.id !== action.payload);
        if (state.selectedPlayer?.id === action.payload) {
          state.selectedPlayer = null;
        }
      })
      .addCase(deletePlayer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedPlayer, clearError } = playersSlice.actions;
export default playersSlice.reducer;
