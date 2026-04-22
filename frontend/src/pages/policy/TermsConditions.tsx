import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms & Conditions - RTechGlobal</title>
        <meta name="description" content="Terms and Conditions for RTechGlobal services." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        <div className="container-custom section-padding py-16">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">By accessing or using the ERP Management System, the user agrees to comply with and be bound by these Terms & Conditions. If you do not agree, you must not use the system.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Authorized users include administrators, staff, teachers, students, and parents.</li>
                  <li>Each user must access the system only with assigned credentials.</li>
                  <li>Sharing login details is strictly prohibited.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <p>Users agree to:</p>
                  <li>Provide accurate and updated information</li>
                  <li>Use the system only for official purposes</li>
                  <li>Avoid misuse, hacking, or unauthorized access</li>
                  <li>Maintain the security of account credentials</li>
                  <li>Use services in compliance with applicable laws</li>
                  <li>Not engage in unauthorized access or misuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. System Usage</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>The ERP is intended for academic, administrative, and communication purposes only.</li>
                  <li>Any illegal or unethical use is strictly forbidden.</li>
                  <li>The organization reserves the right to suspend accounts in case of misuse.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Termination of Access</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>The organization reserves the right to:
                      <li>Suspend or terminate user access without prior notice</li>
                      <li>Remove users violating policies or terms</li>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact</h2>
                <p className="text-muted-foreground">For questions, contact us at <a href="mailto:helprtechglobaledu@gmail.com" className="text-primary hover:underline">helprtechglobaledu@gmail.com</a></p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsConditions;
