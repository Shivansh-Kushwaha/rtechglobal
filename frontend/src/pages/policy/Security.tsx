import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Shield, Lock, Server, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Security = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Security - RTechGlobal</title>
        <meta name="description" content="Security practices at RTechGlobal - Learn how we protect your data." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        <div className="container-custom section-padding py-16">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">Security</h1>
            <p className="text-muted-foreground mb-8">At RTechGlobal, security is at the core of everything we do.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { icon: Shield, title: "Data Encryption", desc: "All data encrypted in transit and at rest using 256-bit SSL." },
                { icon: Lock, title: "Access Control", desc: "Role-based access ensures users only see relevant data." },
                { icon: Server, title: "Secure Infrastructure", desc: "Hosted on secure, compliant data centers with 99.9% uptime." },
                { icon: Eye, title: "Regular Audits", desc: "Regular security audits and vulnerability assessments." },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-xl p-6 border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Report a Vulnerability</h2>
              <p className="text-muted-foreground">Contact us at <a href="mailto:helprtechglobaledu@gmail.com" className="text-primary hover:underline">helprtechglobaledu@gmail.com  </a></p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Security;
