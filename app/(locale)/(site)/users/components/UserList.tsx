'use client';

import { User } from '@prisma/client';

import UserBox from './UserBox';
import { useTranslation } from 'next-i18next';
import { GetStaticPaths } from 'next';

interface UserListProps {
  items: User[];
}
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

const UserList: React.FC<UserListProps> = ({ items }) => {
  const { t } = useTranslation();
  console.log('t', t, t('title.person'));
  return (
    <aside
      className='
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
        dark:text-white
        dark:bg-gray-900
      '>
      <div className='px-5'>
        <div className='flex-col'>
          <div
            className='
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
              dark:text-white
        
            '>
            {t('title.person')}
          </div>
        </div>
        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
