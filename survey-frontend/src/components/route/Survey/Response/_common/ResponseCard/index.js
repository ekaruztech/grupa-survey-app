import { Card, Col, Skeleton, Typography } from 'antd';
import Chart from 'react-apexcharts';
import React from 'react';
import { truncate } from 'lodash';
import { Align, Padding } from '../../../../Authentication/_common/components';

const ResponseCard = props => {
  const { survey, surveyResponse, question } = props;

  const generateData = () => {
    const currentResponse = surveyResponse[question?._id];
    const currentResponseNamesToArray = Object.keys(currentResponse || {});
    return (question?.options || []).reduce(
      (prev, cur) => {
        if (currentResponseNamesToArray.includes(cur.value)) {
          return {
            ...prev,
            series: [...prev.series, currentResponse[cur.value]],
            labels: [
              ...prev.labels,
              truncate(cur.value, {
                length: 25,
                omission: ' ...',
              }),
            ],
          };
        } else {
          return {
            ...prev,
            series: [...prev.series, 0],
            labels: [
              ...prev.labels,
              truncate(cur.value, {
                length: 25,
                omission: ' ...',
              }),
            ],
          };
        }
      },
      { labels: [], series: [] }
    );
  };
  const data = generateData();

  const dataOptions = {
    labels: data.labels,
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
            <Typography.Paragraph>{question?.label}</Typography.Paragraph>
          </Align>
        }
      >
        <Skeleton loading={false} active>
          <Align alignCenter justifyCenter>
            <Chart
              options={dataOptions}
              series={data.series}
              type="donut"
              width="380"
            />
          </Align>
        </Skeleton>
      </Card>
    </Col>
  );
};
export default ResponseCard;
