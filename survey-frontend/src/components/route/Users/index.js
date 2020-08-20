import React, { useState, useRef } from 'react';
import {
  Layout,
  Carousel,
  PageHeader,
  Button,
  Row,
  Col,
  Statistic,
} from 'antd';
import './users.scss';
import {
  LeftOutlined,
  RightOutlined,
  ReadOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Align, Padding } from '../Authentication/_common/components';
import Question from './_commons/Question';

const Users = () => {
  const onChange = value => console.log(value);
  const questionsRef = useRef();
  const questions = Array(10).fill(10);
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <Layout style={{ overflow: 'hidden' }}>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Randomized quizzes"
      >
        <Align alignCenter justifyBetween>
          <Padding right={10}>
            <Button icon={<ReadOutlined />} type={'link'}>
              7 questions
            </Button>
          </Padding>
          <Align alignCenter>
            <Padding right={10} key={'question-title'}>
              Question
            </Padding>
            <Statistic
              key={'question-count'}
              value={currentSlide}
              suffix={`/ ${questions.length}`}
            />
          </Align>
        </Align>
      </PageHeader>
      <Row>
        <Col span={24}>
          <Carousel afterChange={onChange} dots={false} ref={questionsRef}>
            {questions.map((value, index) => {
              return (
                <Question
                  key={index}
                  className={'carousel-form'}
                  span={24}
                  offset={0}
                  question={{
                    label: 'Who is the first president of Nigeria',
                    description: 'Whatever you do, do good',
                    options: [
                      { label: 'Lauriel Michel', value: 1 },
                      { label: 'Emmanuel Okafor', value: 11 },
                      { label: 'Emmanuel Jackson', value: 111 },
                      { label: 'Abraham LinkedIn', value: 1111 },
                    ],
                  }}
                />
              );
            })}
          </Carousel>
        </Col>
        <Col span={24}>
          <Padding top={30}>
            <Align
              alignCenter
              justifyBetween={
                currentSlide >= 2 && currentSlide < questions?.length
              }
              justifyEnd={currentSlide < 2}
            >
              {currentSlide >= 2 && (
                <motion.div layout>
                  {' '}
                  <Button
                    icon={<LeftOutlined />}
                    onClick={() => {
                      setCurrentSlide(prev => prev - 1);
                      questionsRef.current?.prev?.();
                    }}
                  >
                    Previous
                  </Button>
                </motion.div>
              )}
              {currentSlide < questions.length && (
                <motion.div layout>
                  <Button
                    type={'primary'}
                    onClick={() => {
                      setCurrentSlide(prev => prev + 1);
                      questionsRef.current?.next?.();
                    }}
                  >
                    Next <RightOutlined />
                  </Button>
                </motion.div>
              )}
            </Align>
          </Padding>
        </Col>
      </Row>
    </Layout>
  );
};

export default Users;
