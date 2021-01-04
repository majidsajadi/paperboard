import React from 'react';
import Bookmark from '../features/bookmark/Bookmark';
import Bookmarks from '../features/bookmark/Bookmarks';
import Tag from '../features/tag/Tag';

export default [
  {
    path: '/',
    exact: true,
    component: <Bookmarks />,
  },
  {
    path: '/:filter',
    exact: true,
    component: <Bookmarks />,
  },
  {
    path: '/tags/:id',
    component: <Tag />,
  },
  {
    path: '/bookmarks/:id',
    component: <Bookmark />,
  },
];
