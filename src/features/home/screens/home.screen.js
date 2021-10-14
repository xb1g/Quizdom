import React from "react";
import { Text } from "../../../components/typography/text.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Header } from "../components/header.component";

export const HomeScreen = () => {
  return (
    <>
      <Header />
      <Text>Home search bar thingy</Text>
      <Text>Today</Text>
      <Text>Maps</Text>
    </>
  );
};
