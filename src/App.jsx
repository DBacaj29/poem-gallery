import { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { AnimatePresence, motion } from 'framer-motion';
import Spinner from './components/Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('./pages/Home'));
const NewPoemForm = lazy(() => import('./pages/NewPoemForm'));
const PoemDetail = lazy(() => import('./pages/PoemDetail'));

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLang, setFilterLang] = useState('all');
  const location = useLocation();
  return (
    
    <div>
      <Header onSearch={setSearchTerm} onFilter={setFilterLang} />
      <ToastContainer position="bottom-right" />
      <AnimatePresence mode='wait'>
        <Suspense fallback={<Spinner />}>
          <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                <Home searchTerm={searchTerm} filterLang={filterLang} />
              </motion.div>
            }/>
              <Route path="/add" element={
                                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                <NewPoemForm />
                </motion.div>
              }/>

              <Route path="/poem/:id" element={
                                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                <PoemDetail />
                </motion.div>} />
          </Routes>
        </Suspense>
        </AnimatePresence>
    </div>
  );
};
export default App;
