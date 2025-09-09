import { createContext, useContext, useState, useEffect } from "react";

export type FavoriteItem = {
  id: string | number;
  type: "event" | "venue";
  title: string;
  subtitle?: string;
  link: string;
};

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (type: "event" | "venue", id: string | number) => boolean;
  removeFavorite: (type: "event" | "venue", id: string | number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
  // Initialize directly from localStorage (avoids race condition)
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
});

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  const toggleFavorite = (item: FavoriteItem): void => {
    setFavorites((prev) =>
      prev.some((favorite) => favorite.id === item.id && favorite.type === item.type)
        ? prev.filter((favorite) => !(favorite.id === item.id && favorite.type === item.type))
        : [...prev, item]
    );
  };

  const isFavorite = (type: "event" | "venue", id: string | number): boolean =>
    favorites.some((favorite) => favorite.id === id && favorite.type === type);

  const removeFavorite = (type: "event" | "venue", id: string | number): void =>
    setFavorites((prev) => prev.filter((favorite) => !(favorite.id === id && favorite.type === type)));

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};
