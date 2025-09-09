import { IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useFavorites, FavoriteItem } from "../../context/FavoritesContext";
import { motion, useAnimation } from "framer-motion";

interface FavoriteButtonProps {
  item: FavoriteItem;
}

const MotionIconButton = motion(IconButton);
const MotionStarIcon = motion(StarIcon);

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ item }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(item.type, item.id);
  const controls = useAnimation();
  const starColor = active ? "var(--chakra-colors-yellow-400)" : "var(--chakra-colors-gray-400)"

  const handleClick = async () => {
    toggleFavorite(item);
    await controls.start({
      rotate: 432,  // multiple of 72 to ensure rotational symmetry
      scale: [1, 1.6, 1],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
    controls.set({ rotate: 0 });
  };

  return (
    <MotionIconButton
      aria-label="Toggle Favorite"
      icon={
        <MotionStarIcon
          // Set the initial color to the current state so it doesn't animate on mount
          initial={{ color: starColor }}
          animate={{ color: starColor }}
          transition={{ duration: 0.8 }}
        />
      }
      variant="ghost"
      onClick={handleClick}
      initial={{ rotate: 0, scale: 1 }}
      animate={controls}
    />
  );
};

export default FavoriteButton;
