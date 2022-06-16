const ARTICLE_HEADLINE = 'article-headline';
const EMAIL_SUBJECT = 'email-subject';
const PRODUCT_NAME = 'product-name';
const BUZZWORD = 'buzzword';
const BOOK_TITLE = 'book-title';
const WEBSITE_HERO_TITLE = 'website-hero-title';
const GENERAL_HEADLINE = 'general-headline';


export const HEADLINE_TYPES = {
  ARTICLE_HEADLINE,
  GENERAL_HEADLINE,
  EMAIL_SUBJECT,
  PRODUCT_NAME,
  BOOK_TITLE,
  BUZZWORD, 
  WEBSITE_HERO_TITLE,

};

export const HEADLINE_TYPE_LABELS = {
  [ARTICLE_HEADLINE]: 'Article Headline',
  [BOOK_TITLE]: 'Book Title',
  [BUZZWORD]: 'Buzzword',
  [EMAIL_SUBJECT]: 'Email Subject',
  [GENERAL_HEADLINE]: 'General Headline',
  [PRODUCT_NAME]: 'Product Name',
  [WEBSITE_HERO_TITLE]: 'Website Hero Text',
};

export const HEADLINE_TYPE_PLACEHOLDERS = {
[ARTICLE_HEADLINE]: 'Give me a headline for { e.g. AN ARTICLE ABOUT THE IMPORTANCE OF LAUGHTER}',
[BOOK_TITLE]: 'Give me a title for a book about { e.g. FASHION AND THE FUTURE OF THE INDUSTRY}',
[BUZZWORD]: 'Give me a buzzword that describes people who are { e.g. FINDING JOY IN THE MOST UNLIKELY PLACES}',
[EMAIL_SUBJECT]: 'Give me a title for an email { e.g. WELCOMING A NEW CUSTOMER}',
[GENERAL_HEADLINE]: 'Give me a headline for an ad promoting { e.g. A COURSE ON HOW TO MAKE MONEY DOING WHAT YOU LOVE}',
[PRODUCT_NAME]: 'Give me a name for a { e.g. A NEW BRAND OF INVISIBLE CLOAKS}',
[WEBSITE_HERO_TITLE]: 'Give me a hero title for a website that { e.g. SELLS SPARKLING WATER}',

}; 