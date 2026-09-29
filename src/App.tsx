import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CaseStudy } from "./pages/CaseStudy";
import { JournalPiece } from "./pages/JournalPiece";
import { Landing } from "./pages/Landing";
import { NotFound } from "./pages/NotFound";
import { Resume } from "./pages/Resume";
import { Work } from "./pages/Work";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/journal/:slug" element={<JournalPiece />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
