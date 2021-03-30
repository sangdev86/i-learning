import swal from "sweetalert";

export const correct = (title, text) => {
  swal({
    title: title,
    text: text,
    icon: "success",
    button: false,
  });
};

export const inCorrect = () => {
  swal({
    title: "Wrong!",
    text: "Try Again",
    icon: "error",
    button: false,
  });
};

export const inCorrect2 = (text) => {
  swal({
    title: "Wrong!",
    text: text,
    icon: "error",
    button: false,
  });
};
