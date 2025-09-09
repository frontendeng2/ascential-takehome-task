import { Flex, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import FavoritesDrawer from '../FavoritesDrawer';


const Nav: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        as="nav"
        bg="gray.700"
        color="white"
        padding="24px"
        justify="space-between"
        align="center"
      >
        <Heading size="md">Ascential Front End Challenge</Heading>
        <IconButton
          aria-label="Favorites"
          icon={<StarIcon />}
          onClick={onOpen}
          variant="ghost"
          color="yellow.400"
        />
      </Flex>
      <FavoritesDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Nav;