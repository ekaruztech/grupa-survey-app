import { Button, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Padding, Align } from '../../Authentication/_common/components';
import './styles.scss';
import {
  getSurvey,
  addOrUpdateSurveyQuestion,
  deleteSurveyQuestion,
} from '../../../../redux/actions';
import QuestionDisplay from './_common/QuestionDisplay';
import AddQuestionForm from './_common/AddQuestionForm';
import { connect } from 'react-redux';
import { has } from 'lodash';

const FormBuilder = props => {
  const {
    getSurvey,
    addOrUpdateSurveyQuestion,
    deleteSurveyQuestion,
    isDeletingSurveyQuestion,
    isGettingSurvey,
    isUpdatingSurveyQuestion,
    survey,
  } = props;
  const [hideQuestionCreator, setHideQuestionCreator] = useState(false);
  const [allQuestions, setAllQuestions] = useState(survey?.questions || []);
  const [initialFormState, setInitialFormState] = useState([]);
  const resetInitialFormState = () => {
    setInitialFormState({});
  };

  useEffect(() => {
    const formContainer = document.querySelector(
      '.sv-form-builder-question-form-wrapper'
    );
    if (formContainer) {
      formContainer.scrollIntoView();
    }
  }, [survey]);
  const addQuestionToSurvey = (questionData, onSuccess) => {
    addOrUpdateSurveyQuestion(
      '5f3afb688fe57cb1a902c0d1',
      questionData,
      {},
      'addOrUpdateQuestion',
      onSuccess
    );
  };
  const removeQuestion = id => {
    deleteSurveyQuestion('5f3afb688fe57cb1a902c0d1', id);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        {(survey?.questions || []).map(question => {
          return (
            <QuestionDisplay
              key={question._id}
              question={question}
              removeQuestion={removeQuestion}
              setHideQuestionCreator={setHideQuestionCreator}
              setInitialFormState={setInitialFormState}
              hideDisplay={initialFormState._id === question._id}
              isDeletingQuestion={isDeletingSurveyQuestion}
            />
          );
        })}
        {!hideQuestionCreator && (
          <AddQuestionForm
            addQuestionToSurvey={addQuestionToSurvey}
            setHideQuestionCreator={setHideQuestionCreator}
            initialValues={initialFormState}
            resetInitialFormState={resetInitialFormState}
            allQuestions={survey?.question || []}
            isAddingQuestion={isUpdatingSurveyQuestion}
          />
        )}
      </Row>

      <Align alignCenter justifyCenter>
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
      </Align>
    </>
  );
};
const stateToProps = state => ({
  isDeletingSurveyQuestion: state.ui.loading.deleteSurveyQuesiton,
  isGettingSurvey: state.ui.loading.getSurvey,
  isUpdatingSurveyQuestion: state.ui.loading.addOrUpdateQuestion,
  survey: state.surveys.current,
});
const dispatchToProps = {
  getSurvey,
  addOrUpdateSurveyQuestion,
  deleteSurveyQuestion,
};
export default connect(stateToProps, dispatchToProps)(FormBuilder);
