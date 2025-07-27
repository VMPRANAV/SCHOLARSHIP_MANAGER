import { Route, Router } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";
import Header from "@/components/header";
import HomePage from "@/pages/home";
import AdminPage from "@/pages/admin";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-website-gradient relative">
        <Router>
          <Header />
          <main className="relative z-10">
            <Route path="/" component={HomePage} />
            <Route path="/admin" component={AdminPage} />
          </main>
        </Router>
        <Toaster />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
