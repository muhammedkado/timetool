import { Clock, Users, Calendar, Timer, Briefcase, Globe, Zap, Shield } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LangContext";

export default function About() {
  const { lang } = useLang();
  useSeo({
    title: "About | TimeZone.tools",
    description: "Learn about TimeZone.tools — free, precise time and date tools for remote workers and global teams.",
    canonical: `https://timezone.tools/${lang}/about`,
  });

  const tools = [
    { icon: Clock, name: "Time Zone Converter", desc: "Convert times between 80+ cities and timezones instantly, with full DST support." },
    { icon: Users, name: "Meeting Planner", desc: "Find the best meeting time across multiple time zones using a 24-hour visual grid." },
    { icon: Calendar, name: "Date Difference Calculator", desc: "Calculate exact days, weeks, months, or years between any two dates." },
    { icon: Timer, name: "Countdown Timer", desc: "Count down to any event with a shareable link that encodes the date in the URL." },
    { icon: Briefcase, name: "Working Days Calculator", desc: "Count working days between dates, excluding weekends and major public holidays." },
  ];

  const values = [
    { icon: Zap, title: "Fast & Precise", desc: "All calculations use the browser's built-in IANA timezone database for DST-accurate results." },
    { icon: Shield, title: "100% Private", desc: "Everything runs in your browser. No data is ever sent to a server or stored anywhere." },
    { icon: Globe, title: "Global & Multilingual", desc: "Available in 7 languages with full RTL support for Arabic speakers." },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
            <Clock size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">About TimeZone.tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Free, precise time and date tools for remote workers, developers, and global teams.
            Built to be fast, private, and always available — no account required.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Our Mission</h2>
          <div className="bg-card border border-card-border rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              As the world becomes more connected, coordinating across time zones has become a daily
              challenge for millions of people. Whether you're scheduling a meeting with a team on
              three continents, counting down to a product launch, or calculating project deadlines
              — you need tools that are reliable, fast, and respect your privacy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              TimeZone.tools was built to solve these problems simply and efficiently. Every
              calculation runs entirely in your browser using the industry-standard IANA timezone
              database. Your data never leaves your device.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Our Tools</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="bg-card border border-card-border rounded-xl p-5 flex gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary flex-shrink-0 h-fit">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Our Values</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-card-border rounded-xl p-5 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Technology</h2>
          <div className="bg-card border border-card-border rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed mb-3">
              TimeZone.tools is built as a pure client-side React application. There is no backend server,
              no database, and no user accounts. All timezone data comes from the browser's built-in
              <strong className="text-foreground"> Intl API</strong> which is powered by the{" "}
              <strong className="text-foreground">IANA Time Zone Database</strong>, the industry-standard
              source used by operating systems worldwide.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["React", "TypeScript", "Vite", "Tailwind CSS", "i18next", "date-fns", "IANA Timezone DB"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium border border-border">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Get in Touch</h2>
          <div className="bg-card border border-card-border rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Have a suggestion, found a bug, or want to request a new feature? We'd love to hear
              from you.
            </p>
            <a
              href="mailto:contact@timezone.tools"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
