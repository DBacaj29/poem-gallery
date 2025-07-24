import { AnimatePresence, motion } from 'framer-motion';
import PoemCard from './PoemCard';
import Spinner from './Spinner';
import { usePoems } from '../context/PoemsContext';

const PoemGallery = ({ poems }) => {
    const { isLoading } = usePoems();

  if (isLoading) return <Spinner />;
  return (
    <div className="poem-gallery">
      
      <AnimatePresence mode="sync">
        {poems.map((poem) => (
          <motion.div
            key={poem.id}
            layout
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <PoemCard poem={poem} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};


export default PoemGallery;
