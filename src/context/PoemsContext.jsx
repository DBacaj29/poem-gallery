import { createContext, useContext, useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;
const PoemsContext = createContext();
export const usePoems = () => useContext(PoemsContext);

export const PoemsProvider = ({ children }) => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch poems: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        setPoems(data);
      } catch (err) {
        console.error('Failed to fetch poems:', err);
        setError(err.message || 'Failed to load poems');
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const addPoem = async (newPoem) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const tempId = Date.now();
      const optimisticPoem = { 
        ...newPoem, 
        id: tempId, 
        dateCreated: new Date().toISOString() 
      };
      setPoems(prev => [optimisticPoem, ...prev]);
      
      const res = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPoem),
      });

      if (!res.ok) {
        throw new Error(`Failed to add poem: ${res.status} ${res.statusText}`);
      }

      const savedPoem = await res.json();
      
      setPoems(prev => prev.map(p => p.id === tempId ? savedPoem : p));
      return savedPoem;
    } catch (err) {
      console.error('Failed to add poem:', err);
      setPoems(prev => prev.filter(p => p.id !== tempId));
      setError(err.message || 'Failed to add poem');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePoem = async (updatedPoem) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const originalPoems = [...poems];
      setPoems(prev => prev.map(p => 
        p.id === updatedPoem.id ? { ...p, ...updatedPoem } : p
      ));
      
      const res = await fetch(`${API_BASE}/${updatedPoem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPoem),
      });

      if (!res.ok) {
        throw new Error(`Failed to update poem: ${res.status} ${res.statusText}`);
      }

      const savedPoem = await res.json();
      
      setPoems(prev => prev.map(p => 
        p.id === savedPoem.id ? savedPoem : p
      ));
      return savedPoem;
    } catch (err) {
      console.error('Failed to update poem:', err);
      setPoems(originalPoems);
      setError(err.message || 'Failed to update poem');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePoem = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const deletedPoem = poems.find(p => p.id === id);
      setPoems(prev => prev.filter(p => p.id !== id));
      
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete poem: ${res.status} ${res.statusText}`);
      }

      return true;
    } catch (err) {
      console.error('Failed to delete poem:', err);
      setPoems(prev => [...prev, deletedPoem]);
      setError(err.message || 'Failed to delete poem');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PoemsContext.Provider value={{ 
      poems, 
      isLoading,
      loading, 
      error, 
      addPoem, 
      updatePoem, 
      deletePoem 
    }}>
      {children}
    </PoemsContext.Provider>
  );
};