import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from '@emotion/styled';
import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from '@remix-run/react';

const Wrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    height: 450px;
  }
`;

const TextEditor = () => {
  const [contents, setContents] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAlert(false);
    const { name, value } = event.currentTarget;
    setContents({
      ...contents,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (contents.title !== '' && contents.content !== '') {
      await axios
        .post('/api/board/create', {
          title: contents.title,
          content: contents.content
        })
        .then(res => {
          if (res.status === 201) {
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
    <Wrapper>
      <TextField sx={{ mb: 1 }} type="text" fullWidth placeholder="제목을 작성해주세요." onChange={getTitle} name="title" />
      <CKEditor
        editor={ClassicEditor}
        data=""
        onChange={(event, editor) => {
          setShowAlert(false);
          const data = editor.getData();
          setContents({
            ...contents,
            content: data
          });
        }}
        config={{ removePlugins: ['CKFinder', 'Image'] }}
      />
      <Button sx={{ mt: 1 }} variant="contained" onClick={handleSubmit}>
        등록하기
      </Button>
      {showAlert && (
        <Alert severity={error ? 'error' : 'success'} onClose={() => setShowAlert(false)}>
          <AlertTitle>{error ? '실패!' : '성공!'}</AlertTitle>
          {error ? '제목과 내용을 입력해주세요.' : '게시물을 등록했습니다!'}
        </Alert>
      )}
    </Wrapper>
  );
};

export default TextEditor;
