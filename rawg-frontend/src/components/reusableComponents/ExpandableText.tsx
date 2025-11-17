import { useState } from "react";

import { Button, Text } from "@chakra-ui/react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 300;

  if (!children) return null;

  if (children.length <= LIMIT) return <Text>{children}</Text>;

  return (
    <Text>
      {expanded ? children : `${children.slice(0, LIMIT)}... `}
      <Button
        marginLeft={1}
        size="xs"
        fontWeight="bold"
        colorScheme="yellow"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
