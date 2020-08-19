import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import {
  Layout,
  Space,
  Divider,
  Radio,
  Typography,
  Button,
  Tooltip,
  Popconfirm,
  Spin,
} from 'antd';
import { motion } from 'framer-motion';
import { LoadingOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router';
import { Padding, Align } from '../Authentication/_common/components';
import { getSurvey } from '../../../redux/actions';
import FormBuilder from './FormBuilder';
import Response from './Response';

const { Content } = Layout;

const Survey = props => {
  const { getSurvey, survey, isGettingSurvey } = props;
  const params = useParams();
  console.log(params);
  useEffect(() => {
    getSurvey(params?.id || '');
    return () => {};
  }, []);

  const [currentRoute, setCurrentRoute] = useState('form-builder');

  const onNavigate = route => {
    setCurrentRoute(route);
  };
  return (
    <Layout className={'sv-survey-layout'} style={{ overflow: 'scroll' }}>
      {isGettingSurvey ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Align
            alignCenter
            justifyCenter
            style={{ height: 'calc(100vh - 130px)' }}
          >
            <Spin
              indicator={
                <Padding right={5}>
                  <Align type={'column'} alignCenter justifyCenter>
                    <LoadingOutlined spin style={{ fontSize: 90 }} />
                    <Padding top={20}>Loading</Padding>
                  </Align>
                </Padding>
              }
            />
          </Align>
        </motion.div>
      ) : (
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <Align alignCenter justifyBetween>
            <Typography.Title level={3}>{survey?.name || ''}</Typography.Title>
            <Space align={'center'} size={20}>
              <Button type={'primary'}>Save</Button>
              <Popconfirm
                placement="bottomLeft"
                title={'Are you sure you want to delete this survey?'}
                onConfirm={() => null}
                okText="Yes"
                cancelText="No"
              >
                <Button type={'danger'} ghost>
                  Close
                </Button>
              </Popconfirm>
            </Space>
          </Align>
          <Divider />
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
                  <FormBuilder surveyId={params.id} />
                </motion.div>
              )}
              {currentRoute === 'responses' && (
                <Response surveyId={params.id} />
              )}
              {/*{currentRoute === 'form-builder' && <FormBuilder />}*/}
            </Content>
          </Padding>
        </motion.div>
      )}
    </Layout>
  );
};
const stateToProps = state => ({
  isGettingSurvey: state.ui.loading.getSurvey,
  survey: state.surveys.current,
});
const dispatchToProps = {
  getSurvey,
};

export default connect(stateToProps, dispatchToProps)(Survey);
