import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Busca from "./pages/Busca";
import FilmeDetalhes from "./pages/FilmeDetalhes";
import Perfil from "./pages/Perfil";
import Match from "./pages/Match";
import Ranking from "./pages/Ranking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/filme/:id" element={<FilmeDetalhes />} />
            <Route path="/perfil/:id" element={<Perfil />} />
            <Route path="/match" element={<Match />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
