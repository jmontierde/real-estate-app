import { toast } from "react-toastify";

export const useSuccess = (message: string) => {
  toast.success(message);
};

export const useError = (message: string) => {
  toast.error(message);
};

export const usePending = (message: string) => {
  toast(message);
};
