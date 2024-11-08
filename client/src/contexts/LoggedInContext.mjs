/* eslint-disable no-unused-vars */
import { createContext } from "react";

// Step 1: Create the context with a default value (optional)
const LoggedInContext = createContext({
  isLoggedIn: false,
  username: "",
  setLoggedIn: (l) => {},
  setUsername: (u) => {}
});

export { LoggedInContext };