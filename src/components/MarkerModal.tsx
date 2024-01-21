import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
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

const MarkerModal: React.FC<MarkerModalProps> = ({ order, onClose }) => {
  return (
    <AlertDialog> 
    <AlertDialogContent> {/* Directly use AlertDialogContent */}
      <AlertDialogHeader>
        <AlertDialogTitle>{order.username}'s Order</AlertDialogTitle>
        {/* You can customize the description based on your order data */}
        <AlertDialogDescription>
          Round: {order.round}, Slim: {order.slim}, Total: {order.total}
        </AlertDialogDescription>
      </AlertDialogHeader>
      {/* Footer is removed for direct content display */}
    </AlertDialogContent>
    </AlertDialog>
  );
};

export default MarkerModal