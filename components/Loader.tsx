import React, { FC } from 'react';
import { Transition } from '@headlessui/react';

const Loader = () => {
  return (
    <Transition
      show={true}
      enter="transition ease-out duration-450"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-350"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed w-screen flex items-center justify-center -z-999">
        <div className="w-16 h-16 border-t-4 border-gray-400 rounded-full animate-spin">
          {null}
        </div>
      </div>
    </Transition>
  );
};

export default Loader;
