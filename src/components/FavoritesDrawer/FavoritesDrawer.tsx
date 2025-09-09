import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader,
  DrawerBody, DrawerCloseButton, VStack, HStack, Text, Button
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

const FavoritesDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favorites</DrawerHeader>
        <DrawerBody>
          <VStack align="stretch" spacing={4}>
            {favorites.map((favorite) => (
              <HStack key={`${favorite.type}-${favorite.id}`} justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text as={Link} to={favorite.link} fontWeight="bold" onClick={onClose}>
                    {favorite.title}
                  </Text>
                  <Text fontSize="sm" color="gray.500">{favorite.subtitle}</Text>
                </VStack>
                <Button size="sm" onClick={() => removeFavorite(favorite.type, favorite.id)}>Remove</Button>
              </HStack>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FavoritesDrawer;