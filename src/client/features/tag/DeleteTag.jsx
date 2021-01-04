import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { destroyTag } from './tagSlice';

export default function DeleteTag({ id }) {
  const dispatch = useDispatch();

  return (
    <Popconfirm
      title="Are you sure delete this tag?"
      onConfirm={() => dispatch(destroyTag(id))}
      okText="Yes"
      cancelText="No"
    >
      <Button size="small" type="text" icon={<DeleteOutlined />} />
    </Popconfirm>
  );
}
