'use client';

import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import useConversation from '@/app/hooks/useConversation';
import UploadImageModal from '@/app/components/modals/UploadImageModal';
import { useState } from 'react';

const Form = () => {
  const { conversationId } = useConversation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
    });
  };
  const uploadImage = (filename: Blob) => {
    const formData = new FormData();
    console.log('one------');
    // formData.append('file',value);
    formData.append('filename', filename as Blob);
    axios({
      url: '/api/upload',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=----WebKitFormBoundaryVCFSAonTuDbVCoAN',
      },
    })
      .then(async (res) => {
        if (res.data.success) {
          setIsModalOpen(false);
        }

        axios.post('/api/messages', {
          image: res.data.path,
          conversationId: conversationId,
        });
      })
      .catch((e) => {});
  };

  return (
    <>
      <UploadImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={uploadImage}
      />
      <div
        className='
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      '>
        <div onClick={() => setIsModalOpen(true)}>
          <HiPhoto size={30} className='text-sky-500' />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex items-center gap-2 lg:gap-4 w-full'>
          <MessageInput
            id='message'
            register={register}
            errors={errors}
            required
            placeholder='Write a message'
          />
          <button
            type='submit'
            className='
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          '>
            <HiPaperAirplane size={18} className='text-white' />
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
