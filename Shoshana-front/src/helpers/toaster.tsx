import { toast } from "react-toastify";

const dftStyle = {
  padding: 10,
  textAlign: "center",
};

class Toaster {
  private static instance: Toaster;

  private constructor() {}

  public static getInstance(): Toaster {
    if (!Toaster.instance) {
      Toaster.instance = new Toaster();
    }

    return Toaster.instance;
  }

  public authError(err: string): void {
    toast.error(err, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      style: {
        textAlign: "center",
        padding: 10,
        color: "#444",
        border: "1px solid red",
      },
    });
  }

  public info(msg: string): void {
    toast.info(msg, {
      autoClose: 2000,
      style: {
        textAlign: "center",
        padding: 10,
      },
    });
  }

  public success(msg: string): void {
    toast.success(msg, {
      autoClose: 1500,
      style: {
        textAlign: "center",
        padding: 10,
      },
    });
  }
}

export default Toaster.getInstance();
