import { createSlice } from '@reduxjs/toolkit';
import tagApi from '../../api/tagApi';
import { notifError, notifSuccess } from '../notif/notifSlice';

export const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    tagById: {},
    loading: false,
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    getTagsSuccess(state, action) {
      state.tags = action.payload;
      state.loading = false;
    },
    getTagSuccess(state, action) {
      const { tag, id } = action.payload;
      state.tagById[id] = tag;
      state.loading = false;
    },
    editTagSuccess(state, action) {
      const { data, id } = action.payload;
      const updated = {
        ...state.tagById[id],
        ...data,
      };

      state.tags = [...state.tags.filter((t) => t.id !== id), updated].sort(
        (a, b) => a.id - b.id,
      );
      state.tagById[id] = updated;
      state.loading = false;
    },
    destroyTagSuccess(state, action) {
      const id = action.payload;
      state.tags = state.tags.filter((t) => t.id !== id);
      delete state.tagById[id];
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  getTagsSuccess,
  getTagSuccess,
  editTagSuccess,
  destroyTagSuccess,
} = tagSlice.actions;

export default tagSlice.reducer;

export function fetchTags() {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      const tags = await tagApi.getTags();
      dispatch(getTagsSuccess(tags));
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}

export function fetchTag(id) {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      const tag = await tagApi.getTag(id);
      dispatch(getTagSuccess({ tag, id }));
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}

export function destroyTag(id) {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      await tagApi.deleteTag(id);
      dispatch(destroyTagSuccess());
      dispatch(notifSuccess('Tag removed Successfully'));
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}

export function editTag(id, data) {
  return async function (dispatch) {
    try {
      dispatch(startLoading());
      await tagApi.updateTag(id, data);
      dispatch(editTagSuccess({ id, data }));
      dispatch(notifSuccess('Tag updated Successfully'));
    } catch (err) {
      dispatch(stopLoading());
      dispatch(notifError(err.message));
    }
  };
}
