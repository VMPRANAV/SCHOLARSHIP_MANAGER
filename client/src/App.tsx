import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "@/components/error-boundary";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { setGlobalToast } from "./lib/error-handler";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const toast = useToast();

  useEffect(() => {
    setGlobalToast(toast);
  }, [toast]);

  return (
    <ErrorBoundary toast={toast}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
