import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './componentes/Layout.tsx';
import { NoEncontrado } from './componentes/NoEncontrado.tsx';
import { PaginaClase } from './paginas/PaginaClase.tsx';
import { PaginaClases } from './paginas/PaginaClases.tsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clases" replace />} />

        <Route path="clases">
          <Route index element={<PaginaClases />} />
          <Route path=":id" element={<PaginaClase />} />
        </Route>

        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default App;
