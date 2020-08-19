import { motion } from 'framer-motion';
import { Card, Col, PageHeader, Row, Skeleton, Spin, Typography } from 'antd';
import React from 'react';
import Chart from 'react-apexcharts';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Align,
  Margin,
  Padding,
} from '../../Authentication/_common/components';

const ResponseCard = props => {
  const { question, answers } = props;

  const generateRandom = () => {
    return Array(Math.floor(Math.random() * 5 + 1))
      .fill(0)
      .map(v => Math.floor(Math.random() * 500 + 1));
  };
  const dummyData = generateRandom();

  const dummyOptions = {
    labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'],
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    colors: ['#1F78B4', '#A6CEE3', '#E91E63', '#546E7A', '#B2DF8A'],
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return Number(val).toFixed(2) + '%';
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Poppins, Arial, sans-serif',
        fontWeight: 'bold',
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: 'rgba(0, 0, 0, 0.4)',
        opacity: 0.45,
      },
    },
  };
  return (
    <Col span={12}>
      <Card
        className={'sv-survey-response-card'}
        title={
          <Align type={'column'}>
            <Typography.Paragraph>
              How many players won the gold medal at the olympics 2010
            </Typography.Paragraph>
            <Padding top={5}>
              <Typography.Paragraph
                style={{
                  color: 'var(--primary-color)',
                  fontWeight: 400,
                }}
              >
                234 responses
              </Typography.Paragraph>
            </Padding>
          </Align>
        }
      >
        <Skeleton loading={false} active>
          <Align alignCenter justifyCenter>
            <Chart
              options={dummyOptions}
              series={dummyData}
              type="donut"
              width="380"
            />
          </Align>
        </Skeleton>
      </Card>
    </Col>
  );
};

const Response = () => {
  const loadingResponses = false;
  return (
    <>
      {loadingResponses && (
        <Margin top={40} bottom={40}>
          <motion.div layout>
            <Align alignCenter justifyCenter>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </Align>
          </motion.div>
        </Margin>
      )}

      <Margin bottom={30}>
        <PageHeader
          className="sv-survey-response-page-header"
          title="3000 responses"
        />
      </Margin>
      <Row gutter={[10, 10]}>
        {Array(10)
          .fill(Math.random())
          .map((value, index) => {
            return <ResponseCard key={index} />;
          })}
      </Row>
    </>
  );
};

export default Response;
