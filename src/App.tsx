import { Routes, Route, Navigate } from 'react-router-dom';
import ListRosters from './routes/ListRosters';
import RosterBuilder from './routes/RosterBuilder';
import PageNotFound from './routes/PageNotFound';
import { PATHS } from './utils/constants';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className='app'>
      <Header />
      <main className='main-content'>
        <Routes>
          <Route path={PATHS.BASE.value} element={<Navigate to={PATHS.CREATE.value} />} />
          <Route path={PATHS.LIST.value} element={<ListRosters />} />
          <Route path={PATHS.EDIT.value} element={<RosterBuilder />} />
          <Route path={PATHS.CREATE.value} element={<RosterBuilder />} />
          <Route path={PATHS.ERROR.value} element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}