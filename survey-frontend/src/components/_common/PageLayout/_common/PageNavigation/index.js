import { Layout, Menu } from 'antd';
import React from 'react';
import {
  FolderOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

/**
 * Page navigation side bar.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PageNavigation = props => {
  const { menuCollapsed, onNavigate } = props;
  return (
    <Sider
      width={240}
      trigger={null}
      collapsible
      theme={'light'}
      collapsed={menuCollapsed}
      className={'sv-sidebar'}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        className={'sv-sidebar-menu'}
        onSelect={onNavigate}
      >
        <div className={'sv-sidebar-menu-empty-item'} />
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          Users
        </Menu.Item>
        <Menu.Item key="3" icon={<FolderOutlined />}>
          Surveys
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
        <Menu.ItemGroup className={'sv-sidebar-menu-bottom'}>
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
};

export default PageNavigation;
