import React, { useEffect } from 'react';
import { Menu, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTags } from './tagSlice';

export default function TagList(props) {
  const dispatch = useDispatch();
  const { loading, tags } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <Spin spinning={loading}>
      <Menu.ItemGroup {...props} key="g1" title="Tags">
        {tags.map((tag) => (
          <Menu.Item key={`/tags/${tag.id}`}>
            <Link to={`/tags/${tag.id}`}>{tag.name}</Link>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Spin>
  );
}
