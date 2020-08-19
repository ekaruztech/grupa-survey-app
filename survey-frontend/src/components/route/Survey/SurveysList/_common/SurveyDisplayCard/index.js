import React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Button } from 'antd';
import { EditOutlined, CompassOutlined } from '@ant-design/icons';
import { Align, Padding } from '../../../../Authentication/_common/components';

const Index = props => {
  const { name, responseCount, id } = props;
  const history = useHistory();
  return (
    <Col span={6}>
      <Padding style={{ height: '100%' }}>
        <Align
          style={{ height: 250 }}
          alignCenter
          justifyCenter
          type={'column'}
        >
          <p>{name}</p>
          <p className={'text2'}>{responseCount} Responses</p>
        </Align>
        <Align
          style={{
            height: 50,
            borderTop: '1px solid var(--border-default-color)',
          }}
          alignCenter
          justifyBetween
        >
          <Button
            type={'link'}
            onClick={() => history.push(`/surveys/${id}`)}
            icon={<CompassOutlined />}
          >
            View
          </Button>

          <Button
            type={'link'}
            onClick={() => null}
            icon={<EditOutlined key="edit" />}
          >
            Edit
          </Button>
        </Align>
      </Padding>
    </Col>
  );
};

export default Index;
