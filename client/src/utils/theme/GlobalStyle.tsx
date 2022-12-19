import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle(
  ({ theme: { colors } }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      font-family: 'Roboto', 'Arial';
    }

    body {
      background-color: ${colors.backgroundPrimary};
      color: ${colors.fontPrimary};
      min-height: 100vh;
    }

    ul,
    li {
      list-style: none;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  `,
);
