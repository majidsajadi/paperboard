import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import AddBookmark from '../features/bookmark/AddBookmark';

export default function Header() {
  return (
    <Layout.Header className="header">
      <div className="container">
        <Link to="/">
          <div className="logo">
            <h3>Paperboard</h3>
          </div>
        </Link>
        <div className="actions">
          <AddBookmark />
        </div>
      </div>
    </Layout.Header>
  );
}
