import { BsChevronDown } from "react-icons/bs";

import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../store";

const PlatformSelector = () => {
  const { data, error } = usePlatforms();
  const setPlatform = useGameQueryStore((s) => s.setPlatform);
  const selectedPlatform = useGameQueryStore((s) => s.gameQuery.platform);

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList>
        <MenuItem
          color="red"
          hidden={!selectedPlatform}
          onClick={() => setPlatform(undefined)}
        >
          Clear
        </MenuItem>
        {data?.results.map((platform) => (
          <MenuItem key={platform.id} onClick={() => setPlatform(platform)}>
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
