import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { Heading, Text } from "@chakra-ui/react";

import { NavBar } from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <Heading>Ooops...</Heading>
      <Text>
        {isRouteErrorResponse(error)
          ? "Page not found"
          : "An unexpected error has occurred."}
      </Text>
    </>
  );
};

export default ErrorPage;
