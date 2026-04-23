import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Loader2, Star, RefreshCw, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useTestimonial, Testimonial, GoogleReview } from '@/contexts/TestimonialContext';


const Testimonials = () => {
  const {  isGettingTestimonials, testimonials, googleReviews, fetchGoogleReviews, isGoogleReviewsFetching, deleteTestimonialPic } = useTestimonial();
  const { isUpdatingTestimonial, deleteTestimonial, updateTestimonial, createTestimonial, isCreatingTestimonial } = useTestimonial();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    role: "",
    organization: "",
    location: "",
    testimonialPic: "",
  });
  const { toast } = useToast();

  const emptyForm = {
    quote: "",
    author: "",
    role: "",
    organization: "",
    location: "",
    testimonialPic: "",
  };


  // useEffect(() => {
  //   fetchGoogleReviews();
  // }, []);


    const handleImageDelete = async () => {
        if (!deleteImageId) return;
        setIsDeleting(true);
        try {
            await deleteTestimonialPic(deleteImageId);
            toast({
                title: 'Testimonial Image Deleted',
                description: 'The testimonial image has been deleted successfully.',
            });
        } catch (error) {
            toast({
                title: 'Delete Failed',
                description: error instanceof Error ? error.message : 'Failed to delete testimonial image.',
                variant: 'destructive',
            });
        } finally {
            setIsDeleting(false);
            setDeleteImageId(null);
        }
    };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setFormData((prev) => ({ ...prev, testimonialPic: base64Image as string }));
    };
  };

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingId(testimonial._id);
      setFormData({
        quote: testimonial.quote,
        author: testimonial.author,
        role: testimonial.role,
        organization: testimonial.organization,
        location: testimonial.location,
        testimonialPic: testimonial.testimonialPic,
      });
    } else {
      setEditingId(null);
      setFormData(emptyForm);
    }
    setIsDialogOpen(true);
  };


  const handleImportReview = (review: GoogleReview) => {
    setEditingId(null);
    setFormData({
      quote: review.quote,
      author: review.author,
      role: "",
      organization: "",
      location: "",
      testimonialPic: null,
    });
    setIsDialogOpen(true);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.quote.trim() || !formData.author.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Quote and author are required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingId) {
        const updated = await updateTestimonial(editingId, formData);
        toast({ title: 'Testimonial Updated' });
      } else {
        const newTestimonial = await createTestimonial(formData);
        toast({ title: 'Testimonial created' });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: error instanceof Error ? error.message : 'Failed to save.',
        variant: 'destructive',
      });
    } finally {
      setEditingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteTestimonial(deleteId);
      toast({ title: 'Testimonial Deleted' });
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: error instanceof Error ? error.message : 'Failed to delete.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleChange = (field: keyof Testimonial, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isGettingTestimonials || isGoogleReviewsFetching) {
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
          <h1 className="text-3xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-500 mt-2">Manage customer testimonials and reviews.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchGoogleReviews} disabled={isGoogleReviewsFetching}>
            {isGoogleReviewsFetching ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Fetch Google Reviews
          </Button>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </div>
      </motion.div>

      {/* Google Reviews Section */}
      {googleReviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Google Reviews
              </CardTitle>
              <CardDescription>Import reviews from Google to your testimonials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {googleReviews.map((review) => (
                  <div
                    key={review._id}
                    className="flex items-start justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.author}</span>
                        {/* <div className="flex items-center">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div> */}
                      </div>
                      <p className="text-sm text-slate-600">{review.quote}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleImportReview(review)}
                    >
                      Import
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Testimonials Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial._id} className="relative">
              <CardContent className="pt-6">
                <div className="absolute top-4 right-4 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(testimonial._id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-25 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    <img
                      src={testimonial.testimonialPic || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=random&color=fff&size=128`}
                      alt={testimonial.author}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">
                      {testimonial.role}
                    </p><p className="text-sm text-slate-500">
                      {testimonial.organization}
                    </p>
                    <p className="text-sm text-primary">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm italic">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Update the testimonial details below.'
                : 'Add a new customer testimonial.'}
            </DialogDescription>
          </DialogHeader>
          {editingId ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex  gap-4">
                <div className="relative ml-auto">
                  <img
                    src={formData.testimonialPic || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.author)}&background=random&color=fff&size=128` || "/placeholder.svg"}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-4 "
                  />
                  <Label
                    htmlFor="avatar-upload"
                    className={`
                  absolute  bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200`
                    }
                  >
                    <Camera className="" />
                    <Input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Label>
               </div>
               <div className="flex mr-auto gap-2 items-center">
                    <Button
                      type='button'
                      variant="destructive"
                      onClick={() => {
                        if (editingId) {
                          setDeleteImageId(editingId);
                        }
                      }}
                      className='border-2 border-destructive hover:text-destructive hover:bg-white '
                    >
                      Delete Image
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    </div>
              </div>



              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personName">Name </Label>
                  <Input
                    id="personName"
                    value={formData.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    placeholder="Enter Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    placeholder="Enter Role"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => handleChange('organization', e.target.value)}
                    placeholder="Enter Organization Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="Enter City and State"
                  />
                </div>

              </div>


              <div className="space-y-2">
                <Label htmlFor="testimonialText">Testimonial</Label>
                <Textarea
                  id="testimonialText"
                  value={formData.quote}
                  onChange={(e) => handleChange('quote', e.target.value)}
                  placeholder="Their experience with our product..."
                  rows={4}
                />
              </div>


              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdatingTestimonial}>
                  {isUpdatingTestimonial ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>
              </DialogFooter>
            </form>) : (<form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={formData.testimonialPic || "/placeholder.svg"}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-4 "
                  />
                  <Label
                    htmlFor="avatar-upload"
                    className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200`
                    }
                  >
                    <Camera className="" />
                    <Input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Label>
                </div>
              </div>



              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personName">Name </Label>
                  <Input
                    id="personName"
                    value={formData.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    placeholder="Enter Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    placeholder="Enter Role"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => handleChange('organization', e.target.value)}
                    placeholder="Enter Organization Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="Enter City and State"
                  />
                </div>

              </div>


              <div className="space-y-2">
                <Label htmlFor="testimonialText">Testimonial</Label>
                <Textarea
                  id="testimonialText"
                  value={formData.quote}
                  onChange={(e) => handleChange('quote', e.target.value)}
                  placeholder="Their experience with our product..."
                  rows={4}
                />
              </div>


              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdatingTestimonial}>
                  {isUpdatingTestimonial ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>
              </DialogFooter>
            </form>)}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
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
                            onClick={handleImageDelete}
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

export default Testimonials;