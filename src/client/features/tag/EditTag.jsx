import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { editTag } from './tagSlice';

export default function EditTag({ name, id }) {
  const [visible, setVisible] = useState(false);
  const { loading } = useSelector((state) => state.tag);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  function closeModal() {
    setVisible(false);
  }

  function onFinish(values) {
    dispatch(editTag(id, values)).then(closeModal);
  }

  useEffect(() => {
    form.setFieldsValue({ name });
  }, [name, form]);

  return (
    <>
      <Button
        size="small"
        type="text"
        onClick={setVisible}
        icon={<EditOutlined />}
      />
      <Modal
        forceRender
        title="Edit Tag"
        visible={visible}
        footer={[
          <Button key="back" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={form.submit}
          >
            Submit
          </Button>,
        ]}
        onOk={form.submit}
        onCancel={closeModal}
      >
        <Form form={form} name="editTag" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input tag name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
