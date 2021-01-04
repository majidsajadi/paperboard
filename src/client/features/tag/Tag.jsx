import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Spin } from 'antd';
import { fetchTag } from './tagSlice';
import EditTag from './EditTag';
import BookmarkList from '../bookmark/BookmarkList';
import DeleteTag from './DeleteTag';

export default function Tag() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { tag, loading } = useSelector((state) => ({
    loading: state.tag.loading,
    tag: state.tag.tagById[id],
  }));

  useEffect(() => {
    dispatch(fetchTag(id));
  }, [dispatch, id]);

  return (
    <>
      <Spin spinning={loading}>
        <PageHeader
          title={tag?.name}
          extra={[
            <EditTag name={tag?.name} id={tag?.id} key="edit" />,
            <DeleteTag key="delete" id={tag?.id} />,
          ]}
        />
        <BookmarkList bookmarks={tag?.bookmarks} />
      </Spin>
    </>
  );
}
