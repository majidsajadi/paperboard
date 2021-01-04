import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addBookmark } from './bookmarkSlice';

export default function AddBookmark() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  function closeModal() {
    setVisible(false);
  }

  function onFinish(values) {
    dispatch(addBookmark(values)).then(closeModal);
  }

  return (
    <>
      <Button onClick={setVisible} icon={<PlusOutlined />}>
        Add
      </Button>
      <Modal
        forceRender
        title="Add URL"
        visible={visible}
        footer={[
          <Button key="back" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={form.submit}
          >
            Submit
          </Button>,
        ]}
        onOk={form.submit}
        onCancel={closeModal}
      >
        <Form
          validateTrigger="onSubmit"
          form={form}
          name="addBookmark"
          onFinish={onFinish}
        >
          <Form.Item
            name="url"
            rules={[
              {
                required: true,
                message: 'Please input tag name!',
              },
              {
                type: 'url',
                message: 'URL is not valid!',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="https://example.com/article.html"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
