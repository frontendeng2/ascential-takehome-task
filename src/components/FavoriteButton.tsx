import { IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useFavorites, FavoriteItem } from "../context/FavoritesContext";

interface Props {
  item: FavoriteItem;
}

const FavoriteButton: React.FC<Props> = ({ item }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const active = isFavorite(item.type, item.id);

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.type, item.id)) {
      removeFavorite(item.type, item.id);
    } else {
      addFavorite(item.type, item);
    }
  };

  return (
    <IconButton
      aria-label="Toggle Favorite"
      icon={<StarIcon color={active ? "yellow.400" : "gray.400"} />}
      variant="ghost"
      onClick={() => toggleFavorite(item)}
    />
  );
};

export default FavoriteButton;
