import { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";

const Switch = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={darkMode}
          onChange={toggleDarkMode}
        ></input>
        <span className="font-medium  dark:text-gray-300 dark:border-darkTextSecondaryColor border-primary text-orange-900 flex items-center gap-2 border-2 w-10 h-10 justify-center rounded-3xl">
          {colorTheme === "light" ? (
            <>
              <MdDarkMode />
            </>
          ) : (
            <>
              <BsFillSunFill />
            </>
          )}
        </span>
      </label>
    </div>
  );
};

export default Switch;
