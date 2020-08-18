import { Avatar, Button, Input, Layout, Space } from 'antd';
import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Logo } from '../../../../route/Authentication/Login/_commons/components';

const { Header } = Layout;

/**
 * Main Page's Header.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PageHeader = props => {
  const { toggleSideBar, menuCollapsed, onSearch } = props;
  return (
    <Header className="sv-layout-header">
      <div className={'sv-layout-header-right'}>
        <div className={'sv-layout-header-right-inner'} onClick={toggleSideBar}>
          <div className={'sv-sidebar-collapsible-container'}>
            <Button
              type={'text'}
              icon={
                menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              }
            />
          </div>

          <div className={'sv-logo-container'}>
            <Logo />
          </div>
        </div>

        <Space size={15} align={'center'}>
          <Input
            placeholder="Search"
            allowClear={false}
            autoFocus
            prefix={
              <SearchOutlined
                style={{ color: 'var(--primary-color)', fontSize: 18 }}
              />
            }
            onChange={onSearch}
            // style={{borderRadius: 5, borderColor: 'var(--accent)'}}
          />
          <Button type={'link'}>johndow@example.com</Button>

          <Avatar
            style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            icon={<UserOutlined />}
          />
        </Space>
      </div>
    </Header>
  );
};

export default PageHeader;
