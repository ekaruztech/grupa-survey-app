import { Avatar, Button, Input, Layout, Space } from 'antd';
import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
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
  } = props;

  const handleSubmit = value => {
    addSurvey(value);
  };
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
          <Button type={'link'}>{user.email}</Button>

          <Avatar
            style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            icon={<UserOutlined />}
          />
        </Space>
      </div>
    </Header>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isCreatingSurvey: state.ui.loading.addSurvey,
  };
};

const dispatchToProps = {
  addSurvey,
};

export default connect(mapStateToProps, dispatchToProps)(PageHeader);
