import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  autoClose?: number; // milliseconds
}

export const AlertDialogComponent: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  message,
  type = 'info',
  onClose,
  autoClose
}) => {
  useEffect(() => {
    if (open && autoClose) {
      const timer = setTimeout(() => {
        onOpenChange(false);
        onClose?.();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [open, autoClose, onOpenChange, onClose]);

  const handleClose = () => {
    onOpenChange(false);
    onClose?.();
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertVariant = () => {
    return type === 'error' ? 'destructive' : 'default';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>
        <div className="py-4">
          <Alert variant={getAlertVariant()}>
            {getIcon()}
            <AlertDescription className="ml-7">
              {message}
            </AlertDescription>
          </Alert>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleClose}>OK</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Hook for using alert dialogs
export const useAlertDialog = () => {
  const [state, setState] = useState<{
    open: boolean;
    title?: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    onClose?: () => void;
    autoClose?: number;
  }>({
    open: false,
    message: '',
  });

  const alert = (params: {
    message: string;
    title?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    autoClose?: number;
  }) => {
    return new Promise<void>((resolve) => {
      setState({
        ...params,
        open: true,
        onClose: () => {
          resolve();
        },
      });
    });
  };

  const AlertDialogComponentWrapper = () => (
    <AlertDialogComponent
      {...state}
      onOpenChange={(open) => setState(prev => ({ ...prev, open }))}
    />
  );

  return { alert, AlertDialogComponent: AlertDialogComponentWrapper };
};
