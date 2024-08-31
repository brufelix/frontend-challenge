import { toast as toastify } from "react-toastify";

type Options = {
  autoClose?: number;
  className?: React.ComponentProps<"div">["className"];
  bodyClassName?: React.ComponentProps<"div">["className"];
  position?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
  hideProgressBar?: boolean;
  type?: "default" | "warning" | "info" | "success" | "error";
};
export const notify = (message: string, options: Options) => {
  const opt = Object.assign({ position: "top-right" }, options);

  return toastify(message, opt);
};
