import { css } from "styled-components";

export const CustomStyles = css`
  :root {
    --primary-font: "Roboto", sans-serif;
    --secondary-font: "Open Sans", sans-serif;
    --mobile-bp: 360px;
    --tablet-bp: 760px;
    --desktop-bp: 1280px;
    --desktop-lg: 1440px;
    --desktop-hd: 1920px;
  }

  html,
  body {
    font-size: 16px;
    font-family: var(----primary-font, "Roboto", sans-serif);
  }
`;
