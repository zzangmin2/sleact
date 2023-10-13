import { useCallback, useState } from 'react';

const useInput = (initalData) => {
  const [value, setValue] = useState(initalData);

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
