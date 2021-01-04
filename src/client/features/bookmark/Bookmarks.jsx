import React, { useEffect } from 'react';
import { Spin, PageHeader } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import { fetchBookmarks } from './bookmarkSlice';
import BookmarkList from './BookmarkList';

export default function Bookmarks() {
  const dispatch = useDispatch();
  const { filter } = useParams();
  const { loading, bookmarks } = useSelector((state) => state.bookmark);

  useEffect(() => {
    dispatch(fetchBookmarks(filter));
  }, [dispatch, filter]);

  return (
    <>
      <PageHeader title={capitalize(filter) || 'Home'} />
      <Spin spinning={loading}>
        <BookmarkList bookmarks={bookmarks} />
      </Spin>
    </>
  );
}
