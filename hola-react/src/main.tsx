import {
  createRoot,
} from 'react-dom/client';

import './index.css';

import App from './App';

const contenedor =
  document.getElementById(
    'root',
  )!;

const raiz =
  createRoot(
    contenedor,
  );

raiz.render(
  <App />,
);