import React from "react";
import CustomCursor from "./components/CustomCursor";
import Navigator from "./navigator";
import { Stack, Text } from "./styled/Shared";
import { useWindowDimensions } from "./utils/hooks";

function App() {
  const { width } = useWindowDimensions();
  return (
    <>
      {width > 700 && <CustomCursor />}
      <Navigator />
    </>
  );
}

export default App;
