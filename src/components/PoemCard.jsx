import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { memo } from 'react';

const MotionLink = motion.create(Link);

const DEFAULT_TYPOGRAPHY = {
  fontFamily: 'Quicksand, serif',
  fontSize: '1rem',
  color: '#000000',
  textAlign: 'left',
  shadowOffsetX: '2px',
  shadowOffsetY: '2px',
  shadowBlur: '5px',
  shadowColor: 'rgba(0, 0, 0, 0.3)',
};

const PoemCard = ({ poem }) => {
  const typography = poem.typography || DEFAULT_TYPOGRAPHY;
  const {
    fontFamily,
    fontSize,
    color,
    textAlign,
    shadowOffsetX,
    shadowOffsetY,
    shadowBlur,
    shadowColor,
  } = typography;

  const style = {
    '--shadow-offset-x': shadowOffsetX,
    '--shadow-offset-y': shadowOffsetY,
    '--shadow-blur': shadowBlur,
    '--shadow-color': shadowColor,
    fontFamily,
    fontSize,
    color,
    textAlign,
    whiteSpace: 'pre-wrap',
  };

  return (
<MotionLink
  to={`/poem/${poem.id}`}
  className="poem-card"
  layoutId={`poem-${poem.id}`}
  style={{ cursor: 'pointer', ...style }}
  whileHover={{ scale: 1.1, stiffness: 100}}
  transition={{ type: 'smooth', stiffness: 500 }}
>
  <div className="content">
    <h3 className="card-title">{poem.title}</h3>
  </div>
</MotionLink>

  );
};

export default memo(PoemCard, (prevProps, nextProps) => {
  return prevProps.poem.id === nextProps.poem.id && 
         prevProps.poem.title === nextProps.poem.title;
});
