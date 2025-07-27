import { useMemo } from 'react';
import { usePoems } from '../context/PoemsContext';
import PoemGallery from '../components/PoemGallery';
import Spinner from '../components/Spinner';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const Home = ({ searchTerm, filterLang }) => {
  const { poems, loading } = usePoems();
  if (loading) return <Spinner />;
  const filteredPoems = useMemo(() => {
    let filtered = poems;

    if (filterLang !== 'all') {
      filtered = filtered.filter(p => p.language === filterLang);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [poems, searchTerm, filterLang]);

  return (
  <main>
    {filteredPoems.length > 0 ? (
      <PoemGallery poems={filteredPoems} />
    ) : (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="no-poems"
      >
        {searchTerm || filterLang !== 'all' ? (
          <p>No poems match your search criteria.</p>
        ) : (
          <>
            <p>No poems to display.</p>
            <Link to="/add" className="btn-add">Create your first poem</Link>
          </>
        )}
      </motion.div>
    )}
  </main>
);
};

export default Home;
