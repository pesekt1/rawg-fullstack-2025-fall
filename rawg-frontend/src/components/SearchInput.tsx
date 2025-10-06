import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

interface Props {
  onSearch: (searchText: string | null) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(ref.current?.value || "");
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search for games..."
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
