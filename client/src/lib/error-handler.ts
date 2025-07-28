import { useToast } from "@/hooks/use-toast"; // Import useToast

let toastInstance: ReturnType<typeof useToast>;

export function setGlobalToast(toast: ReturnType<typeof useToast>) {
  toastInstance = toast;
}

export function setupGlobalErrorHandling() {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    if (toastInstance) {
      toastInstance.toast({
        title: 'Network Error',
        description: 'A network request failed. Please check your connection and try again.',
        variant: 'destructive',
      });
    }
    
    event.preventDefault();
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    if (toastInstance) {
      toastInstance.toast({
        title: 'Application Error',
        description: 'An unexpected error occurred. Please refresh the page.',
        variant: 'destructive',
      });
    }
  });
} 