import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import useGameQueryStore from "../store";

const SearchInput = () => {
  const setSearchText = useGameQueryStore((s) => s.setSearchText);

  const ref = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSearchText(ref.current?.value || "");
        navigate("/");
        if (ref.current) ref.current.value = "";
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
