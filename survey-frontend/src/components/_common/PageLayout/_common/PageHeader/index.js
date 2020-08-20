import { Avatar, Button, Input, Layout, Popconfirm, Space } from 'antd';
import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router';
import { addSurvey } from '../../../../../redux/actions';
import FormModal from '../../../ModalForm/index';
import { Logo } from '../../../../route/Authentication/_common/components';
import Index from '../../../../route/Survey/SurveysList/_common/SurveyForm';

const { Header } = Layout;

/**
 * Main Page's Header.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PageHeader = props => {
  const {
    toggleSideBar,
    menuCollapsed,
    onSearch,
    user,
    addSurvey,
    isCreatingSurvey,
    auth,
    logout,
  } = props;

  const history = useHistory();

  const handleSubmit = value => {
    addSurvey(value);
  };
  return (
    <Header className="sv-layout-header">
      <div className={'sv-layout-header-right'}>
        <div
          className={'sv-layout-header-right-inner'}
          onClick={
            auth.user && auth.user.role === 'coordinator' ? toggleSideBar : null
          }
        >
          {auth.user && auth.user.role === 'coordinator' && (
            <div className={'sv-sidebar-collapsible-container'}>
              <Button
                type={'text'}
                icon={
                  menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                }
              />
            </div>
          )}

          <div className={'sv-logo-container'}>
            <Logo />
          </div>
        </div>

        <Space size={15} align={'center'}>
          {location && location.pathname === '/surveys' && (
            <div>
              <FormModal
                title="New Survey"
                BtnTitle={'New Survey'}
                formProps={{
                  handleSubmit,
                  isCreatingSurvey,
                }}
                formComponent={Index}
              />
            </div>
          )}
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
          {user.email && <Button type={'link'}>{user.email}</Button>}
          {user.email && (
            <Avatar
              style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              icon={<UserOutlined />}
            />
          )}

          {!auth ||
            (!auth.session && (
              <Button onClick={() => history.push('/login')} type={'primary'}>
                Login
              </Button>
            ))}
          {!isEmpty(auth.session) && (
            <Popconfirm
              placement="bottomLeft"
              title={'Are you sure you want to logout?'}
              onConfirm={() => logout()}
              okText="Yes"
              cancelText="No"
            >
              <Button>Logout</Button>
            </Popconfirm>
          )}
        </Space>
      </div>
    </Header>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    auth: state.auth,
    isCreatingSurvey: state.ui.loading.addSurvey,
  };
};

const dispatchToProps = {
  addSurvey,
};

export default connect(mapStateToProps, dispatchToProps)(PageHeader);
