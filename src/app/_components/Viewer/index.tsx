import DOMPurify from 'dompurify';

const Viewer = ({ content }: { content: string }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
  );
};

export default Viewer;
