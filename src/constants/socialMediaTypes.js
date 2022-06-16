const INSTAGRAM_CAPTION = 'ig-caption';
const PRODUCT_LAUNCH = 'product-launch';
const YOUTUBE_TITLE = 'youtube-title';
const YOUTUBE_DESCRIPTION = 'youtube-description';
const QUORA_ANSWERS = 'quora-answers';
const VIRAL_POST_HOOK = 'viral-post-hook';
const SOCIAL_POST = 'social-post';
 
export const SOCIAL_MEDIA_TYPES = {
  INSTAGRAM_CAPTION,
  PRODUCT_LAUNCH,
  YOUTUBE_TITLE,
  YOUTUBE_DESCRIPTION,
  QUORA_ANSWERS,
  VIRAL_POST_HOOK,
  SOCIAL_POST,

  
};

export const SOCIAL_MEDIA_TYPE_LABELS = {
  [INSTAGRAM_CAPTION]: 'Caption',
  [PRODUCT_LAUNCH]: 'Announcement',
  [YOUTUBE_TITLE]: 'Video Title',
  [YOUTUBE_DESCRIPTION]: 'Video Description',
  [QUORA_ANSWERS]: 'Quora Answer',
  [VIRAL_POST_HOOK]: 'Viral Hook',
  [SOCIAL_POST]: 'Social Post',
  

  
 
};

export const SOCIAL_MEDIA_TYPE_PLACEHOLDERS = {
  [PRODUCT_LAUNCH]: 'Give me a product announcement for {e.g. A NEW BRAND OF INVISIBLE CLOAKS}',
  [INSTAGRAM_CAPTION]: 'Give me a caption for {e.g. A POST ABOUT THE NEW LOOKS FOR SUMMER}',
  [YOUTUBE_TITLE]: 'Give me a title for {e.g. A VIDEO ABOUT HOW TO EARN MONEY DOING WHAT YOU LOVE}',
  [YOUTUBE_DESCRIPTION]: 'Give me a description for {e.g. A VIDEO ABOUT THE HOW TO EARN MONEY DOING WHAT YOU LOVE}',
  [QUORA_ANSWERS]: 'Give me an answer to the question { e.g. WHY IS WATER WET?}',
  [VIRAL_POST_HOOK]: 'Give me a hook about {e.g. THE IMPORTANCE OF DREAMING BIG}',
  [SOCIAL_POST]: 'Give me a post about {e.g. HOW TO CREATE YOUR OWN LUCK}',

};
