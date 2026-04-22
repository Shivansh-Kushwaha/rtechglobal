import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlog } from "@/contexts/BlogContext"
import { useEffect } from "react";
const Blog = () => {

  const { getAllBlogs, blogs, currentPage, totalPages } = useBlog();

  useEffect(() => {
    getAllBlogs(currentPage, 6);
  },[currentPage]);
  
  return (
    <>
      <Helmet>
        <title>Blog - Insights & Articles | RTechGlobal</title>
        <meta
          name="description"
          content="Expert insights on education technology, school automation, ERP solutions, and digital transformation for schools and colleges."
        />
        <meta property="og:title" content="RTechGlobal Blog - Education Technology Insights" />
        <meta property="og:description" content="Expert insights on education technology, school automation, and digital transformation." />
        <link rel="canonical" href="https://rtechglobal.in/blog" />
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
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container-custom section-padding pt-0 pb-0 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Insights & <span className="gradient-text">Articles</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Expert insights on education technology, automation, and digital transformation for schools and colleges.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="bg-card section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <div className="h-full bg-background rounded-2xl overflow-hidden border border-border/50 hover:border-primary shadow-card hover:shadow-card-hover transition-all duration-300">
                      {/* Blog Image Placeholder */}
                      <div className="h-50 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-1">
                            <img src={post.blogPic || "/public/placeholder.svg"} alt={post.title} className="w-full h-full object-cover rounded-2xl " />
                      </div>

                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                          {post.category}
                        </span>
                        <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-12">
              <Button
                disabled={currentPage === 1}
                onClick={() => getAllBlogs(currentPage - 1, 6)}
              >
                Previous
              </Button>

              <span className="flex items-center px-4">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                disabled={currentPage === totalPages}
                onClick={() => getAllBlogs(currentPage + 1, 6)}
              >
                Next
              </Button>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Blog;
