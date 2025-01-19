import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserState } from '../../services/user/slice';

export const AppHeader: FC = () => {
    const userName = useSelector(getUserState);

    return <AppHeaderUI userName={userName?.name} />;
}
