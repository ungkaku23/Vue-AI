export const ACTIVITY_CATEGORIES = {
  COMMON: 'common',
  AUTH: 'auth',
  PAYMENT: 'payment',
  ARTICLE: 'article',
  NOTE: 'note',
  PROJECT: 'project',
  FILE: 'file',
};

export const ACTIVITY_CATEGORY_COLORS = {
  [ACTIVITY_CATEGORIES.COMMON]: 'var(--gray-light)',
  [ACTIVITY_CATEGORIES.AUTH]: 'var(--teal)',
  [ACTIVITY_CATEGORIES.PAYMENT]: 'var(--success)',
  [ACTIVITY_CATEGORIES.ARTICLE]: 'var(--indigo)',
  [ACTIVITY_CATEGORIES.NOTE]: 'var(--purple)',
  [ACTIVITY_CATEGORIES.PROJECT]: 'var(--pink)',
  [ACTIVITY_CATEGORIES.FILE]: 'var(--pink)',
};

export default ACTIVITY_CATEGORIES;
