import { useState,useEffect ,useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePoems } from '../context/PoemsContext';
import TypographySettings from '../components/TypographySettings';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

const DEFAULT_TYPOGRAPHY = {
  fontFamily: 'Quicksand, serif',
  fontSize: '1rem',
  titleSize: '1.5rem',
  color: '#000000',
  textAlign: 'left',
  shadowOffsetX: '2px',
  shadowOffsetY: '2px',
  shadowBlur: '5px',
  shadowColor: 'rgba(0, 0, 0, 0.3)',
};
  const PoemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { poems, deletePoem, updatePoem } = usePoems();
    const poem = poems.find(p => p.id === Number(id));
    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState(poem ? { ...poem } : {});
    const poemRef = useRef();
    const buttonGroupRef = useRef();

    useEffect(() => {
      if (poem) setEdited({ ...poem });
    }, [poem]);

    if (!poem) {
      return (
        <div className="poem-detail">
          <div className="detail-content">
            <p style={{ padding: "2rem", textAlign: "center" }}>loading...</p>
          </div>
        </div>
  );
}
    const typography = isEditing ? edited.typography || DEFAULT_TYPOGRAPHY : poem.typography || DEFAULT_TYPOGRAPHY;
    const {
      fontFamily,
      fontSize,
      titleSize,
      color,
      textAlign,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      shadowColor,
    } = typography;

    const iconStyle = {
      paddingBottom: '20px', 
      imageResolution: '1px 1px',
    }
const handleSave = async (e) => {
  e.preventDefault();
  try {
    await updatePoem(edited);
    setIsEditing(false);
    
    toast.success('Poem updated successfully!');
  } catch (error) {
    toast.error('Failed to update poem');
  }
};


    const sharedStyle = {
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

    const handleDownloadImage = () => {
        if (buttonGroupRef.current) {
             buttonGroupRef.current.style.display = 'none';
      }

        if (!poem) return;

        html2canvas(poemRef.current, {
          useCORS: true,
          backgroundColor: null,
          scale: 2,
        }).then((canvas) => {
          if (buttonGroupRef.current) {
                buttonGroupRef.current.style.display = '';
          }
          const link = document.createElement('a');
          link.download = `${poem.title || 'poem'}.png`;
          link.href = canvas.toDataURL();
          link.click();
      }
    );
  };

  const poemStyle = {
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  color: typography.color,
  textAlign: typography.textAlign,
  fontWeight: typography.bold ? 'bold' : 'normal',
  fontStyle: typography.italic ? 'italic' : 'normal',
};

    return (
      <div className="poem-detail">
        <motion.div 
        className="detail-content"
        ref={poemRef}
        id='poem-content'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}>
          
          {isEditing ? (
            <>
              <input
                type="text"
                value={edited.title}
                onChange={e => setEdited({ ...edited, title: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                value={edited.author}
                onChange={e => setEdited({ ...edited, author: e.target.value })}
                className="form-input"
              />
              <textarea
                rows={8}
                value={edited.text}
                onChange={e => setEdited({ ...edited, text: e.target.value })}
                style={poemStyle}
                className="form-textarea"
              />
              <TypographySettings
                settings={edited.typography || DEFAULT_TYPOGRAPHY}
                onChange={newSettings => setEdited({ ...edited, typography: newSettings })}
              />
              <div className="button-group">
                <button type='button' onClick={handleSave} className="btn-save">Save</button>
                <button type='button' onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div 
              className="poem" 
              style={sharedStyle}
              >
                <motion.h1
                className="poem-title text-shadow"
                style={{ fontSize: titleSize}}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                >
                      <i className='bi bi-quote' style={iconStyle}></i>
                      <span>{poem.title}</span>
                      <i className='bi bi-quote' style={iconStyle}></i>
                </motion.h1>

                <motion.div 
                className="poem-text text-shadow"
                style={sharedStyle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 1.3 }}
                >
                        {poem.text}
                </motion.div>

                <p className="poem-meta">Written by {poem.author} • {new Date(poem.dateCreated).toLocaleString()}</p>
              </div>

              <div className="button-group" ref={buttonGroupRef}>
                <button
                type='button'
                  onClick={() => navigate(-1)} className="back-button"
                    ><i className="bi bi-chevron-left"></i> </button>

                <button type='button' onClick={() => setIsEditing(true)} className="btn-edit"
                    ><i className="bi bi-pen"></i></button>

                <button
                  type='button'
                  onClick={async () => {
                    await deletePoem(poem.id);
                    navigate('/'); 
                  }}
                  className="btn-delete"
                >
                  <i className="bi bi-trash"></i>
                </button>

                <button type='button' onClick={handleDownloadImage} className="btn-download"
                    ><i className="bi bi-download"></i>
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    );
  };

export default PoemDetail;
