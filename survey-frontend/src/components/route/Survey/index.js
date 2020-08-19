import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { Layout, Space, Divider, Radio } from 'antd';

import { Switch, Route, useLocation, useHistory } from 'react-router';
import { motion } from 'framer-motion';
import { Padding } from '../Authentication/_common/components';
import FormBuilder from './FormBuilder';
import Response from './Response';

const { Content } = Layout;

const SurveyRoutes = () => {
  const routes = [
    // { exact: true, path: '/', component: () => <Redirect to="/login" /> },
    {
      exact: true,
      path: '/surveys/:surveyId/form-builder',
      component: FormBuilder,
    },
    {
      exact: true,
      path: '/surveys/:surveyId/response',
      component: Response,
    },
    // { exact: true, path: '/:surveyId/preview', component: Survey, isPrivate: true },
  ];
  return (
    <Switch>
      {routes.map(route => {
        return <Route key={route.path} {...route} />;
      })}
    </Switch>
  );
};

const Survey = props => {
  useEffect(() => {
    return () => {};
  }, []);
  const location = useLocation();
  const history = useHistory();
  console.log(location);
  const [currentRoute, setCurrentRoute] = useState('form-builder');

  const onNavigate = route => {
    // history.push(route);
    // console.log(route);
    setCurrentRoute(route);
  };
  return (
    <Layout className={'sv-survey-layout'} style={{ overflow: 'scroll' }}>
      <Space align={'center'} size={20}>
        <Radio.Group
          value={currentRoute}
          onChange={e => {
            onNavigate(e.target.value);
          }}
          optionType="button"
          buttonStyle="solid"
        >
          <Radio.Button
            style={{ borderRadius: 4, marginRight: 10 }}
            value={`form-builder`}
          >
            Form Builder
          </Radio.Button>
          <Radio.Button
            style={{ borderRadius: 4, marginRight: 10 }}
            value="responses"
          >
            Responses
          </Radio.Button>
          <Radio.Button
            style={{ borderRadius: 4, marginRight: 10 }}
            value="preview"
          >
            Preview
          </Radio.Button>
        </Radio.Group>
      </Space>
      <Divider />
      <Padding top={20}>
        <Content className={'sv-response-content'}>
          {currentRoute === 'form-builder' && (
            <motion.div layout>
              <FormBuilder />
            </motion.div>
          )}
          {currentRoute === 'responses' && <Response />}
          {/*{currentRoute === 'form-builder' && <FormBuilder />}*/}
        </Content>
      </Padding>
    </Layout>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const dispatchToProps = {};

export default connect(mapStateToProps, dispatchToProps)(Survey);
