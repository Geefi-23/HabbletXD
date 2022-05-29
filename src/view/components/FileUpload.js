import { useRef, useState } from 'react';

const FileUpload = ({
  style,
  className,
  placeholder,
  onUpload
}) => {
  const [upload, setUpload] = useState(null);
  const uploader = useRef(null);

  const handleUpload = (files) => {

    if (files && files.length === 1) {
      onUpload(files[0]);
      setUpload(files[0]);
    }
  };

  const handleDrop = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    const { files } = evt.dataTransfer;
    
    handleUpload(files);
  };

  const handleDragOver = evt => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  return (
    <>
      <label className="w-100 mb-1" style={style}>
        <span 
          className={className}
          style={{
            borderStyle: 'dashed',
            cursor: 'pointer'
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {placeholder}
        </span>
        <input 
          style={{
            display: 'none'
          }}
          type="file" 
          ref={uploader}
          onChange={evt => handleUpload(evt.target.files)}
        />
      </label>
      {
        upload !== null ?
        <>
          <small className="d-inline-block hxd-border hxd-primary-text rounded-top px-2"
          style={{
            transform: 'translateY(1px)',
          }}>Arquivo</small>
          <div className="p-2 hxd-border rounded-bottom rounded-end">
            {upload.name}
          </div>
        </>
        :
        <></>
      }
      
    </>
  );
};

export default FileUpload;
