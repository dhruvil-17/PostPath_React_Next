
import { useTheme } from "./themeContext";
function Page() {
  const {theme,toggleTheme} = useTheme();

  return <>
  <button className="border-2 p-2" onClick={toggleTheme}>Change Theme</button>
  <h1>Current theme: {theme}</h1>
  </>
}

export default Page;
