import { motion } from 'framer-motion';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <motion.div
        className="w-12 h-12 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}