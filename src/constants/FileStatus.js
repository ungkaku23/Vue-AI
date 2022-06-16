const NONE = 'none'; // this means a folder
const INPROGRESS = 'In-Progress';
const FORREVIEW = 'For-Review';
const COMPLETED = 'Completed';

export const FILE_STATUS = {
    NONE,
    INPROGRESS,
    FORREVIEW,
    COMPLETED,
  };

export const FILE_STATUS_LABELS = {
    [NONE]: 'Assign Status',
    [INPROGRESS]: 'In Progress',
    [FORREVIEW]: 'For Review',
    [COMPLETED]: 'Completed',
};