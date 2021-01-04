import React from 'react';
import { List, Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
import DeleteBookmark from './DeleteBookmark';
import StarBookmark from './StarBookmark';
import ArchiveBookmark from './ArchiveBookmark';
import AddTags from '../tag/AddTags';

export default function BookmarkList({ bookmarks }) {
  return (
    <List
      size="small"
      grid={{ column: 3 }}
      dataSource={bookmarks}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card
            title={<Link to={`/bookmarks/${item.id}`}>{item.title}</Link>}
            type="inner"
            size="small"
            actions={[
              <DeleteBookmark key="delete" id={item.id} />,
              <StarBookmark key="star" bookmark={item} />,
              <ArchiveBookmark key="archive" bookmark={item} />,
              <AddTags key="tag" bookmark={item} />,
            ]}
          >
            <Card.Meta description={item.hostname} />
            <div className="item-excerpt">{item.excerpt}</div>
            <div>
              {item.tags?.map((tag) => (
                <Tag key={tag.id}>
                  <Link to={`/tags/${tag.id}`}>{tag.name}</Link>
                </Tag>
              ))}
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
