import { useContext } from "react";
import { ThemeContext } from "./themeContext";

function Page() {
  const theme = useContext(ThemeContext);

  return <h1>Current theme: {theme}</h1>;
}

export default Page;
