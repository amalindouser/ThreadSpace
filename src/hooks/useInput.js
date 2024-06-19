import { useState, useCallback } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const resetValue = useCallback(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Menggunakan object destructuring di sini
  return { value, , resetValue };
}

export default useInput;
