import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
html, body, #root{
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
body{
  font: 16px 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased !important;
}
ul{
  list-style: none;
}
`;