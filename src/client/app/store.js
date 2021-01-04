import { configureStore } from '@reduxjs/toolkit';
import tagReducer from '../features/tag/tagSlice';
import notifReducer from '../features/notif/notifSlice';
import bookmarkReducer from '../features/bookmark/bookmarkSlice';

export default configureStore({
  reducer: {
    tag: tagReducer,
    bookmark: bookmarkReducer,
    notif: notifReducer,
  },
});
