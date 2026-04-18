"use client";

import { toastManager } from "@/components/ui/toast";

// Helper functions to mimic sonner API
const toast = {
  success: (message: string, options?: { duration?: number }) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Success",
      description: message,
      type: "success",
    });
  },
  error: (message: string, options?: { duration?: number }) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Error",
      description: message,
      type: "error",
    });
  },
  info: (message: string, options?: { duration?: number }) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Info",
      description: message,
      type: "info",
    });
  },
  warning: (message: string, options?: { duration?: number }) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Warning",
      description: message,
      type: "warning",
    });
  },
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    },
  ) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Loading",
      description: options.loading,
      type: "loading",
    });

    promise
      .then((data) => {
        const message =
          typeof options.success === "function"
            ? options.success(data)
            : options.success;
        toastManager.add({
          id,
          title: "Success",
          description: message,
          type: "success",
        });
      })
      .catch((error) => {
        const message =
          typeof options.error === "function"
            ? options.error(error)
            : options.error;
        toastManager.add({
          id,
          title: "Error",
          description: message,
          type: "error",
        });
      });
  },
};

export { toast };
