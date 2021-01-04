import React from 'react';
import { useDispatch } from 'react-redux';
import { StarTwoTone, StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { updateBookmark } from './bookmarkSlice';

export default function StarBookmark({ bookmark }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(
      updateBookmark(bookmark.id, {
        star: !bookmark.star,
      })
    );
  }

  return (
    <Button
      onClick={handleClick}
      size="small"
      type="text"
      icon={
        bookmark.star ? <StarTwoTone twoToneColor="#666" /> : <StarOutlined />
      }
    />
  );
}
