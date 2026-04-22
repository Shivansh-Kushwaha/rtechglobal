import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, Eye, Camera, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Blog, useBlog } from "@/contexts/BlogContext";
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


const BlogEditor = () => {
    const { createBlog, clearSelectedBlog, updateBlog, getBlogById, selectedBlogId, deleteBlogImage } = useBlog();
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    let isEditing = false;
    if (id) {
        isEditing = true;
    }

    const [isLoading, setIsLoading] = useState(isEditing);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formData, setFormData] = useState({
        slug: "",
        title: "",
        excerpt: "",
        category: "",
        readTime: "",
        content: "",
        blogPic: "",
    });

    useEffect(() => {
        if (isEditing) {
            getBlogById(id);
        }
    }, [id, getBlogById]);

    useEffect(() => {
        return () => clearSelectedBlog(); // only on unmount
    }, []);
    useEffect(() => {
        if (selectedBlogId) {
            setFormData({
                slug: selectedBlogId.slug,
                title: selectedBlogId.title,
                excerpt: selectedBlogId.excerpt,
                category: selectedBlogId.category,
                readTime: selectedBlogId.readTime,
                content: selectedBlogId.content,
                blogPic: selectedBlogId.blogPic,
            });
            setIsLoading(false);
        }
    }, [selectedBlogId]);



    const handleDelete = async () => {
        if (!deleteImageId) return;
        setIsDeleting(true);
        try {
            await deleteBlogImage(deleteImageId);
            toast({
                title: 'Blog Image Deleted',
                description: 'The blog image has been deleted successfully.',
            });
        } catch (error) {
            toast({
                title: 'Delete Failed',
                description: error instanceof Error ? error.message : 'Failed to delete blog image.',
                variant: 'destructive',
            });
        } finally {
            setIsDeleting(false);
            setDeleteImageId(null);
        }
    };



    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };



    const handleTitleChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            title: value,
            slug: prev.slug || generateSlug(value),
        }));
    };



    const handleChange = (field: keyof Blog, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };





    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setFormData((prev) => ({ ...prev, blogPic: base64Image as string }));
        };
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Title is required.',
                variant: 'destructive',
            });
            return;
        }

        setIsSaving(true);

        try {
            if (isEditing ) {
                if (deleteImageId) return; 
                await updateBlog(id!, formData);
                toast({
                    title: 'Blog Updated',
                    description: 'Your blog post has been updated successfully.',
                });
            } else {
                await createBlog(formData);
                toast({
                    title: 'Blog Created',
                    description: 'Your blog post has been created successfully.',
                });
            }
            navigate('/a/blogs');
        } catch (error) {
            toast({
                title: 'Save Failed',
                description: error instanceof Error ? error.message : 'Failed to save blog.',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };



    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate('/a/blogs')}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {isEditing ? 'Edit Blog Post' : 'Create New Blog'}
                        </h1>
                    </div>
                </div>
                {formData.slug && (
                    <Button
                        variant="outline"
                        onClick={() => window.open(`/blog/${formData.slug}`, '_blank')}
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                    </Button>
                )}
            </motion.div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Content</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title </Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter blog title"
                                        value={formData.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        placeholder="blog-post-url"
                                        value={formData.slug}
                                        onChange={(e) => handleChange('slug', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        placeholder="Brief description of the blog post"
                                        value={formData.excerpt}
                                        onChange={(e) => handleChange('excerpt', e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Category</Label>
                                    <Input
                                        id="category"
                                        placeholder="Enter category"
                                        value={formData.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">ReadTime</Label>
                                    <Input
                                        id="readTime"
                                        placeholder="Enter expected reading time for the blog"
                                        value={formData.readTime}
                                        onChange={(e) => handleChange('readTime', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Write your blog content here..."
                                        value={formData.content}
                                        onChange={(e) => handleChange('content', e.target.value)}
                                        rows={15}
                                        className="font-mono"
                                    />
                                    <p className="text-xs text-slate-500">
                                        Supports Markdown formatting
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Publish Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Publish</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value) => handleChange('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}

                                <Button type="submit" className="w-full" disabled={isSaving}>
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            {isEditing ? 'Update' : 'Publish'}
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Featured Image */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Featured Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={formData.blogPic || "/placeholder.svg"}
                                            alt="Profile"
                                            className="rounded-lg object-cover "
                                        />
                                        <Label
                                            htmlFor="blogPic-upload"
                                            className={`absolute bottom-0 right-0 bg-base-content hover:scale-105p-2 rounded-full cursor-pointer transition-all duration-200`
                                            }
                                        >
                                            <Camera className="" />
                                            <Input
                                                type="file"
                                                id="blogPic-upload"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </Label>
                                    </div>
                                </div>

                            </CardContent>
                            {isEditing ? (
                                <CardFooter className="justify-end ">
                                    <Button
                                        type='button'
                                        variant="destructive"
                                        onClick={() => {
                                            if (selectedBlogId?._id) {
                                                setDeleteImageId(selectedBlogId._id);
                                            }
                                        }}
                                        className='border-2 border-destructive hover:text-destructive hover:bg-white '
                                    >
                                        Delete Image
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardFooter>) : null}
                        </Card>


                        {/* SEO Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="metaTitle">Meta Title</Label>
                                    {/* <Input
                                        id="metaTitle"
                                        placeholder="SEO title (max 60 chars)"
                                        value={formData.metaTitle}
                                        onChange={(e) => handleChange('metaTitle', e.target.value)}
                                        maxLength={60}
                                    />
                                    <p className="text-xs text-slate-500">
                                        {formData.metaTitle.length}/60 characters
                                    </p> */}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="metaDescription">Meta Description</Label>
                                    {/* <Textarea
                                        id="metaDescription"
                                        placeholder="SEO description (max 160 chars)"
                                        value={formData.metaDescription}
                                        onChange={(e) => handleChange('metaDescription', e.target.value)}
                                        maxLength={160}
                                        rows={3}
                                    />
                                    <p className="text-xs text-slate-500">
                                        {formData.metaDescription.length}/160 characters
                                    </p> */}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </form>


            
            <AlertDialog open={!!deleteImageId} onOpenChange={() => setDeleteImageId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Blog Image</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this blog image? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            type="button" 
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

        </div>
    );
};

export default BlogEditor;