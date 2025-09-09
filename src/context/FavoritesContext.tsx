import { createContext, useContext, useState } from "react";

export type FavoriteItem = {
  id: number;
  type: "event" | "venue";
  title: string;
  subtitle?: string;
  link: string;
};

interface FavoritesState {
  event: FavoriteItem[];
  venue: FavoriteItem[];
}

interface FavoritesContextType {
  favorites: FavoritesState; // only event & venue
  addFavorite: (type: "event" | "venue", item: FavoriteItem) => void;
  removeFavorite: (type: "event" | "venue", id: number) => void;
  isFavorite: (type: "event" | "venue", id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoritesState>({
    venue: [],
    event: [],
  });

  const addFavorite = (type: "event" | "venue", item: FavoriteItem) => {
    setFavorites((prev) => ({
      ...prev,
      [type]: [...prev[type], item],
    }));
  };

  const removeFavorite = (type: "event" | "venue", id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  const isFavorite = (type: "event" | "venue", id: number) => {
    return favorites[type].some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
