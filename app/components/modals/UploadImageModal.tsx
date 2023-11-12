'use client';

import { ReactElement, useRef, useState } from 'react';
import Image from 'next/image';
import Modal from '../modals/Modal';
import Button from '../Button';

import useConversation from '@/app/hooks/useConversation';

interface UploadImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onConfirm: (filename: any) => void;
}
const UploadImageModal: React.FC<UploadImageModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const imageInputRef = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<
    ArrayBuffer | string
  >();
  const { conversationId } = useConversation();
  const [isShowImg, setShowImg] = useState(false);
  const [filename, setFile] = useState<Blob>();

  const imagechange = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      reader.result && setImagePreviewUrl(reader.result);
      setShowImg(true);
    };
    setFile(file);
    reader.readAsDataURL(file);
  };

  const repeatUpload = () => {
    setShowImg(false);
  };
  const confirmImage = () => {
    console.log('filename', filename);
    onConfirm(filename);
    onClose();
    setShowImg(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2>上传图片</h2>
        </div>
        <div className='mb-10 flex flex-col items-center'>
          {/* 选择图片展示 */}

          <div>
            <label
              style={{
                color: '#1890FF',
                border: '1px dashed #1890FF',
                padding: '3px 10px ',
              }}
              htmlFor='avatarFor'>
              {!isShowImg ? (
                '+点击上传图片'
              ) : (
                <Image
                  className='object-cover'
                  // fill
                  alt='Image'
                  src={imagePreviewUrl as string}
                  width={400}
                  height={400}
                />
              )}
            </label>
            <input
              type='file'
              id='avatarFor'
              accept='.jpg, .png'
              ref={imageInputRef}
              onChange={imagechange}
              style={{ display: 'none' }}
            />
            <div className='flex w-full mt-10 justify-center space-x-2'>
              <Button secondary onClick={repeatUpload}>
                重新上传
              </Button>
              <Button onClick={confirmImage}>确认</Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default UploadImageModal;
