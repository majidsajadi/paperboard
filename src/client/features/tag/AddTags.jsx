import React from 'react';
import { TagOutlined } from '@ant-design/icons';
import { Button, Popover, Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setTagsToBookmark } from '../bookmark/bookmarkSlice';

export default function AddTags({ bookmark }) {
  const dispatch = useDispatch();
  const { tags, loading } = useSelector((state) => state.tag);
  function onFinish(values) {
    dispatch(setTagsToBookmark(bookmark.id, values));
  }

  const content = (
    <Form
      layout="inline"
      validateTrigger="onSubmit"
      name="addBookmark"
      initialValues={{
        tags: bookmark.tags?.map((t) => t.name),
      }}
      onFinish={onFinish}
    >
      <Form.Item name="tags">
        <Select loading={loading} mode="tags" style={{ width: 200 }}>
          {tags.map((tag) => (
            <Select.Option key={tag.id} value={tag.name}>
              {tag.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button loading={loading} block type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Popover
      placement="bottomRight"
      content={content}
      title="Add Tag"
      trigger="click"
    >
      <Button size="small" type="text" icon={<TagOutlined />} />
    </Popover>
  );
}
