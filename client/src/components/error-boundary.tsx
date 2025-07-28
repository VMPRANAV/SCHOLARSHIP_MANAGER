import React from 'react';
import type { ToastProps, ToastActionElement } from "@/components/ui/toast"; // Import ToastProps and ToastActionElement

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Re-define ToasterToast as it's not exported from use-toast.ts
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Define the type for the argument passed to the main toast function
type ToastArgumentType = Omit<ToasterToast, "id">;

interface ErrorBoundaryProps {
  children: React.ReactNode;
  toast: { // Define the shape of the toast prop
    toast: ({ ...props }: ToastArgumentType) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void; };
    dismiss: (toastId?: string | undefined) => void;
    toasts: ToasterToast[];
  };
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.props.toast.toast({
      title: 'Application Error',
      description: 'Something went wrong. Please refresh the page.',
      variant: 'destructive',
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Something went wrong
            </h1>
            <p className="text-slate-600 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-education-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 