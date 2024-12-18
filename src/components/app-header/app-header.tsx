import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { useSelector } from '../../services';

export const AppHeader: FC = () => {
  const name = useSelector((state) => state.user.data.name);
  return <AppHeaderUI userName={name} />;
};
