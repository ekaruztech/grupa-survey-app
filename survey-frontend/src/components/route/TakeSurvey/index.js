import React, { useState, useRef, useEffect, useReducer } from 'react';
import {
  Layout,
  Carousel,
  PageHeader,
  Button,
  Row,
  Col,
  Statistic,
  Popconfirm,
  Spin,
  Empty,
} from 'antd';
import './styles.scss';
import {
  LeftOutlined,
  RightOutlined,
  ReadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { map, find, isEmpty } from 'lodash';
import { useParams } from 'react-router';
import { Align, Padding } from '../Authentication/_common/components';
import {
  getSurvey,
  submitSurveyResponse,
  resetCurrentSurvey,
} from '../../../redux/actions';
import Question from './_commons/Question';

const answeredQuestionsReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'change':
      return map(state, o => {
        if (o.questionId === action.payload.questionId) {
          return action.payload;
        }
        return o;
      });
    default:
      return state;
  }
};
const TakeSurvey = props => {
  const {
    survey,
    isGettingSurvey,
    getSurvey,
    submitSurveyResponse,
    isSubmittingResponse,
    resetCurrentSurvey,
  } = props;

  const params = useParams();
  const [answerState, dispatch] = useReducer(answeredQuestionsReducer, []);
  const questionsRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(
    !isEmpty(survey?.questions) ? survey?.questions?.[0] : null
  );
  const surveyId = params?.id || '';
  const onChange = value => console.log(value);
  const onAnswerSelected = value => {
    const alreadyExisting = find(
      answerState,
      o => o.questionId === value?.questionId
    );
    if (!isEmpty(alreadyExisting)) {
      dispatch({ type: 'change', payload: value });
    } else {
      dispatch({ type: 'add', payload: value });
    }
  };
  const handleSubmit = () => {
    submitSurveyResponse(
      surveyId,
      {
        results: map(answerState, o => ({
          question: o.questionId,
          value: o.value,
        })),
      },
      {},
      'submitSurveyResponse',
      () => {
        resetCurrentSurvey();
        window.history.back();
      }
    );
  };

  useEffect(() => {
    setCurrentQuestion(
      !isEmpty(survey?.questions) ? survey?.questions?.[0] : null
    );
  }, [survey]);
  useEffect(() => {
    getSurvey(surveyId);
  }, []);
  return (
    <Layout style={{ overflow: 'hidden' }}>
      {isGettingSurvey || isSubmittingResponse ? (
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
                    <Padding top={20}>
                      {isSubmittingResponse
                        ? 'Please wait while we submit your answers'
                        : 'Loading'}
                    </Padding>
                  </Align>
                </Padding>
              }
            />
          </Align>
        </motion.div>
      ) : (
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          {(survey?.questions?.length || 0) < 1 && (
            <Align
              alignCenter
              justifyCenter
              style={{
                width: '100%',
                minHeight: 500,
                height: 'calc(100vh - 130px)',
              }}
            >
              <Empty
                description={
                  <span>This survey currently has no questions</span>
                }
              >
                {' '}
                <Button
                  type="primary"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  Go back to surveys
                </Button>
              </Empty>
            </Align>
          )}
          {(survey?.questions?.length || 0) >= 1 && (
            <>
              <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={survey?.name || 'Untitled survey'}
                extra={[
                  <Popconfirm
                    placement="bottomRight"
                    title={'Are you sure you want to cancel this survey?'}
                    onConfirm={() => window.history.back()}
                    okText="Yes"
                    cancelText="No"
                    key={'cancel-button'}
                  >
                    <Button ghost type={'danger'}>
                      Cancel
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <Align alignCenter justifyBetween>
                  <Padding right={10}>
                    <Button icon={<ReadOutlined />} type={'link'}>
                      {survey?.questions?.length || 0} questions
                    </Button>
                  </Padding>
                  <Align alignCenter>
                    <Padding right={10} key={'question-title'}>
                      Question
                    </Padding>
                    <Statistic
                      key={'question-count'}
                      value={currentSlide}
                      suffix={`/ ${survey?.questions?.length || 0}`}
                    />
                  </Align>
                </Align>
              </PageHeader>
              <Row>
                <Col span={24}>
                  <Carousel
                    afterChange={onChange}
                    dots={false}
                    ref={questionsRef}
                  >
                    {(survey?.questions || []).map((question, index) => {
                      return (
                        <Question
                          key={question?._id}
                          className={'carousel-form'}
                          span={24}
                          offset={0}
                          question={question}
                          onAnswerSelected={onAnswerSelected}
                          answer={
                            find(
                              answerState,
                              o => o.questionId === question._id
                            )?._id || null
                          }
                          questionId={question._id}
                        />
                      );
                    })}
                  </Carousel>
                </Col>
                <Col span={24}>
                  <Padding top={20}>
                    <Align
                      alignCenter
                      justifyBetween={currentSlide >= 2}
                      justifyEnd={currentSlide < 2}
                    >
                      {currentSlide >= 2 && (
                        <motion.div layout>
                          {' '}
                          <Button
                            icon={<LeftOutlined />}
                            onClick={() => {
                              setCurrentSlide(prevSlide => {
                                setCurrentQuestion(prevQuestion =>
                                  !isEmpty(survey?.questions)
                                    ? survey?.questions?.[prevSlide - 2]
                                    : prevQuestion
                                );
                                return prevSlide - 1;
                              });
                              questionsRef.current?.prev?.();
                            }}
                          >
                            Previous
                          </Button>
                        </motion.div>
                      )}
                      {currentSlide < (survey?.questions?.length || 0) && (
                        <motion.div layout>
                          <Button
                            type={'primary'}
                            disabled={isEmpty(
                              find(
                                answerState,
                                o => o.questionId === currentQuestion?._id
                              )
                            )}
                            onClick={() => {
                              setCurrentSlide(prevSlide => {
                                setCurrentQuestion(prevQuestion =>
                                  !isEmpty(survey?.questions)
                                    ? survey?.questions?.[prevSlide]
                                    : prevQuestion
                                );
                                return prevSlide + 1;
                              });
                              questionsRef.current?.next?.();
                            }}
                          >
                            Next <RightOutlined />
                          </Button>
                        </motion.div>
                      )}
                      {currentSlide === (survey?.questions?.length || 0) && (
                        <motion.div layout>
                          <Button
                            disabled={isEmpty(
                              find(
                                answerState,
                                o => o.questionId === currentQuestion?._id
                              )
                            )}
                            type={'primary'}
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
                        </motion.div>
                      )}
                    </Align>
                  </Padding>
                </Col>
              </Row>
            </>
          )}
        </motion.div>
      )}
    </Layout>
  );
};

const stateToProps = state => ({
  survey: state.surveys.current,
  isGettingSurvey: state.ui.loading.getSurvey,
  isSubmittingResponse: state.ui.loading.submitSurveyResponse,
});
const dispatchToProps = {
  getSurvey,
  submitSurveyResponse,
  resetCurrentSurvey,
};
export default connect(stateToProps, dispatchToProps)(TakeSurvey);
