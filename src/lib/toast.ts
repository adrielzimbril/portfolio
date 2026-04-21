"use client";

import { toastManager } from "@/components/ui/toast";

// Helper functions to mimic sonner API
const toast = {
  success: (message: string, options?: { timeout?: number }) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Success",
      description: message,
      type: "success",
      timeout: options?.timeout || 5000,
    });
  },
  error: (message: string, options?: { timeout?: number }) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Error",
      description: message,
      type: "error",
      timeout: options?.timeout || 5000,
    });
  },
  info: (message: string, options?: { timeout?: number }) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Info",
      description: message,
      type: "info",
      timeout: options?.timeout || 5000,
    });
  },
  warning: (message: string, options?: { timeout?: number }) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Warning",
      description: message,
      type: "warning",
      timeout: options?.timeout || 5000,
    });
  },
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
      timeout?: number;
      promiseTimeout?: number;
    },
  ) => {
    const id = Math.random().toString(36).substring(7);
    toastManager.add({
      id,
      title: "Loading",
      description: options.loading,
      type: "loading",
      timeout: options?.timeout || 5000,
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
      timeout: options?.promiseTimeout ||  options?.timeout || 5000,
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
      timeout: options?.promiseTimeout ||  options?.timeout || 5000,
        });
      });
  },
};

export { toast };
