import { ThemeProvider } from "./providers/theme-provider";
import { Router } from "./routes/router";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  );
};
