import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { logoutApi } from '@api';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const handleLogout = () => {
    logoutApi();
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    window.location.reload();
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
