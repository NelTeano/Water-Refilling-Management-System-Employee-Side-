import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface MarkerModalProps {
    order: {
      username: string;
      round: number;
      slim: number;
      total: number;
      // Add more properties as needed
    };
    onClose: () => void;
  }
const MarkerModal : React.FC<MarkerModalProps> = ({ order, onClose }) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{order.username}'s Order</AlertDialogTitle>
            {/* You can customize the description based on your order data */}
            <AlertDialogDescription>
              Round: {order.round}, Slim: {order.slim}, Total: {order.total}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MarkerModal;
