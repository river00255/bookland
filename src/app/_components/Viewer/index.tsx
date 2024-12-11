import DOMPurify from 'dompurify';

const Viewer = ({
  content,
  ...props
}: {
  content: string;
  [property: string]: any;
}) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      {...props}
      style={{ color: '#525252' }}
    />
  );
};

export default Viewer;
