import type { ReactNode } from "react";

import { Box, Heading } from "@chakra-ui/react";

interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}

const DefinitionItem = ({ term, children }: Props) => {
  return (
    <Box as="dl">
      <Heading as="dt" fontSize="medium" color="gray.600">
        {term}
      </Heading>
      <Box as="dd">{children}</Box>
    </Box>
  );
};

export default DefinitionItem;
