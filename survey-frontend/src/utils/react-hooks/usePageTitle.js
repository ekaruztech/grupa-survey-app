import { useEffect } from 'react';

export default title => {
  useEffect(() => {
    document.title = title;
    return () => (document.title = '');
  }, [title]);
};
