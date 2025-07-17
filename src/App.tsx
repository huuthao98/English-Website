import { Router } from "./routes/router";
import { ThemeProvider } from "./providers/theme-provider";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  );
};
