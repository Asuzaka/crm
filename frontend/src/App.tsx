import { AppRouter } from "./app/providers/router";
import { AutoAuth } from "./app/providers/router/autoAuth";
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AutoAuth>
        <AppRouter />
      </AutoAuth>
    </>
  );
}
