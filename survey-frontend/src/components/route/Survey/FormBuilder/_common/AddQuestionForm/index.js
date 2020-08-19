import React, { useReducer, useState } from 'react';
import { filter, has, isEmpty, last, map } from 'lodash';
import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { motion } from 'framer-motion';
import { CopyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Align, Padding } from '../../../../Authentication/_common/components';
import QuestionOption from '../QuestionOption';

const optionsReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'update':
      return map(state, o =>
        o.key === action.payload.key ? { ...o, ...payload, key: o.key } : o
      );
    case 'remove':
      return state.length <= 1
        ? [{ key: 1, value: 'Option 1' }]
        : filter(state, o => o.key !== payload.key);
    case 'add':
      return state.length < 5 ? [...state, payload] : state;
    case 'reset':
      return [{ key: 0, value: 'Option 1' }];
    default:
      return state;
  }
};
const AddQuestionForm = props => {
  const {
    setAllQuestions,
    setHideQuestionCreator,
    initialValues,
    resetInitialFormState,
  } = props;
  const [showDescription, setShowDescription] = useState(false);
  const [optionsState, dispatch] = useReducer(
    optionsReducer,
    isEmpty(initialValues?.options)
      ? [{ key: 1, value: 'Option 1' }]
      : initialValues?.options
  );

  const [question, setQuestion] = useState(
    !isEmpty(initialValues?.question)
      ? initialValues?.question
      : 'Untitled question'
  );
  const [description, setDescription] = useState(
    !isEmpty(initialValues?.description) ? initialValues.description : ''
  );
  const saveQuestion = () => {
    const questionData = {
      id: Math.random(),
      question,
      answers: optionsState.map(({ value }) => value),
      ...(!isEmpty(description) ? { description } : {}),
    };
    if (has(initialValues, 'id')) {
      resetInitialFormState();
    }
    setAllQuestions(prev => [...prev, questionData]);

    dispatch({ type: 'reset' });
    setHideQuestionCreator(true);
  };

  const addOption = () => {
    const key = parseInt(last(optionsState)?.key || 0, 10) + 1;
    dispatch({
      type: 'add',
      payload: {
        key,
        value: `Option ${key}`,
      },
    });
  };
  return (
    <Col span={16}>
      <motion.div layout className={'sv-form-builder-question-form-wrapper'}>
        <Padding
          top={30}
          bottom={10}
          left={30}
          right={30}
          style={{ height: '100%' }}
        >
          <Row
            style={{ height: '100%' }}
            justify="center"
            align="top"
            gutter={[10]}
          >
            <Col span={24}>
              <Input
                placeholder="Type your question here..."
                style={{ height: 45 }}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                autoFocus={true}
              />
            </Col>
            {showDescription && (
              <Col span={24}>
                <Padding top={20} bottom={20}>
                  <motion.div layout>
                    <Input.TextArea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Description"
                      autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                  </motion.div>
                </Padding>
              </Col>
            )}
            {optionsState.map(option => {
              return (
                <QuestionOption
                  key={option?.key}
                  optionKey={option?.key}
                  value={option?.value || ''}
                  removeOption={() =>
                    dispatch({
                      type: 'remove',
                      payload: { key: option?.key },
                    })
                  }
                  updateOption={newValue => {
                    console.log(newValue);
                    dispatch({ type: 'update', payload: newValue });
                  }}
                />
              );
            })}
            <Col span={24}>
              <motion.div layout>
                <Padding top={10} bottom={15}>
                  <Row>
                    <Col span={24}>
                      <Align type={'row'} alignCenter>
                        <Padding>
                          <PlusOutlined
                            style={{ color: 'var(--primary-color)' }}
                          />
                        </Padding>
                        <Button
                          disabled={optionsState.length >= 5}
                          type="link"
                          onClick={addOption}
                        >
                          Add option
                        </Button>
                      </Align>
                    </Col>
                  </Row>
                </Padding>
              </motion.div>
            </Col>

            <Divider style={{ margin: 10 }} />

            <Col span={24}>
              <motion.div layout>
                <Align alignCenter justifyBetween>
                  <Align alignCenter>
                    <Padding right={10}>
                      <Typography.Text>Description</Typography.Text>
                    </Padding>
                    <Switch
                      checked={showDescription}
                      size={'small'}
                      onChange={() => setShowDescription(prev => !prev)}
                    />
                  </Align>
                  <Align alignCenter>
                    <Align alignCenter>
                      <Tooltip title={'Duplicate'}>
                        <Button
                          shape={'circle'}
                          type="text"
                          icon={<CopyOutlined />}
                          onClick={() => {
                            saveQuestion();
                            setHideQuestionCreator(false);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={'Delete'}>
                        <Button
                          shape={'circle'}
                          type="text"
                          onClick={() => setHideQuestionCreator(true)}
                          icon={<DeleteOutlined />}
                        />
                      </Tooltip>
                    </Align>
                    <Divider type={'vertical'} height={30} />
                    <Align alignCenter>
                      <Button type="primary" onClick={saveQuestion}>
                        Save
                      </Button>
                    </Align>
                  </Align>
                </Align>
              </motion.div>
            </Col>
          </Row>
        </Padding>
      </motion.div>
    </Col>
  );
};

export default AddQuestionForm;
