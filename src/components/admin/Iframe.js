import { Node } from '@tiptap/core';

export const Iframe = Node.create({
  name: 'iframe',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: '100%',
      },
      height: {
        default: '400',
      },
      frameborder: {
        default: '0',
      },
      allow: {
        default: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      },
      allowfullscreen: {
        default: true,
      },
      title: {
        default: null,
      },
      referrerpolicy: {
        default: 'strict-origin-when-cross-origin',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe',
        getAttrs: (node) => {
          if (typeof node === 'string') return false;
          return {
            src: node.getAttribute('src'),
            width: node.getAttribute('width') || '100%',
            height: node.getAttribute('height') || '400',
            frameborder: node.getAttribute('frameborder') || '0',
            allow: node.getAttribute('allow') || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            allowfullscreen: node.hasAttribute('allowfullscreen'),
            title: node.getAttribute('title'),
            referrerpolicy: node.getAttribute('referrerpolicy') || 'strict-origin-when-cross-origin',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // Ensure all attributes are properly set
    const attrs = {
      ...HTMLAttributes,
      src: HTMLAttributes.src || null,
      width: HTMLAttributes.width || '100%',
      height: HTMLAttributes.height || '400',
      frameborder: HTMLAttributes.frameborder || '0',
    };

    // Ensure src is set
    if (!attrs.src) {
      console.warn('Iframe renderHTML: src is missing!', HTMLAttributes);
    } else {
      console.log('Iframe renderHTML: rendering iframe with src:', attrs.src);
    }

    if (HTMLAttributes.allow) {
      attrs.allow = HTMLAttributes.allow;
    }

    if (HTMLAttributes.referrerpolicy) {
      attrs.referrerpolicy = HTMLAttributes.referrerpolicy;
    }

    if (HTMLAttributes.title) {
      attrs.title = HTMLAttributes.title;
    }

    if (HTMLAttributes.allowfullscreen === false) {
      delete attrs.allowfullscreen;
    } else {
      attrs.allowfullscreen = '';
    }
    
    // Remove undefined/null values (but keep src even if it's null for now to debug)
    Object.keys(attrs).forEach(key => {
      if (attrs[key] === null || attrs[key] === undefined) {
        if (key !== 'src') {
          delete attrs[key];
        }
      }
    });
    
    console.log('Iframe renderHTML: final attrs:', attrs);
    return ['iframe', attrs];
  },

  addCommands() {
    return {
      setIframe: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
    };
  },
});

