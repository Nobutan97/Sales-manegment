import { useState } from 'react';

interface ToastOptions {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = (options: ToastOptions) => {
    const id = Date.now();
    setToasts(prev => [...prev, options]);

    // 指定された時間後にトーストを削除
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t !== options));
    }, options.duration || 3000);
  };

  return {
    toast,
    toasts
  };
} 