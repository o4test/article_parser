import keyMirror from '../utils/key_mirror';

export default keyMirror({

  // Get list of new to be reviewed
  GET_LIST: null,
  GET_LIST_FROM_SERVER: null,

  // Get list of articles from the page
  GET_LIST_TO_UPDATE: null,
  GET_LIST_TO_UPDATE_FROM_SERVER: null,

  // Approve it
  APPROVE_ONE: null,
  // Reject it
  DELETE_ONE: null,
  // Update approved text
  SAVE_ONE: null,

  // Remove item from store
  REMOVE_FROM_STORE_BY_ID: null,
});
