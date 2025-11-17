import { Link } from "react-router-dom";

import { HStack, Image } from "@chakra-ui/react";

import logo from "../assets/logo.webp";
import useGameQueryStore from "../store";
import { ColorModeSwitch } from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

export const NavBar = () => {
  const resetGameQuery = useGameQueryStore((s) => s.reset);
  return (
    <HStack justifyContent={"space-between"} padding={4}>
      <Link to="/" onClick={resetGameQuery}>
        <Image src={logo} boxSize="60px" objectFit="cover" />
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};
