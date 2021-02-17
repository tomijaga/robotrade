import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const eventToast = ({ symbol, prop, stat, level }) => {
  toast.dark(
    `✔️ Event: \t ${symbol} ${prop} ${level} ${
      prop === "CHANGE" ? stat + "%" : stat
    }`,
    toastOptions
  );
};

export default eventToast;
