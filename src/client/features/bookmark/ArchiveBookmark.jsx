import React from 'react';
import { useDispatch } from 'react-redux';
import { FolderOpenOutlined, FolderTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { updateBookmark } from './bookmarkSlice';

export default function ArchiveBookmark({ bookmark }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(
      updateBookmark(bookmark.id, {
        archive: !bookmark.archive,
      })
    );
  }

  return (
    <Button
      onClick={handleClick}
      size="small"
      type="text"
      icon={
        bookmark.archive ? (
          <FolderTwoTone twoToneColor="#666" />
        ) : (
          <FolderOpenOutlined />
        )
      }
    />
  );
}
