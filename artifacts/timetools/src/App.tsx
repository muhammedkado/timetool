import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TimeZoneConverter from "@/pages/TimeZoneConverter";
import MeetingPlanner from "@/pages/MeetingPlanner";
import DateDifference from "@/pages/DateDifference";
import CountdownTimer from "@/pages/CountdownTimer";
import WorkingDays from "@/pages/WorkingDays";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/time-zone-converter" component={TimeZoneConverter} />
      <Route path="/meeting-planner" component={MeetingPlanner} />
      <Route path="/date-difference" component={DateDifference} />
      <Route path="/countdown-timer" component={CountdownTimer} />
      <Route path="/working-days" component={WorkingDays} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
