import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation, useParams, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LangProvider } from "@/contexts/LangContext";
import { isSupportedLang, SupportedLang } from "@/i18n";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TimeZoneConverter from "@/pages/TimeZoneConverter";
import MeetingPlanner from "@/pages/MeetingPlanner";
import DateDifference from "@/pages/DateDifference";
import CountdownTimer from "@/pages/CountdownTimer";
import WorkingDays from "@/pages/WorkingDays";

const queryClient = new QueryClient();

function LangRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => {
    const saved = localStorage.getItem("tz_tools_lang");
    const nav = navigator.language?.slice(0, 2).toLowerCase();
    const lang = (saved && isSupportedLang(saved) ? saved
      : nav && isSupportedLang(nav) ? nav
      : "en") as SupportedLang;
    navigate(`/${lang}/`, { replace: true });
  }, []);
  return null;
}

function LangRoutes() {
  const params = useParams<{ lang: string }>();
  const lang = params.lang;
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isSupportedLang(lang)) {
      const saved = localStorage.getItem("tz_tools_lang");
      const fallback = (saved && isSupportedLang(saved) ? saved : "en") as SupportedLang;
      navigate(`/${fallback}/`, { replace: true });
    }
  }, [lang]);

  if (!isSupportedLang(lang)) return null;

  return (
    <LangProvider initialLang={lang as SupportedLang}>
      <Switch>
        <Route path="/:lang" component={Home} />
        <Route path="/:lang/" component={Home} />
        <Route path="/:lang/time-zone-converter" component={TimeZoneConverter} />
        <Route path="/:lang/meeting-planner" component={MeetingPlanner} />
        <Route path="/:lang/date-difference" component={DateDifference} />
        <Route path="/:lang/countdown-timer" component={CountdownTimer} />
        <Route path="/:lang/working-days" component={WorkingDays} />
        <Route component={NotFound} />
      </Switch>
    </LangProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LangRedirect} />
      <Route path="/:lang/:rest*" component={LangRoutes} />
      <Route path="/:lang" component={LangRoutes} />
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
