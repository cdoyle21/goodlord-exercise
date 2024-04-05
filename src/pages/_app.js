import { Arimo } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';

const arimo = Arimo({
  variable: '--font-arimo',
  subsets: ['latin'],
});

const GlobalStyle = createGlobalStyle`
html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
/* When mouse is detected, ALL focused elements have outline removed. */
body.using-mouse :focus {
  outline: none;
}

* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}
a {
  text-decoration: none;
  color: #582f7e;
  font-family: var(--font-arimo, 'Arimo', Helvetica);
  font-weight: 700;
  font-size: 12px;
}

h1,
h2,
h3 {
  padding: 0px;
  margin: 0px;
  color: #582f7e;
  font-family: var(--font-arimo, 'Arimo', Helvetica);
}

p,
span {
  font-family: var(--font-arimo, 'Arimo', Helvetica);
  font-size: 12px;
  line-height: 24px;
}

img {
  max-width: 100%;
  height: auto;
}
`;

const App = ({ Component, pageProps }) => {
  return (
    <main className={`${arimo.variable}`}>
      <GlobalStyle />
      <Component {...pageProps} />
    </main>
  );
};

export default App;
