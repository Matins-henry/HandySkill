import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";

// Context
import { SiteContextProvider } from "./context/SiteContext";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import BookingPage from "@/pages/BookingPage";
import Reviews from "@/pages/Reviews";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

function Router() {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/booking" component={BookingPage} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingWhatsApp phoneNumber="08100104987" />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteContextProvider>
        <Router />
        <Toaster />
      </SiteContextProvider>
    </QueryClientProvider>
  );
}

export default App;
