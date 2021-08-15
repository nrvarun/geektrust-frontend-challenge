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
    --primary-color: #01ade5;
    --danger-color: #b61919;
  }

  html,
  body {
    font-size: 16px;
    font-family: var(----primary-font, "Roboto", sans-serif);
  }

  * {
    box-sizing: border-box;
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;
