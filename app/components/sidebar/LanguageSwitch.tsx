'use client';
import { Menu, MenuButtonProps, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const langIcon = (
  <svg
    viewBox='0 0 24 24'
    focusable='false'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'>
    <path d='M0 0h24v24H0z' fill='none' />
    <path
      d='M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z '
      className='css-c4d79v'
    />
  </svg>
);

const LANG_MAP = {
  en: {
    label: 'English',
    icon: '🇺🇸',
  },
  zh: {
    label: '中文',
    icon: '🇨🇳',
  },
} as const;

const LanguageSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { query, locale } = usePathname();
  const { t, i18n } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState([i18n.language]);
  // 切换语言事件
  const handleChangeLanguage = (key: string) => {
    setSelectedKeys([key]);
    i18n.changeLanguage(key);
  };

  return (
    <div className=''>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'>
            {langIcon}
            <AiOutlineCaretDown
              className='-mr-1 ml-2 h-5 w-5 '
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'>
          <Menu.Items className='absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
            {Object.entries(LANG_MAP).map(([key, lang]) => (
              <div className='px-1 py-1 ' key={key}>
                <Menu.Item
                  key={key}
                  {...(key === locale ? { bg: 'A7Gray.200' } : {})}>
                  <div
                    onClick={(key) => handleChangeLanguage(key)}
                    className={`${'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-gray-300`}>
                    {lang.icon} {lang.label}
                  </div>
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LanguageSwitch;
