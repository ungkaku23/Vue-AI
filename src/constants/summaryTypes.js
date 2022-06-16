const PROPOSAL_INTRO = 'proposal-intro';
const PROPOSAL_SUMMARY = 'proposal-summary';
const CREATIVE_RATIONALE = 'creative-rationale';
const SIMPLIFY = 'simplify';
const SPEECH_INTRO = 'speech-intro';
const BLOG_INTRO = 'blog-intro';
const BLOG_OUTLINE = 'blog-outline';
const ESSAY_INTRO = 'essay-intro';
const ESSAY_OUTLINE = 'essay-outline';
const LOGLINE = 'logline';
const BLURB = 'blurb';
const CONCLUSION = 'conclusion';
const PLOT_SUMMARY = 'plot-summary';
const CHARACTER_SKETCH = 'character-sketch';
const FREESTYLE = 'freestyle';
const REFRAMER = 'reframer';
const BULLET_POINT = 'bullet-point';



export const SUMMARY_TYPES = {
  SPEECH_INTRO,
  PROPOSAL_INTRO,
  PROPOSAL_SUMMARY,
  CREATIVE_RATIONALE,
  SIMPLIFY,
  BLOG_INTRO,
  BLOG_OUTLINE,
  ESSAY_INTRO,
  ESSAY_OUTLINE,
  LOGLINE,
  BLURB,
  CONCLUSION,
  PLOT_SUMMARY,
  CHARACTER_SKETCH,
  FREESTYLE,
  REFRAMER,
  BULLET_POINT,


};

export const SUMMARY_TYPE_LABELS = {

  [BLOG_OUTLINE]: 'Outline',
  [BLOG_INTRO]: 'Introduction',
  [BULLET_POINT]: 'Bullet Points',
  [FREESTYLE]: 'Paragraph',
  [CONCLUSION]: 'Conclusion',
  [BLURB]: 'Blurb',
  [CHARACTER_SKETCH]: 'Character Sketch',
  [CREATIVE_RATIONALE]: 'Creative Rationale',
  [CONCLUSION]: 'Conclusion',
  [ESSAY_INTRO]: 'Essay Intro',
  [ESSAY_OUTLINE]: 'Essay Outline',
  [LOGLINE]: 'Logline',
  [PLOT_SUMMARY]: 'Plot Summary',
  [PROPOSAL_INTRO]: 'Proposal Intro',
  [PROPOSAL_SUMMARY]: 'Proposal Summary',
  [SIMPLIFY]: 'Simplify',
  [SPEECH_INTRO]: 'Speech Intro',
  [REFRAMER]: 'Reframe',


};


export const SUMMARY_TYPE_PLACEHOLDERS = {
  [BLOG_OUTLINE]: 'Give me an outline for {e.g AN ARTICLE ABOUT THE IMPORTANCE OF DREAMING BIG}',
  [BLOG_INTRO]: 'Give me an introduction for {e.g. AN ARTICLE ABOUT DREAMING BIG}. The tone should be {e.g. POSITIVE}',
  [FREESTYLE]: 'Give me a paragraph about {e.g. THE BENEFITS OF DREAMING BIG}',
  [CONCLUSION]: 'Give me a conclusion for {e.g. AN ARTICLE ABOUT DREAMING BIG}',
  [SPEECH_INTRO]: 'Give me a speech about {e.g HOW TO ACTIVATE YOUR DREAMS}',
  [PROPOSAL_INTRO]: 'Give me a intro for a proposal about {e.g. COMMERCIALIZING THE IDEA OF DREAMING BIG}',
  [PROPOSAL_SUMMARY]: 'Give me a proposal summary outlining {e.g. A BETTER WAY TO DREAM BIG}',
  [CREATIVE_RATIONALE]: 'Give me a creative rationale for { e.g A CAMPAIGN ABOUT DREAMING BIG}',
  [CHARACTER_SKETCH]: 'Give me a character in a story about {e.g. A DREAM DEFERRED}',
  [SIMPLIFY]: 'Give me a simple way to explain {e.g. NUCLEAR FISSION SO THAT A 5-YEAR OLD WILL UNDERSTAND}',
  [ESSAY_INTRO]: 'Give me an essay intro about {e.g. THE PLAY "A RAISIN IN THE SUN"}',
  [ESSAY_OUTLINE]: 'Give me an outline for an essay about { e.g. THE PLAY "A RAISIN IN THE SUN"}',
  [LOGLINE]: 'Give me a logline for a film about {e.g. THE GIRL WHO DARED TO DREAM BIG} ',
  [BLURB]: 'Give me a blurb for a book about {e.g. DREAMING BIG}',
  [PLOT_SUMMARY]: 'Give me a plot for a story about {e.g. A DREAM DEFERRED}',
  [REFRAMER]: 'Give me a way to reframe {e.g. AN ARGUMENT AGAINST THE IMPORTANCE OF DREAMING BIG}',
  [BULLET_POINT]: 'Give me bullet points for {e.g. A PRESENTATION ABOUT THE IMPORTANCE OF DREAMING BIG}',


};