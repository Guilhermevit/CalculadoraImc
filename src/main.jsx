import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

const root = document.getElementById("root");

if (root) {
  const appRoot = createRoot(root);
  appRoot.render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
