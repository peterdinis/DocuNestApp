import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";

const DashboardActivites: FC = () => {
    const { toast } = useToast();

    // Fake data for notifications
    const notifications = [
        {
            id: "1",
            title: "New message",
            message: "You have received a new message from John.",
            createdAt: new Date().toISOString(),
        },
        {
            id: "2",
            title: "System update",
            message: "The system has been updated to the latest version.",
            createdAt: new Date().toISOString(),
        },
        {
            id: "3",
            title: "Reminder",
            message: "Don't forget to complete your tasks for today.",
            createdAt: new Date().toISOString(),
        },
    ];

    // Fake delete handler
    const handleDelete = (id: string) => {
        toast({
            title: "Notification Deleted",
            className: "bg-red-800 text-white font-bold",
            description: `Notification with ID ${id} has been deleted.`,
        });
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <AnimatePresence>
                        {notifications.map((notification) => (
                            <motion.li
                                key={notification.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <p className="text-sm font-medium">
                                            {notification.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(notification.id)}
                                    className="text-red-500 hover:text-red-700"
                                    aria-label="Delete notification"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            </CardContent>
        </Card>
    );
};

export default DashboardActivites;
