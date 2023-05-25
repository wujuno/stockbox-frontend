import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { editContentsState } from '@/atoms';

interface IContentsProps {
  title: string;
  content: string;
}
interface ITextEditorProps {
  setContents: (args: IContentsProps) => void;
  contents: IContentsProps;
  setShowAlert: (showAlert: boolean) => void;
}

const Wrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    height: 450px;
  }
`;

const TextEditor = ({ setContents, contents, setShowAlert }: ITextEditorProps) => {
  const editData = useRecoilValue(editContentsState);

  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAlert(false);
    const { name, value } = event.currentTarget;
    setContents({
      ...contents,
      [name]: value
    });
  };

  return (
    <Wrapper>
      <TextField
        sx={{ mb: 1 }}
        type="text"
        fullWidth
        placeholder="제목을 작성해주세요."
        onChange={getTitle}
        name="title"
        defaultValue={editData ? editData.title : null}
      />
      <CKEditor
        editor={ClassicEditor}
        data={editData ? editData.content : ''}
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
    </Wrapper>
  );
};

export default TextEditor;
