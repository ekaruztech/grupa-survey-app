import React, { useState } from 'react';
import { Layout } from 'antd';
import { useHistory } from 'react-router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PageHeader from './_common/PageHeader';
import PageNavigation from './_common/PageNavigation';
import PageContent from './_common/PageContent';
import './styles.scss';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions';

const PageLayout = props => {
  const { children, logout, auth } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const history = useHistory();
  const toggle = () => {
    setMenuCollapsed(prev => !prev);
  };
  const onNavigate = params => {
    // Key is destructured from the sider's menu onSelect func.
    const { key } = params;
    // Pushes new screen to the history
    history.push(key);
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
          {auth && auth.session && (
            <PageNavigation
              logout={logout}
              menuCollapsed={menuCollapsed}
              onNavigate={onNavigate}
            />
          )}
          <PageContent menuCollapsed={menuCollapsed}>{children}</PageContent>
        </Layout>
      </Layout>
    </PerfectScrollbar>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const dispatchToProps = {
  logout,
};

export default connect(mapStateToProps, dispatchToProps)(PageLayout);
