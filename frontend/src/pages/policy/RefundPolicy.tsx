import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Refund & Cancellation Policy - RTechGlobal</title>
        <meta name="description" content="Refund and Cancellation Policy for RTechGlobal services." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        <div className="container-custom section-padding py-16">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">Refund & Cancellation Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Subscription Cancellation</h2>
                <p className="text-muted-foreground">You may cancel your subscription at any time. Access continues until the end of your billing period.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Refund Eligibility</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Service unavailability due to our fault</li>
                  <li>Duplicate charges or billing errors</li>
                  <li>Cancellation within 7 days of initial subscription</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Non-Refundable Items</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Custom development work completed</li>
                  <li>Training sessions conducted</li>
                  <li>Setup and implementation fees</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Contact</h2>
                <p className="text-muted-foreground">For refund requests, contact <a href="mailto:helprtechglobaledu@gmail.com" className="text-primary hover:underline">helprtechglobaledu@gmail.com</a></p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RefundPolicy;
