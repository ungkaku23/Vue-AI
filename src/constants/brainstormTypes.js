const BLOG_TOPICS = 'blog-topics';
const PUBLICITY_STUNT = 'publicity-stunt';
const PROBLEM_SOLVER = 'problem-solver';
const EVENT_IDEAS = 'event-ideas';
const PODCAST_EPISODES = 'podcast-episodes';
const CAMPAIGN_THEME = 'campaign-theme';
const VIRAL_IDEAS = 'viral-ideas';
const CONTEST_IDEAS = 'contest-ideas';
const PROMOTION_IDEA = 'promotion-idea';
const BIG_IDEAS = 'big-ideas';
const VIDEO_TREATMENT = 'video-treatment';
const CREATIVE_FREESTYLE = 'creative-freestyle';


export const BRAINSTORM_TYPES = {
  BIG_IDEAS,
  BLOG_TOPICS,
  PUBLICITY_STUNT,
  PROBLEM_SOLVER,
  EVENT_IDEAS,
  PODCAST_EPISODES,
  CONTEST_IDEAS,
  VIRAL_IDEAS, 
  CAMPAIGN_THEME,
  PROMOTION_IDEA,
  VIDEO_TREATMENT,
  CREATIVE_FREESTYLE,
};

export const BRAINSTORM_TYPE_LABELS = {
  
  [BLOG_TOPICS]: 'Blog Post Ideas',
  [CREATIVE_FREESTYLE]: 'Brainstorm Unlimited',
  [CAMPAIGN_THEME]: 'Campaign Ideas',
  [EVENT_IDEAS]: 'Event Ideas',
  [BIG_IDEAS]: 'Innovation Accelerator',
  [PODCAST_EPISODES]: 'Podcast Ideas',
  [PUBLICITY_STUNT]: 'Publicity Ideas',
  [PROBLEM_SOLVER]: 'Problem Solving',
  [PROMOTION_IDEA]: 'Promotion Ideas',
  [CONTEST_IDEAS]: 'Social Media Ideas',
  [VIRAL_IDEAS]: 'Viral Video Ideas', 
  [VIDEO_TREATMENT]: 'Video Treatment',

};

 

export const BRAINSTORM_TYPE_PLACEHOLDERS = {
  [BIG_IDEAS]: 'Enter a topic, brief, question, or request, then click generate.',
  [CREATIVE_FREESTYLE]: 'Enter a topic, brief, question, or request, then click generate.',
  [BLOG_TOPICS]: 'Give me a topic about {e.g. THE IMPORTANCE OF CONTENT MARKETING FOR SMALL BUSINESSES}',
  [PUBLICITY_STUNT]: 'Give me a publicity stunt for {e.g. A SPACE COMPANY SENDING ITS FIRST MISSION TO MARS}',
  [PROBLEM_SOLVER]: 'Give me a solution for {e.g. THE PROBLEM OF IMPROPER WASTE DISPOSAL}',
  [EVENT_IDEAS]: 'Give me an event idea for { e.g. THE 50th ANNIVERSARY OF AN INSURANCE COMPANY}',
  [PODCAST_EPISODES]: 'Give me a podcast episode about {e.g. HOW TO MAKE A GOOD FIRST IMPRESSION}',
  [CAMPAIGN_THEME]: 'Give me an idea for a campaign {e.g. PROMOTING CLIMATE CHANGE AWARENESS}',
  [CONTEST_IDEAS]: 'Give me a social media idea for {e.g. PROMOTING A NEW SHOE STORE}',
  [VIRAL_IDEAS]: 'Give me a viral video idea for {e.g. HOW TO MAKE A GOOD FIRST IMPRESSION}',
  [PROMOTION_IDEA]: 'Give me a promotion idea for {e.g. GETTING NEW CUSTOMERS TO VISIT YOUR SHOE STORE}',
  [VIDEO_TREATMENT]: 'Give me a treatment for a music video about {e.g. HAVING A GOOD TIME WITH YOUR FRIENDS}',
};
