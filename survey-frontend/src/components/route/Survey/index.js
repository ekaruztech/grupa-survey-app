import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import {
  Layout,
  Space,
  Divider,
  Radio,
  Button,
  Tooltip,
  Popconfirm,
  Spin,
  PageHeader,
} from 'antd';
import { motion } from 'framer-motion';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import { Padding, Align } from '../Authentication/_common/components';
import { getSurvey, updateSurveyStatus } from '../../../redux/actions';
import FormBuilder from './FormBuilder';
import Response from './Response';
import FormPreview from './Preview';

const { Content } = Layout;

const Survey = props => {
  const {
    getSurvey,
    survey,
    isGettingSurvey,
    updateSurveyStatus,
    isClosingSurvey,
  } = props;
  const params = useParams();
  const surveyId = params?.id;
  useEffect(() => {
    getSurvey(surveyId || '');
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
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={survey?.name || ''}
            extra={[
              <Popconfirm
                placement="bottomLeft"
                title={'Are you sure you want to close this survey?'}
                onConfirm={() => {
                  updateSurveyStatus(
                    surveyId,
                    {
                      status: false,
                    },
                    {},
                    'updateSurveyStatus',
                    () => window.history.back()
                  );
                }}
                okText="Yes"
                cancelText="No"
                key={'page-header-close'}
              >
                <Tooltip title={'Close survey'}>
                  <Button type={'danger'} ghost>
                    {isClosingSurvey ? (
                      <Spin
                        indicator={
                          <Padding right={5}>
                            <LoadingOutlined spin />
                          </Padding>
                        }
                      />
                    ) : (
                      'Close'
                    )}
                  </Button>
                </Tooltip>
              </Popconfirm>,
            ]}
          />
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
                value="form-preview"
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
                <Response surveyId={params.id} survey={survey} />
              )}
              {currentRoute === 'form-preview' && (
                <FormPreview survey={survey} navigateTo={onNavigate} />
              )}
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
  isClosingSurvey: state.ui.loading.updateSurveyStatus,
});
const dispatchToProps = {
  getSurvey,
  updateSurveyStatus,
};

export default connect(stateToProps, dispatchToProps)(Survey);
