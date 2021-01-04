import React from 'react';
import { Layout, Menu } from 'antd';
import { FolderTwoTone, StarTwoTone, HomeTwoTone } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import TagList from '../features/tag/TagList';

export default function Sidebar() {
  const location = useLocation();

  return (
    <Layout.Sider
      width={275}
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
      className="sidebar"
    >
      <Menu
        className="menu"
        mode="inline"
        selectedKeys={[location.pathname]}
        theme="light"
      >
        <Menu.Item key="/">
          <Link to="/">
            <HomeTwoTone twoToneColor="#666" />
            <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/stars">
          <Link to="/stars">
            <StarTwoTone twoToneColor="#666" />
            <span>Stars</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/archives">
          <Link to="/archives">
            <FolderTwoTone twoToneColor="#666" />
            <span>Archives</span>
          </Link>
        </Menu.Item>
        <TagList />
      </Menu>
    </Layout.Sider>
  );
}
