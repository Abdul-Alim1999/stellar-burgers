import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedPage: FC<
  PropsWithChildren<{ isAuthenticated: boolean }>
> = ({ children, isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [navigate, isAuthenticated]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};
