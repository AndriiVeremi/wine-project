import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaHeading,
  FaQuoteRight,
  FaUndo,
  FaRedo,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from 'react-icons/fa';
import {
  StyledEditorWrapper,
  StyledToolbar,
  StyledEditorContent,
  EditorLabel,
} from './TextEditor.styled';

interface TextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ label, value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== value) {
        onChange(html);
      }
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      {label && <EditorLabel>{label}</EditorLabel>}
      <StyledEditorWrapper>
        <StyledToolbar>
          <div className="toolbar-group">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
              title="Bold"
              aria-label="Bold"
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
              title="Italic"
              aria-label="Italic"
            >
              <FaItalic />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
              title="Strikethrough"
              aria-label="Strikethrough"
            >
              <FaStrikethrough />
            </button>
          </div>

          <div className="toolbar-group">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
              title="Heading 2"
              aria-label="Heading 2"
            >
              <FaHeading style={{ fontSize: '14px' }} />
              <span style={{ fontSize: '10px', marginLeft: '2px' }}>2</span>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
              title="Heading 3"
              aria-label="Heading 3"
            >
              <FaHeading style={{ fontSize: '12px' }} />
              <span style={{ fontSize: '10px', marginLeft: '2px' }}>3</span>
            </button>
          </div>

          <div className="toolbar-group">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
              title="Align Left"
              aria-label="Align Left"
            >
              <FaAlignLeft />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
              title="Align Center"
              aria-label="Align Center"
            >
              <FaAlignCenter />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
              title="Align Right"
              aria-label="Align Right"
            >
              <FaAlignRight />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
              title="Align Justify"
              aria-label="Align Justify"
            >
              <FaAlignJustify />
            </button>
          </div>

          <div className="toolbar-group">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
              title="Bullet List"
              aria-label="Bullet List"
            >
              <FaListUl />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
              title="Ordered List"
              aria-label="Ordered List"
            >
              <FaListOl />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
              title="Quote"
              aria-label="Quote"
            >
              <FaQuoteRight />
            </button>
          </div>

          <div className="toolbar-group">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              title="Undo"
              aria-label="Undo"
            >
              <FaUndo />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              title="Redo"
              aria-label="Redo"
            >
              <FaRedo />
            </button>
          </div>
        </StyledToolbar>
        <StyledEditorContent>
          <EditorContent editor={editor} />
        </StyledEditorContent>
      </StyledEditorWrapper>
    </div>
  );
};

export default TextEditor;
