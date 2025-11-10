import type { IconType } from "react-icons";
import { BsGlobe } from "react-icons/bs";
import {
  FaAndroid,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";

import { HStack, Icon } from "@chakra-ui/react";

import type { Platform } from "../services/platformService";

interface Props {
  platforms: Platform[];
}

const PlatformIconsList = ({ platforms }: Props) => {
  const getIcon = (slug: string): IconType | undefined => {
    switch (slug) {
      case "pc":
        return FaWindows;
      case "mac":
        return FaApple;
      case "linux":
        return FaLinux;
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
      case "web":
        return BsGlobe;
      default:
        return undefined;
    }
  };

  return (
    <HStack margin={1}>
      {platforms.map((platform) => (
        <Icon key={platform.id} as={getIcon(platform.slug)} />
      ))}
    </HStack>
  );
};

export default PlatformIconsList;
