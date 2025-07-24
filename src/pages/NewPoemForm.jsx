import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePoems } from '../context/PoemsContext';
import TypographySettings from '../components/TypographySettings';

const NewPoemForm = () => {
  const { addPoem } = usePoems();
  const navigate = useNavigate();
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('en');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typography, setTypography] = useState({
    fontFamily: 'Georgia, serif',
    fontSize: '1rem',
    titleSize: '1.5rem',
    color: '#000000',
    textAlign: 'left'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newPoem = {
      author,
      title,
      language,
      text,
      typography,
      dateCreated: new Date().toISOString()
    };
    
    try {
      await addPoem(newPoem);
      navigate('/', { state: { poemAdded: true } });
    } finally {
      setIsSubmitting(false);
    }
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
    <>
      <form onSubmit={handleSubmit} className="form">
        <h2>New Poem</h2>

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="form-input"
          required
        />
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="form-input"
        >
          <option value="en">English</option>
          <option value="fa">فارسی</option>
          <option value="sq">Shqip</option>
          <option value="sv">Svenska</option>
        </select>
        <textarea
          placeholder="Write your poem..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={8}
          style={poemStyle}
          className="form-textarea"
          required
        />

        <TypographySettings settings={typography} onChange={setTypography} />
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="inline-flex items-center">
              <span className="ml-2">Saving...</span>
            </div>
          ) : (
            'Submit Poem'
          )}
        </button>
      </form>
    </>
  );
};

export default NewPoemForm;