import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlog } from "@/contexts/BlogContext"
import { useEffect } from "react";

const BlogPost = () => {
  const { getBlogBySlug, selectedBlogSlug, isGettingBlogBySlug } = useBlog();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug);
  }, [slug, getBlogBySlug]);


  if (isGettingBlogBySlug) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  if (!selectedBlogSlug) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{selectedBlogSlug.title} | RTechGlobal Blog</title>
        <meta name="description" content={selectedBlogSlug.excerpt} />
        <meta property="og:title" content={selectedBlogSlug.title} />
        <meta property="og:description" content={selectedBlogSlug.excerpt} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://rtechglobal.in/blog/${selectedBlogSlug.slug}`} />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section
          className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(214, 95%, 93%) 0%, hsl(210, 40%, 98%) 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute  bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container-custom section-padding pt-0 pb-0 relative z-10">

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >

              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                {selectedBlogSlug.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {selectedBlogSlug.title}
              </h1>

              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(selectedBlogSlug.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {selectedBlogSlug.readTime}
                </span>
              </div>
            </motion.div>
          </div>

        </section>
        <div className="mx-auto max-w-6xl rounded-lg overflow-hidden opacity-80">
          <img src={selectedBlogSlug.blogPic || "/public/placeholder.svg"} alt={selectedBlogSlug.title} className="w-full h-full" />
        </div>
        {/* Article Content */}
        <section className="bg-card section-padding">
          <div className="container-custom">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-foreground
                  prose-ul:text-muted-foreground prose-li:mb-2"
                dangerouslySetInnerHTML={{ __html: selectedBlogSlug.content }}
              />
            </motion.article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding" style={{ background: "var(--gradient-cta)" }}>
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Ready to Transform Your Institution?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                See how RTechGlobal can help automate your school or college operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/blog">More Articles</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default BlogPost;
