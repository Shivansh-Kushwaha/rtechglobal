import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext"
import { useEffect } from "react";


const BlogSection = () => {
  const { getAllBlogs, blogs, currentPage } = useBlog();

  useEffect(() => {
    getAllBlogs(currentPage, 4);
  }, [currentPage]);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="bg-card section-padding">
      <div ref={ref} className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Insights & Resources
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Expert insights on education technology, automation, and digital transformation.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 mt-4 md:mt-0"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
               <div className="h-full bg-background rounded-2xl overflow-hidden border border-border/50 hover:border-primary shadow-card hover:shadow-card-hover transition-all duration-300">
                      {/* Blog Image Placeholder */}
                      <div className="h-50 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-1">
                            <img src={post.blogPic || "/public/placeholder.svg"} alt={post.title} className="w-full h-full object-cover rounded-2xl " />
                      </div>

                  <div className="p-5">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
