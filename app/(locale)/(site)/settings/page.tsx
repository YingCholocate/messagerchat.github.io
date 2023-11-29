import EmptyState from '@/app/components/EmptyState';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';

import LanguageSwitch from '@/app/components/sidebar/LanguageSwitch';
import Sidebar from '@/app/components/sidebar/Sidebar';
import React from 'react';

export default function page() {
  return (
    <Sidebar>
      <div className='h-full'>
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
        dark:bg-gray-900
        dark:text-gray-100
      '>
          <div className='px-5'>
            <div className='flex-col'>
              <div
                className='
              text-2xl 
              font-bold 
              text-neutral-800 
              dark:text-gray-100
              py-4
            '>
                Settings
              </div>
            </div>
            <div className='flex justify-between items-center mt-4 mb-4'>
              <p> 语言选择</p>
              <LanguageSwitch />
            </div>
            <div className='flex justify-between items-center mt-4 mb-4'>
              <p> 深色/浅色模式</p>
              <ThemeSwitcher />
              {/* <DarkModeSwitch /> */}
            </div>
          </div>
        </aside>

        <div className='hidden lg:block lg:pl-80 h-full'>
          <EmptyState />
        </div>
      </div>
    </Sidebar>
  );
}
