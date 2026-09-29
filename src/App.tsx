import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
      </Route>
    </Routes>
  );
}
