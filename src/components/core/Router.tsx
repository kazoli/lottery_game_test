import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Player from '../pages/Player';
import Operator from '../pages/Operator';
import NotFound from '../pages/NotFound';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/player" element={<Player />} />
        <Route path="/operator" element={<Operator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
