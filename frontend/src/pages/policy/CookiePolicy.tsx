import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Cookie Policy - RTechGlobal</title>
        <meta name="description" content="Cookie Policy for RTechGlobal - Learn how we use cookies." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        <div className="container-custom section-padding py-16">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies</h2>
                <p className="text-muted-foreground">Cookies are small text files stored on your device when you visit our website, helping us provide a better experience.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Types of Cookies</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Essential:</strong> Required for the website to function</li>
                  <li><strong>Analytics:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Preference:</strong> Remember your settings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Contact</h2>
                <p className="text-muted-foreground">Questions? Contact us at <a href="mailto:helprtechglobaledu@gmail.com" className="text-primary hover:underline">helprtechglobaledu@gmail.com</a></p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CookiePolicy;
