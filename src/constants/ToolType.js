const NONE = 'none'; // this means a folder
const HEADLINES = 'Headlines';
const MESSAGING = 'Messaging';
const BRAINSTORM = 'Brainstorm';
const SOCIALMEDIA = 'Social Media';
const ADCOPY = 'Copywriting';
const FIRSTDRAFT = 'Article';
const MEDIAPITCH = 'Media Pitch';
const QUESTIONS = 'Questions';
const QUOTES = 'Quotes';
const SUMMARY = 'Summary';

export const TOOl_TYPE = {
    NONE,
    HEADLINES,
    MESSAGING,
    BRAINSTORM,
    SOCIALMEDIA,
    ADCOPY,
    FIRSTDRAFT,
    MEDIAPITCH,
    QUESTIONS,
    QUOTES,
    SUMMARY,
};

export const TOOL_TYPE_ICONS = {
    [NONE]: 'foldersimple',
    [HEADLINES]: 'filetext',
    [MESSAGING]: 'chatdots',
    [BRAINSTORM]: 'lightbulbfilament',
    [SOCIALMEDIA]: 'usersfour',
    [ADCOPY]: 'megaphone',
    [FIRSTDRAFT]: 'bookopen',
    [MEDIAPITCH]: 'envelopesimple',
    [QUESTIONS]: 'question',
    [QUOTES]: 'plus',
    [SUMMARY]: 'books',
};

export const TOOL_TYPE_URLS = {
  [HEADLINES]: 'Headline',
  [MESSAGING]: 'Messaging',
  [BRAINSTORM]: 'Brainstorm',
  [SOCIALMEDIA]: 'Social',
  [ADCOPY]: 'Promote',
  [FIRSTDRAFT]: 'Article',
  [MEDIAPITCH]: 'Media Pitch',
  [QUESTIONS]: 'Question',
  [QUOTES]: 'Quote',
  [SUMMARY]: 'Summary',
};

export const TOOL_TYPE_PLACEHOLDERS = {
  [HEADLINES]: 'Get people talking',
  [MESSAGING]: 'Say what matters',
  [BRAINSTORM]: 'Your next big idea',
  [SOCIALMEDIA]: 'Be a stand-out',
  [ADCOPY]: 'Words that sell',
  [FIRSTDRAFT]: 'Tell great stories',
  [MEDIAPITCH]: 'Make it known',
  [QUESTIONS]: 'Ask better questions',
  [QUOTES]: 'Say something good',
  [SUMMARY]: 'Make it clear',
}

export const TOOL_TYPE_TUTORIALS = { // here to replace url for different tools
   [NONE]: '',
    [HEADLINES]: 'https://youtube.com/embed/MHAbUTPX4Bk?rel=0',
    [MESSAGING]: 'https://youtube.com/embed/MHAbUTPX4Bk?rel=0',
    [BRAINSTORM]: 'https://youtube.com/embed/m2-lZFKgBs0?rel=0',
    [SOCIALMEDIA]: 'https://youtube.com/embed/csNa-8T9aUE?rel=0',
    [ADCOPY]: 'https://youtube.com/embed/evzff_NikAE?rel=0',
    [FIRSTDRAFT]: 'https://youtube.com/embed/b7odlvuNug0?rel=0',
    [MEDIAPITCH]: 'https://youtube.com/embed/7oXjSkgCsek?rel=0',
    [QUESTIONS]: 'https://www.youtube.com/embed/knR-xfwXXb8?rel=0',
    [QUOTES]: 'https://youtube.com/embed/ZyddW5tR66k?rel=0',
    [SUMMARY]: 'https://youtube.com/embed/aekCBonjPlk?rel=0',
}
