import React, { useState } from 'react';
import { Layout } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PageHeader from './_common/PageHeader';
import PageNavigation from './_common/PageNavigation';
import PageContent from './_common/PageContent';
import './styles.scss';

const PageLayout = props => {
  const { children } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(true);

  const toggle = () => {
    setMenuCollapsed(prev => !prev);
  };

  return (
    <PerfectScrollbar>
      <Layout style={{ overflow: 'hidden' }}>
        <PageHeader
          menuCollapsed={menuCollapsed}
          toggleSideBar={toggle}
          onSearh={value => console.log(value)}
        />
        <Layout style={{ height: '100vh' }}>
          <PageNavigation
            menuCollapsed={menuCollapsed}
            onNavigate={value => console.log(value)}
          />
          <PageContent menuCollapsed={menuCollapsed}>{children}</PageContent>
        </Layout>
      </Layout>
    </PerfectScrollbar>
  );
};

export default PageLayout;
