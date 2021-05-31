import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`


* {
    margin:0;
    padding:0;
    box-sizing:border-box;
}
html {
   /* width */
   &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #a5a5a5;
  }
}
body {
    font-family: 'Montserrat', sans-serif;
    width:100%;
}
h2 {
    font-size:4rem;
    font-family: 'SEGA LOGO FONT', cursive;
    font-weight: 400;
    color:red;
}
h3 {
    font-size: 1.3rem;
    color:#333;
    padding: 1.5rem 0;
   
}
p {
    font-size: 1.2rem;
    line-height:2;
    color: #696969;
}
a {
    text-decoration: none;
    color: #333
}
img {
  display:block;
}

`;

export default GlobalStyles;
