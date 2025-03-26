import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
  onClose: () => void;
}

export function Toast({ title, description, variant = 'default', onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm';
  const variantClasses = variant === 'destructive'
    ? 'bg-red-600 text-white'
    : 'bg-white text-gray-900 border border-gray-200';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`${baseClasses} ${variantClasses}`}
        >
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm mt-1">{description}</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ToastContainer({ toasts }: { toasts: any[] }) {
  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
      {toasts.map((toast, index) => (
        <Toast key={index} {...toast} onClose={() => {}} />
      ))}
    </div>
  );
} 