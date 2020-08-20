import { Layout, Menu } from 'antd';
import React from 'react';
import { useLocation } from 'react-router';
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
  const { menuCollapsed, onNavigate, logout } = props;
  const { pathname } = useLocation();

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
        defaultSelectedKeys={[pathname]}
        className={'sv-sidebar-menu'}
        onSelect={onNavigate}
      >
        <div className={'sv-sidebar-menu-empty-item'} />
        <Menu.Item key="/" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="/surveys" icon={<FolderOutlined />}>
          Surveys
        </Menu.Item>
        <Menu.ItemGroup className={'sv-sidebar-menu-bottom'}>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => logout()}>
            Logout
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
};

export default PageNavigation;
