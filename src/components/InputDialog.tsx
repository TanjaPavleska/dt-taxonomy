import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  onConfirm: (value: string) => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  required?: boolean;
}

export const InputDialog: React.FC<InputDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  placeholder,
  defaultValue = '',
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
  required = false
}) => {
  const [value, setValue] = useState(defaultValue);

  React.useEffect(() => {
    if (open) {
      setValue(defaultValue);
    }
  }, [open, defaultValue]);

  const handleConfirm = () => {
    if (required && !value.trim()) return;
    onConfirm(value);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (!required || value.trim())) {
      handleConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="input-value">Value</Label>
            <Input
              id="input-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={required && !value.trim()}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Hook for using input dialogs
export const useInputDialog = () => {
  const [state, setState] = useState<{
    open: boolean;
    title: string;
    description?: string;
    placeholder?: string;
    defaultValue?: string;
    onConfirm: (value: string) => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    required?: boolean;
  }>({
    open: false,
    title: '',
    onConfirm: () => {},
  });

  const prompt = (params: {
    title: string;
    description?: string;
    placeholder?: string;
    defaultValue?: string;
    confirmText?: string;
    cancelText?: string;
    required?: boolean;
  }) => {
    return new Promise<string | null>((resolve) => {
      setState({
        ...params,
        open: true,
        onConfirm: (value: string) => {
          resolve(value);
        },
        onCancel: () => {
          resolve(null);
        },
      });
    });
  };

  const InputDialogComponent = () => (
    <InputDialog
      {...state}
      onOpenChange={(open) => setState(prev => ({ ...prev, open }))}
    />
  );

  return { prompt, InputDialogComponent };
};
