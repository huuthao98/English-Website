import { toast } from "sonner";

type ServerError = {
  response?: {
    data?: {
      message?: string | string[];
      statusCode?: number;
    };
    status?: number;
  };
  message?: string;
};

export const handleServerError = (
  error: unknown,
  fallbackMessage = "Something went wrong!"
) => {
  const err = error as ServerError;

  const serverMessage =
    typeof err?.response?.data?.message === "string"
      ? err.response.data.message
      : Array.isArray(err?.response?.data?.message)
      ? err.response.data.message.join(", ")
      : err.message;

  const messageToShow = serverMessage || fallbackMessage;

  toast.error(messageToShow);

};
