import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom';
import { destroyBookmark } from './bookmarkSlice';

export default function DeleteBookmark({ id }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleConfirm() {
    dispatch(destroyBookmark(id)).then(() => history.push('/'));
  }

  return (
    <Popconfirm
      title="Are you sure delete this bookmark?"
      onConfirm={handleConfirm}
      okText="Yes"
      cancelText="No"
    >
      <Button size="small" type="text" icon={<DeleteOutlined />} />
    </Popconfirm>
  );
}
