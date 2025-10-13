import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { Header } from "@/components/Header";
import HomePage from "./pages/HomePage";
import AnilStore from "./pages/AnilStore";
import AmaiStore from "./pages/AmaiStore";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <HashRouter>
                <div className="min-h-screen bg-background">
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/anil" element={<AnilStore />} />
                    <Route path="/amai" element={<AmaiStore />} />
                    <Route path="/anil/:category" element={<CategoryPage brand="anil" />} />
                    <Route path="/amai/:category" element={<CategoryPage brand="amai" />} />
                    <Route path="/anil/:category/:productId" element={<ProductDetailPage brand="anil" />} />
                    <Route path="/amai/:category/:productId" element={<ProductDetailPage brand="amai" />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </HashRouter>
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
