import localFont from "next/font/local";

const font = localFont({
  src: [
    {
      path: "./e-Ukraine/e-Ukraine-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./e-Ukraine/e-Ukraine-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./e-Ukraine/e-Ukraine-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./e-Ukraine/e-Ukraine-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./e-Ukraine/e-Ukraine-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./e-Ukraine/e-Ukraine-UltraLight.otf",
      weight: "100",
      style: "normal",
    },
  ],
});

export { font };
