import { createGlobalStyle, css } from "styled-components";

import { NormalizeCSS } from "./NormalizeCSS";
import { CustomStyles } from "./CustomStyles";

export const GlobalStyle = createGlobalStyle`
${NormalizeCSS}
${CustomStyles}
`;
