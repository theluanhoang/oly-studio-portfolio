'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { Iframe } from './Iframe';

const DEFAULT_IFRAME_ATTRS = {
  width: '100%',
  height: '400',
  frameborder: '0',
  allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
  allowfullscreen: true,
  referrerpolicy: 'strict-origin-when-cross-origin',
};

const toYouTubeEmbedUrl = (rawUrl) => {
  if (!rawUrl) return '';

  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.replace('www.', '');

    const copySearchParams = (source, target) => {
      source.searchParams.forEach((value, key) => {
        if (key !== 'v') {
          target.searchParams.set(key, value);
        }
      });
    };

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        const videoId = url.searchParams.get('v');
        if (videoId) {
          const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
          copySearchParams(url, embedUrl);
          return embedUrl.toString();
        }
      }

      if (url.pathname.startsWith('/embed/')) {
        return url.toString();
      }

      if (url.pathname.startsWith('/shorts/')) {
        const segments = url.pathname.split('/');
        const videoId = segments[segments.length - 1];
        if (videoId) {
          const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
          copySearchParams(url, embedUrl);
          return embedUrl.toString();
        }
      }
    }

    if (hostname === 'youtu.be') {
      const videoId = url.pathname.replace('/', '');
      if (videoId) {
        const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`);
        url.searchParams.forEach((value, key) => {
          embedUrl.searchParams.set(key, value);
        });
        return embedUrl.toString();
      }
    }

    return url.toString();
  } catch (error) {
    return rawUrl;
  }
};

const parseIframeInput = (input) => {
  if (!input) return null;

  const trimmed = input.trim();
  const attrs = { ...DEFAULT_IFRAME_ATTRS };

  if (trimmed.startsWith('<iframe')) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = trimmed;
    const iframeEl = tempContainer.querySelector('iframe');

    if (!iframeEl) {
      return null;
    }

    const src = iframeEl.getAttribute('src');
    attrs.src = src ? toYouTubeEmbedUrl(src) : '';
    attrs.width = DEFAULT_IFRAME_ATTRS.width;
    attrs.height = DEFAULT_IFRAME_ATTRS.height;
    attrs.frameborder = iframeEl.getAttribute('frameborder') || attrs.frameborder;
    attrs.allow = iframeEl.getAttribute('allow') || attrs.allow;
    attrs.referrerpolicy = iframeEl.getAttribute('referrerpolicy') || attrs.referrerpolicy;
    attrs.allowfullscreen = iframeEl.hasAttribute('allowfullscreen');

    const title = iframeEl.getAttribute('title');
    if (title) {
      attrs.title = title;
    }

    if (!attrs.src) {
      return null;
    }

    return attrs;
  }

  const embedUrl = toYouTubeEmbedUrl(trimmed);
  if (!embedUrl) {
    return null;
  }

  attrs.src = embedUrl;
  attrs.width = DEFAULT_IFRAME_ATTRS.width;
  attrs.height = DEFAULT_IFRAME_ATTRS.height;
  return attrs;
};

export default function TiptapEditor({ content, onChange }) {
  const editor = useEditor({
    immediatelyRender: false,
    parseOptions: {
      preserveWhitespace: 'full',
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      TextStyle,
      Color,
      FontFamily,
      Iframe,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      handlePaste(view, event) {
        const html = event.clipboardData?.getData('text/html') ?? '';
        const text = event.clipboardData?.getData('text/plain') ?? '';

        const candidate = html.includes('<iframe') ? html : text;
        const attrs = parseIframeInput(candidate);

        if (!attrs || !attrs.src) {
          return false;
        }

        event.preventDefault();

        const { state } = view;
        const { schema, tr } = state;
        const iframeNodeType = schema.nodes.iframe;

        if (!iframeNodeType) {
          return false;
        }

        const node = iframeNodeType.create(attrs);
        view.dispatch(tr.replaceSelectionWith(node).scrollIntoView());

        return true;
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-[#e0e0e0] overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-[#e0e0e0] bg-[#f5f5f5] p-3 flex flex-wrap gap-2">
        {/* Heading */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().clearNodes().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
          className="px-3 py-2 border border-[#e0e0e0] bg-white text-[#333] text-xs tracking-[1px] uppercase focus:outline-none focus:border-[#333] transition-colors"
        >
          <option value="0">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        {/* Bold, Italic, Strike */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-4 py-2 border border-[#e0e0e0] text-xs font-bold tracking-[1px] uppercase transition-colors ${
            editor.isActive('bold') ? 'bg-[#333] text-white border-[#333]' : 'bg-white text-[#333] hover:bg-[#f5f5f5]'
          }`}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-4 py-2 border border-[#e0e0e0] text-xs italic tracking-[1px] uppercase transition-colors ${
            editor.isActive('italic') ? 'bg-[#333] text-white border-[#333]' : 'bg-white text-[#333] hover:bg-[#f5f5f5]'
          }`}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-4 py-2 border border-[#e0e0e0] text-xs line-through tracking-[1px] uppercase transition-colors ${
            editor.isActive('strike') ? 'bg-[#333] text-white border-[#333]' : 'bg-white text-[#333] hover:bg-[#f5f5f5]'
          }`}
        >
          S
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-4 py-2 border border-[#e0e0e0] text-xs tracking-[1px] uppercase transition-colors ${
            editor.isActive('bulletList') ? 'bg-[#333] text-white border-[#333]' : 'bg-white text-[#333] hover:bg-[#f5f5f5]'
          }`}
        >
          •
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-4 py-2 border border-[#e0e0e0] text-xs tracking-[1px] uppercase transition-colors ${
            editor.isActive('orderedList') ? 'bg-[#333] text-white border-[#333]' : 'bg-white text-[#333] hover:bg-[#f5f5f5]'
          }`}
        >
          1.
        </button>

        {/* Link */}
        <button
          onClick={() => {
            const url = window.prompt('Enter URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`px-4 py-2 border border-[#e0e0e0] text-xs tracking-[1px] uppercase transition-colors ${
            editor.isActive('link') ? 'bg-[#333] text-white border-[#333]' : 'bg-white text-[#333] hover:bg-[#f5f5f5]'
          }`}
        >
          Link
        </button>

        {/* Image */}
        <button
          onClick={() => {
            const url = window.prompt('Enter image URL:');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="px-4 py-2 border border-[#e0e0e0] bg-white text-[#333] text-xs tracking-[1px] uppercase hover:bg-[#f5f5f5] transition-colors"
        >
          Image
        </button>

        {/* YouTube */}
        <button
          onClick={() => {
            const input = window.prompt('Enter YouTube URL or iframe embed HTML:');
            if (!input) {
              return;
            }

            const attrs = parseIframeInput(input);

            if (!attrs || !attrs.src) {
              alert('Could not parse YouTube URL or iframe embed code. Please check the input.');
              return;
            }

            editor.chain().focus().setIframe(attrs).run();
          }}
          className="px-4 py-2 border border-[#e0e0e0] bg-white text-[#333] text-xs tracking-[1px] uppercase hover:bg-[#f5f5f5] transition-colors"
        >
          YouTube
        </button>

        {/* Font Family */}
        <select
          onChange={(e) => {
            const fontFamily = e.target.value;
            if (fontFamily === 'default') {
              editor.chain().focus().unsetFontFamily().run();
            } else {
              editor.chain().focus().setFontFamily(fontFamily).run();
            }
          }}
          className="px-3 py-2 border border-[#e0e0e0] bg-white text-[#333] text-xs tracking-[1px] uppercase focus:outline-none focus:border-[#333] transition-colors"
        >
          <option value="default">Font</option>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>

        {/* Text Color */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="w-12 h-10 border border-[#e0e0e0] cursor-pointer"
          title="Text Color"
        />
      </div>

      {/* Editor Content */}
      <div className="bg-white min-h-[400px] p-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

