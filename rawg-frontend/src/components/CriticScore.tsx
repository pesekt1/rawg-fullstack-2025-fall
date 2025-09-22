import { Badge } from "@chakra-ui/react";

interface Prop {
  score: number;
}

const CriticScore = ({ score }: Prop) => {
  const color = score > 75 ? "green" : score > 50 ? "yellow" : "red";

  if (!score) return null;

  return (
    <Badge border="1px solid" fontSize={14} colorScheme={color}>
      {score}
    </Badge>
  );
};

export default CriticScore;
