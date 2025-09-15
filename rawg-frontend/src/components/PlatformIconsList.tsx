import { HStack, Icon } from "@chakra-ui/react";

import type { IconType } from "react-icons";

import { FaAndroid, FaPlaystation, FaWindows, FaXbox } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import type { Platform } from "../hooks/useGames";

interface Props {
  platforms: Platform[];
}

const PlatformIconsList = ({ platforms }: Props) => {
  const getIcon = (slug: string): IconType | undefined => {
    switch (slug) {
      case "pc":
        return FaWindows;
      case "playstation":
        return FaPlaystation;
      case "xbox":
        return FaXbox;
      case "nintendo":
        return SiNintendo;
      case "android":
        return FaAndroid;
      case "ios":
        return MdPhoneIphone;
      default:
        return undefined;
    }
  };

  return (
    <HStack margin={1}>
      {platforms.map((platform) => {
        const IconComponent = getIcon(platform.slug);
        if (!IconComponent) return null;
        return <Icon key={platform.id} as={IconComponent} />;
      })}
    </HStack>
  );
};

export default PlatformIconsList;
