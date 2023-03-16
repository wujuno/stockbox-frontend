import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

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
  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setContents({
      ...contents,
      [name]: value
    });
  };
  return (
    <Wrapper>
      <TextField sx={{ mb: 1 }} type="text" fullWidth placeholder="제목을 작성해주세요." onChange={getTitle} name="title" />
      <CKEditor
        editor={ClassicEditor}
        data=""
        onChange={(event, editor) => {
          const data = editor.getData();
          setContents({
            ...contents,
            content: data
          });
        }}
        config={{ removePlugins: ['CKFinder', 'Image'] }}
      />
      <Button sx={{ mt: 1 }} variant="contained" onClick={() => console.log(contents)}>
        등록하기
      </Button>
    </Wrapper>
  );
};

export default TextEditor;
