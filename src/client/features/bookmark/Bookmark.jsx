import React, { useEffect } from 'react';
import { Spin, PageHeader, Space, Empty } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchBookmark } from './bookmarkSlice';
import DeleteBookmark from './DeleteBookmark';
import StarBookmark from './StarBookmark';
import ArchiveBookmark from './ArchiveBookmark';
import AddTags from '../tag/AddTags';

export default function Bookmark() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { bookmark, loading } = useSelector((state) => ({
    loading: state.bookmark.loading,
    bookmark: state.bookmark.bookmarkById[id],
  }));

  useEffect(() => {
    dispatch(fetchBookmark(id));
  }, [dispatch, id]);

  return (
    <Spin spinning={loading}>
      {bookmark ? (
        <>
          <PageHeader
            title={bookmark.title}
            extra={[
              <DeleteBookmark key="delete" id={bookmark.id} />,
              <StarBookmark key="star" bookmark={bookmark} />,
              <ArchiveBookmark key="archive" bookmark={bookmark} />,
              <AddTags key="tag" bookmark={bookmark} />,
            ]}
          >
            <Space size="small">
              <span>
                <a href={bookmark.href}>{bookmark.hostname}</a>
              </span>
              <span>{moment(bookmark?.createdAt).fromNow()}</span>
            </Space>
          </PageHeader>

          <div
            dangerouslySetInnerHTML={{
              __html: bookmark.content,
            }}
          />
        </>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Spin>
  );
}
