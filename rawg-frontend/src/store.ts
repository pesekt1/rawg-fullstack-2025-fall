import { create } from "zustand";

import type { Genre } from "./services/genreService";
import type { Platform } from "./services/platformService";
import type { Store } from "./services/storeService";

export interface GameQuery {
  genre?: Genre;
  platform?: Platform;
  store?: Store;
  sortOrder?: string;
  searchText?: string;
  pageSize?: number;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenre: (genre?: Genre) => void;
  setPlatform: (platform?: Platform) => void;
  setStore: (store?: Store) => void;
  setSortOrder: (sortOrder?: string) => void;
  setSearchText: (searchText?: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {},

  setGenre: (genre) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, genre },
    })),

  setPlatform: (platform) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, platform },
    })),

  setStore: (store) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, store },
    })),

  setSortOrder: (sortOrder) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, sortOrder },
    })),

  setSearchText: (searchText) =>
    set(() => ({
      gameQuery: { searchText }, //reset other filters when searching
    })),
}));
export default useGameQueryStore;
