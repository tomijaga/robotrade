import { ToastContainer, toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const orderToast = {
  terminated: ({ symbol, side, quantity }) => {
    toast.dark(
      `❌ Order TERMINATED: \t ${symbol} ${side} ${quantity}`,
      toastOptions
    );
  },

  filled: ({ symbol, side, quantity }) => {
    toast.dark(
      `✔️ Order FILLED: \t ${symbol} ${side} ${quantity}`,
      toastOptions
    );
  },
  partially_filled: ({ symbol, side, quantity, quantityFilled }) => {
    toast.dark(
      `🌗 Order PARTIALLY FILLED: \t ${symbol} ${side} ${
        quantityFilled / quantity
      }`,
      toastOptions
    );
  },
};
