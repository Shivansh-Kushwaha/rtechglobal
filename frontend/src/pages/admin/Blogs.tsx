import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Loader2, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {Blog, useBlog } from "@/contexts/BlogContext";

const Blogs = () => {
    const { getAllBlogs, deleteBlog,isGettingBlogs ,blogs,currentPage,totalPages} = useBlog();
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        getAllBlogs();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            await deleteBlog(deleteId);
            toast({
                title: 'Blog Deleted',
                description: 'The blog post has been deleted successfully.',
            });
        } catch (error) {
            toast({
                title: 'Delete Failed',
                description: error instanceof Error ? error.message : 'Failed to delete blog.',
                variant: 'destructive',
            });
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isGettingBlogs) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
                    <p className="text-slate-500 mt-2">
                        Create, edit, and manage your blog posts.
                    </p>
                </div>
                <Button onClick={() => navigate('/a/blogs/new')}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Blog
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <CardTitle>All Posts</CardTitle>
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search blogs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Publish Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBlogs.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                                                No blog posts found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredBlogs.map((blog) => (
                                            <TableRow key={blog._id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{blog.title}</p>
                                                        <p className="text-sm text-slate-500 truncate max-w-xs">
                                                            {blog.excerpt}
                                                        </p>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {blog.createdAt
                                                        ? new Date(blog.createdAt).toLocaleDateString()
                                                        : '-'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => navigate(`/blog/${blog.slug}`)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => navigate(`/a/blogs/edit/${blog._id}`)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => setDeleteId(blog._id)}
                                                            className="text-destructive hover:text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this blog post? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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
        
    );
};

export default Blogs;