import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Search, Calendar, Clock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { RequestStatus,  useBookDemo } from '@/contexts/bookdemoContext';



const statusColors: Record<RequestStatus, string> = {
    active: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    fulfilled: 'bg-green-100 text-green-800',
};

const DemoRequests = () => {
    const { updateDemoStatus, isGettingDemo, demos } = useBookDemo()
    const [searchQuery, setSearchQuery] = useState('');
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const { toast } = useToast();

    const handleStatusChange = async (id: string, newStatus: RequestStatus) => {
        setUpdatingId(id);
        try {
            await updateDemoStatus(id, newStatus);
            toast({
                title: 'Status Updated',
                description: `Demo request marked as ${newStatus}.`,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update status. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredRequests = demos.filter(
        (r) =>
            r.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isGettingDemo) {
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
            >
                <h1 className="text-3xl font-bold text-slate-900">Demo Requests</h1>
                <p className="text-slate-500 mt-2">
                    Manage demo booking requests from potential clients.
                </p>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Active</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {demos.filter((r) => r.status === 'active').length}
                                </p>
                            </div>
                            <div className="p-3 rounded-full bg-blue-100">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {demos.filter((r) => r.status === 'pending').length}
                                </p>
                            </div>
                            <div className="p-3 rounded-full bg-yellow-100">
                                <Clock className="h-5 w-5 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Fulfilled</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {demos.filter((r) => r.status === 'fulfilled').length}
                                </p>
                            </div>
                            <div className="p-3 rounded-full bg-green-100">
                                <User className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <CardTitle>All Demo Requests</CardTitle>
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search requests..."
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
                                        <TableHead>Name</TableHead>
                                        <TableHead>Institution</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Preferred Date</TableHead>
                                        <TableHead>Message</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRequests.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                                No demo requests found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRequests.map((request) => (
                                            <TableRow key={request._id}>
                                                <TableCell>
                                                    <p className="font-medium text-slate-900">{request.fullname}</p>
                                                </TableCell>
                                                <TableCell>{request.institution}</TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <a
                                                            href={`mailto:${request.email}`}
                                                            className="text-sm text-primary hover:underline block"
                                                        >
                                                            {request.email}
                                                        </a>
                                                        <a
                                                            href={`tel:${request.phone}`}
                                                            className="text-sm text-slate-500 block"
                                                        >
                                                            {request.phone}
                                                        </a>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-slate-400" />
                                                        <span className="text-sm">
                                                            {request.preferredDate ? new Date(request.preferredDate).toLocaleDateString() : "No date selected"}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-sm text-slate-600 max-w-xs truncate">
                                                        {request.message}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={request.status}
                                                        onValueChange={(value) =>
                                                            handleStatusChange(request._id, value as RequestStatus)
                                                        }
                                                        disabled={updatingId === request._id}
                                                    >
                                                        <SelectTrigger className="w-32">
                                                            <SelectValue>
                                                                <Badge className={statusColors[request.status]}>
                                                                    {request.status}
                                                                </Badge>
                                                            </SelectValue>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="active">Active</SelectItem>
                                                            <SelectItem value="pending">Pending</SelectItem>
                                                            <SelectItem value="fulfilled">Fulfilled</SelectItem>
                                                        </SelectContent>
                                                    </Select>
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
        </div>
    );
};

export default DemoRequests;