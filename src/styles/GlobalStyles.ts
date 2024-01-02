import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
}

ol,
ul {
  list-style: none;
}

input,
select {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
  &:focus-visible {
    outline-color: black;
  }
}

button {
  margin: 0;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
}

input,
textarea {
  background: none;

  &:focus {
    outline: none;
  }
}

* {
  font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  color: #212529;
  box-sizing: border-box;
}
`;

export default GlobalStyles;
