import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - RTechGlobal</title>
        <meta name="description" content="Privacy Policy for RTechGlobal - Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-20">
        <div className="container-custom section-padding py-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  RTechGlobal ("we," "our," or "us") is committed to protecting the privacy of educational institutions, students, parents, and staff who use our services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our School ERP, College ERP, and related software solutions.
                </p>
                <p className="text-muted-foreground">
                  By accessing or using our services, you consent to the practices described in this Privacy Policy. If you do not agree with this policy, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">We collect various types of information to provide and improve our services:</p>
                
                <h3 className="text-xl font-medium text-foreground mb-3">2.1 Personal Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Name, email address, phone number, and contact details</li>
                  <li>Institution name, type, and location</li>
                  <li>Student and staff records (as provided by the institution)</li>
                  <li>Billing and payment information</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground mb-3">2.2 Usage Data</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Log data including IP address, browser type, and access times</li>
                  <li>Feature usage patterns and preferences</li>
                  <li>Device information and operating system</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>To provide, maintain, and improve our ERP services</li>
                  <li>To process transactions and send billing notifications</li>
                  <li>To respond to inquiries and provide customer support</li>
                  <li>To send updates, newsletters, and promotional materials (with consent)</li>
                  <li>To analyze usage patterns and improve user experience</li>
                  <li>To comply with legal obligations and regulatory requirements</li>
                  <li>To protect against fraud and unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Service Providers:</strong> Third-party vendors who assist in delivering our services (hosting, payment processing)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>256-bit SSL encryption for data transmission</li>
                  <li>Secure data centers with physical access controls</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Role-based access controls and authentication</li>
                  <li>Automated backups and disaster recovery systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Upon termination of services, we will retain your data for a reasonable period to allow for data export, after which it will be securely deleted.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights</h2>
                <p className="text-muted-foreground mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access and obtain a copy of your data</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability in a machine-readable format</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our services are designed for use by educational institutions. Student data is collected and managed by the institution, and we act as a data processor on their behalf. Institutions are responsible for obtaining necessary parental consent as required by applicable laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy or our data practices, please contact us at{" "}
                  <a href="mailto:helprtechglobaledu@gmail.com" className="text-primary hover:underline">
                    helprtechglobaledu@gmail.com
                  </a>
                  {" "}or write to us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  RTechGlobal<br />
                  Plot No.- 176, Kulgaon Rd, Chakeri Ward, Rooma,<br/>
                  Kanpur, Uttar Pradesh 209402
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
