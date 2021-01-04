import { createSlice } from '@reduxjs/toolkit';
import bookmarkApi from '../../api/bookmarkApi';
import { notifError, notifSuccess } from '../notif/notifSlice';

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    bookmarks: [],
    bookmarkById: {},
    loading: false,
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    getBookmarksSuccess(state, action) {
      state.bookmarks = action.payload;
      state.loading = false;
    },
    getBookmarkSuccess(state, action) {
      const { bookmark, id } = action.payload;
      state.bookmarkById[id] = bookmark;
      state.loading = false;
    },
    updateBookmarkSuccess(state, action) {
      const { data, id } = action.payload;
      state.bookmarkById[id] = {
        ...state.bookmarkById[id],
        ...data,
      };
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  getBookmarksSuccess,
  getBookmarkSuccess,
  updateBookmarkSuccess,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;

export function fetchBookmarks(filter) {
  return async function (dispatch) {
    try {
      let query;
      if (filter === 'stars') {
        query = {
          star: '1',
        };
      } else if (filter === 'archives') {
        query = {
          archive: '1',
        };
      }

      dispatch(startLoading());
      const bookmarks = await bookmarkApi.getBookmarks(query);
      dispatch(getBookmarksSuccess(bookmarks));
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}

export function fetchBookmark(id) {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      const bookmark = await bookmarkApi.getBookmark(id);
      dispatch(getBookmarkSuccess({ bookmark, id }));
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}

export function destroyBookmark(id) {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      await bookmarkApi.deleteBookmark(id);
      dispatch(stopLoading());
      dispatch(notifSuccess('Bookmark removed Successfully'));
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}

export function updateBookmark(id, data) {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      await bookmarkApi.updateBookmark(id, data);
      dispatch(updateBookmarkSuccess({ id, data }));
      dispatch(notifSuccess('Bookmark updated Successfully'));
      dispatch(fetchBookmarks());
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}

export function addBookmark(data) {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      await bookmarkApi.createBookmark(data);
      dispatch(stopLoading());
      dispatch(notifSuccess('Bookmark created Successfully'));
      dispatch(fetchBookmarks());
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}

export function setTagsToBookmark(id, data) {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      await bookmarkApi.setBookmarkTags(id, data);
      dispatch(stopLoading());
      dispatch(notifSuccess('Tags added successfully'));
      dispatch(fetchBookmarks());
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}
