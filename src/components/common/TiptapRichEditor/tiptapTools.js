import tiptapCommands from './tiptapCommands';

const formatTools = [
  {
    command: tiptapCommands.BOLD,
    icon: 'format_bold',
    tooltip: 'Bold',
  },
  {
    command: tiptapCommands.UNDERLINE,
    icon: 'format_underlined',
    tooltip: 'Underline',
  },
  {
    command: tiptapCommands.ITALIC,
    icon: 'format_italic',
    tooltip: 'Italic',
  },
  {
    command: tiptapCommands.STRIKE,
    icon: 'format_strikethrough',
    tooltip: 'Strike through',
  },
  {
    command: tiptapCommands.BLOCKQUOTE,
    icon: 'format_quote',
    tooltip: 'Block quote',
  },
];

const historyTools = [
  {
    command: tiptapCommands.UNDO,
    icon: 'undo',
    tooltip: 'Undo',
  },
  {
    command: tiptapCommands.REDO,
    icon: 'redo',
    tooltip: 'Redo',
  },
];

// const indentTools = [
//   {
//     command: tiptapCommands.INDENT,
//     icon: 'format_indent_increase',
//     tooltip: 'Indent'
//   },
//   {
//     command: tiptapCommands.OUTDENT,
//     icon: 'format_indent_decrease',
//     tooltip: 'Outdent'
//   },
// ]

const listTools = [
  {
    command: tiptapCommands.BULLET_LIST,
    icon: 'format_list_bulleted',
    tooltip: 'Bullet List',
  },
  {
    command: tiptapCommands.ORDERED_LIST,
    icon: 'format_list_numbered',
    tooltip: 'Ordered List',
  },
];

const otherTools = [
  {
    command: tiptapCommands.HORIZONTAL_RULE,
    icon: 'horizontal_rule',
    tooltip: 'Horizontal Rule',
  },
  {
    command: tiptapCommands.LINK,
    icon: 'link',
    tooltip: 'Link',
  },
  // {
  //   command: tiptapCommands.FULL_SCREEN,
  //   icon: 'fullscreen',
  //   tooltip: 'Full screen'
  // },
];

const textAlignTools = [
  {
    command: tiptapCommands.TEXT_ALIGN_LEFT,
    icon: 'format_align_left',
    tooltip: 'Left',
  },
  {
    command: tiptapCommands.TEXT_ALIGN_CENTER,
    icon: 'format_align_center',
    tooltip: 'Center',
  },
  {
    command: tiptapCommands.TEXT_ALIGN_RIGHT,
    icon: 'format_align_right',
    tooltip: 'Right',
  },
  {
    command: tiptapCommands.TEXT_ALIGN_JUSTIFY,
    icon: 'format_align_justify',
    tooltip: 'Justify',
  },
];

const tiptapTools = [
  {
    name: 'History tools',
    tools: historyTools,
  },
  {
    name: 'Format tools',
    tools: formatTools,
  },
  {
    name: 'Text Align tools',
    tools: textAlignTools,
  },
  // {
  //   name: 'Indent tools',
  //   tools: indentTools
  // },
  {
    name: 'List tools',
    tools: listTools,
  },
  {
    name: 'Other tools',
    tools: otherTools,
  },
];

export default tiptapTools;
