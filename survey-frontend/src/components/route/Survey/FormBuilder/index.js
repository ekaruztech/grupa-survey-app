import { Button, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Align, Padding } from '../../Authentication/_common/components';
import { addOrUpdateSurveyQuestion, deleteSurveyQuestion, getSurvey } from '../../../../redux/actions';
import QuestionDisplay from './_common/QuestionDisplay';
import AddQuestionForm from './_common/AddQuestionForm';
import './styles.scss';

const FormBuilder = props => {
  const {
    getSurvey,
    addOrUpdateSurveyQuestion,
    deleteSurveyQuestion,
    isDeletingSurveyQuestion,
    isGettingSurvey,
    isUpdatingSurveyQuestion,
    survey,
    surveyId,
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
      surveyId,
      questionData,
      {},
      'addOrUpdateQuestion',
      onSuccess
    );
  };
  const removeQuestion = id => {
    deleteSurveyQuestion(surveyId, id);
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
