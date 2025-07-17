import { ThemeProvider } from "./providers/theme-provider";
import { Router } from "./routes/router";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  );
};
