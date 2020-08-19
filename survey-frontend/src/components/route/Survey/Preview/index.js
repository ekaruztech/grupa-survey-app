import React from 'react';
import { Row, Empty, Button } from 'antd';
import { Align } from '../../Authentication/_common/components';
import Question from './_commons/Questions';

const FormPreview = props => {
  const { survey, navigateTo } = props;

  return (
    <>
      <Row gutter={[20, 20]}>
        {survey?.questions?.length < 1 && (
          <Align
            alignCenter
            justifyCenter
            style={{ width: '100%', minHeight: 500 }}
          >
            <Empty
              description={<span>Your form currently has no questions</span>}
            >
              <Button
                type="primary"
                onClick={() => {
                  navigateTo('form-builder');
                }}
              >
                Create one now
              </Button>
            </Empty>
          </Align>
        )}
        {(survey?.questions || []).map(question => {
          return <Question key={question._id} question={question} />;
        })}
      </Row>
    </>
  );
};

export default FormPreview;
