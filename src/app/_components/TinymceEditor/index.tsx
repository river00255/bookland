'use client';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { ChangeEvent, MutableRefObject, useRef } from 'react';
import imageCompression from 'browser-image-compression';

const compressOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

const compressImage = async (file: File) => {
  try {
    const compressedFile = await imageCompression(file, compressOptions);
    return compressedFile;
  } catch (e) {
    console.log(e);
  }
};

const TinymceEditor = ({
  editorRef,
  initialValue,
}: {
  editorRef: MutableRefObject<TinyMCEEditor | null>;
  initialValue?: string;
}) => {
  const uploadImage = (
    callback: (value: string, meta?: Record<string, any>) => void,
    value: string,
    meta: Record<string, any>
  ) => {
    if (meta.filetype == 'image') {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.addEventListener('change', async (e: Event | ChangeEvent) => {
        const file = ((e.target as HTMLInputElement).files as FileList)[0];
        if (file) {
          const compressedImage = await compressImage(file);
          if (compressedImage) {
            const url = URL.createObjectURL(compressedImage);
            return callback(url, { alt: file.name });
          }
        }
      });
      return callback('', { alt: '' });
    }
  };

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      initialValue={initialValue ? initialValue : ''}
      init={{
        height: 500,
        menubar: false,
        plugins: ['link', 'image'],
        file_picker_types: 'image',
        file_picker_callback: uploadImage,
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'image link',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        placeholder: '내용을 입력하세요.',
      }}
    />
  );
};

export default TinymceEditor;
