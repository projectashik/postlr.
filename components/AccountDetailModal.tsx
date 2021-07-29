import { tokens } from '@prisma/client';
import axios from 'axios';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { showAccountDetailModelAtom } from 'states';
import styles from 'styles/ImageUpload.module.scss';
import platforms from 'utils/platforms';
import { Button } from './utils/Button';
const AccountDetailModal = ({ account }: { account: tokens }) => {
  let platform = platforms.filter((p) => {
    return account.platform === p.slug;
  });
  const [showAccountDetailModal, setShowAccountDetailModal] = useAtom(
    showAccountDetailModelAtom
  );
  const [deleteProcess, setDeleteProcess] = useState(false);

  const onDelete = async () => {
    setDeleteProcess(true);

    const deleteResponse = await axios.post('/api/DELETE/accounts', {
      id: account.id,
    });

    if (deleteResponse.data.success) {
      toast.success('Token Removed');
      setShowAccountDetailModal(false);
    } else {
      toast.error('Unable to remove');
    }

    setDeleteProcess(false);
  };
  return (
    <>
      <div className={styles.modal}>
        <div
          className={styles.backdrop}
          onClick={() => setShowAccountDetailModal(false)}
        ></div>
        <div className={styles.modalContent}>
          <div className='w-full h-full bg-white rounded p-10 flex flex-col justify-between'>
            <div>
              <h3 className='text-3xl font-black'>
                Manage {platform[0].name} account
              </h3>
              <div className='mt-4'>
                <Image
                  src={platform[0].image}
                  width={80}
                  height={80}
                  alt={platform[0].name}
                />
                <p className='text-lg'>{platform[0].name}</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={() => setShowAccountDetailModal(false)}
                className='py-2 px-4 bg-gray-300 border-2 border-gray-400 rounded'
              >
                Close
              </button>
              <Button
                onClick={onDelete}
                loading={deleteProcess}
                className='py-2 px-4 bg-red-500 text-white border-2 border-red-400 rounded'
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetailModal;
