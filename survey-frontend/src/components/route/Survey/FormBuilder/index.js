import { Button, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Padding } from '../../Authentication/_common/components';
import './styles.scss';
import QuestionDisplay from './_common/QuestionDisplay';
import AddQuestionForm from './_common/AddQuestionForm';

const FormBuilder = props => {
  const [hideQuestionCreator, setHideQuestionCreator] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [initialFormState, setInitialFormState] = useState([]);
  const resetInitialFormState = () => {
    setInitialFormState({});
  };
  const removeQuestion = id => {
    setAllQuestions(prev => prev.filter(o => o.id !== id));
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Row gutter={[20, 20]}>
        {allQuestions.map(question => {
          return (
            <QuestionDisplay
              key={question.id}
              question={question}
              removeQuestion={removeQuestion}
              setHideQuestionCreator={setHideQuestionCreator}
              setInitialFormState={setInitialFormState}
            />
          );
        })}
        {!hideQuestionCreator && (
          <AddQuestionForm
            setAllQuestions={setAllQuestions}
            setHideQuestionCreator={setHideQuestionCreator}
            initialValues={initialFormState}
            resetInitialFormState={resetInitialFormState}
          />
        )}
      </Row>

      <Padding top={30}>
        <Button
          type="primary"
          onClick={() => setHideQuestionCreator(false)}
          style={{ height: 45 }}
          icon={<PlusOutlined style={{ fontSize: 20 }} />}
        >
          Add Question
        </Button>
      </Padding>
    </>
  );
};

export default FormBuilder;
