import { DOCUMENT_TYPES } from './documentTypes';
import { v4 as uuidv4 } from 'uuid';
const generateEmptyArticle = () => {
  return {
    _id: uuidv4(),
    article: '',
    isEmpty: true,
    cites: [],
    baseData: {
      authors: '',
      date: '',
      domain: '',
      documentType: DOCUMENT_TYPES.BUSINESS,
      keywords: [],
      title: 'Untitled',
    },
  };
};

export default generateEmptyArticle;
