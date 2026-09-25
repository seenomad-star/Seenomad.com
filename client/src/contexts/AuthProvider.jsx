/**
 * Boots auth session on mount. Wrap the app once in main.jsx.
 */
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function AuthProvider({ children }) {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    init();
  }, [init]);

  return children;
}

export default AuthProvider;
