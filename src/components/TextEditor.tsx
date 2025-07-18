import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import type TextEditorInterface from '../types/TextEditorInterface';

export default function TextEditor({
  title,
  name,
  onChange,
  value,
  error
}: TextEditorInterface) {
    return (
      <div>
          <label htmlFor={name} className="label">
            {title}:
          </label>

          <ReactQuill id={name} value={value} onChange={onChange} className={error && 'border border-red-600'} />

          {error && <div className="text-red-600 text-sm">{error}</div>}
      </div>
    )
}
