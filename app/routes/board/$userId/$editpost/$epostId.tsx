import { editContentsState } from '@/atoms';
import { Page } from '@/components/Layout';
import { getUser, loaderCommonInit } from '@/lib/loaderCommon';
import { Alert, AlertTitle, Button, Skeleton } from '@mui/material';
import { DataFunctionArgs, json } from '@remix-run/node';
import { useNavigate, useParams } from '@remix-run/react';
import axios from 'axios';
import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { useHydrated } from 'remix-utils';

const TextEditor = React.lazy(() => import('@/components/board/TextEditor'));

export const loader = async ({ request }: DataFunctionArgs) => {
  try {
    const result = await loaderCommonInit(request);
    if (result !== null) return result;
    const user = await getUser(request);
    return { user };
  } catch (err) {
    console.error(err);
  }
  return json(null);
};

const EditPost = () => {
  const editData = useRecoilValue(editContentsState);
  const [contents, setContents] = useState({
    title: `${editData?.title}`,
    content: `${editData?.content}`
  });
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);

  const isHydrated = useHydrated();
  const navigate = useNavigate();
  const { epostId } = useParams();
  const { t } = useTranslation('boardList');

  const handleEdit = async () => {
    if (contents.title !== '' && contents.content !== '') {
      await axios
        .put(`/api/board/update/${epostId}`, {
          title: contents.title,
          content: contents.content
        })
        .then(res => {
          if (res.status === 200) {
            setContents({ title: '', content: '' });
            setError(false);
            setShowAlert(true);
            setTimeout(() => navigate('/board'), 1000);
          }
        })
        .catch(err => console.log(err));
    } else {
      setError(true);
      setShowAlert(true);
    }
  };

  return (
    <Page>
      <Suspense>
        {isHydrated ? (
          <TextEditor setContents={setContents} contents={contents} setShowAlert={setShowAlert} />
        ) : (
          <Skeleton />
        )}
      </Suspense>
      <Button sx={{ mt: 1 }} variant="contained" onClick={handleEdit}>
        {t('create')}
      </Button>
      {showAlert && (
        <Alert severity={error ? 'error' : 'success'} onClose={() => setShowAlert(false)}>
          <AlertTitle>{error ? `${t('fail')}` : `${t('success')}`}</AlertTitle>
          {error ? `${t('failMessage')}` : `${t('successMessage')}`}
        </Alert>
      )}
    </Page>
  );
};

export default EditPost;
