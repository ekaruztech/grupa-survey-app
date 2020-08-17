import * as moment from 'moment-timezone';
import React, { Fragment } from 'react';
import get from 'lodash/get';

export const formatToLocalCurrency = amount => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(Number(amount));
};

export const createActionType = (type, entity = 'App') => ({
  START: `@@[${entity}] ${type}`,
  SUCCESS: `@@[${entity}] ${type}_SUCCESS`,
  ERROR: `@@[${entity}] ${type}_ERROR`,
  END: `@@[${entity}] ${type}_END`,
});

export const arrayToObjectByProp = (array, prop) =>
  array.reduce((obj, item) => {
    obj[item[prop]] = item;
    return obj;
  }, {});

export const searchDateArray = (count = 7, startDate) => {
  const array = [];
  let current = moment().tz('Africa/Lagos');
  if (startDate) {
    current = moment(startDate)
      .tz('Africa/Lagos')
      .add(1, 'days');
  }
  for (let i = 0; i < count; i++) {
    const dateData = {
      value: current.format('YYYY-MM-DD'),
      label: current.format('dddd, DD MMM YYYY'),
    };
    current.date(current.date() + 1);
    array.push(dateData);
  }
  return array;
};

export const formatMessagesFromError = error => {
  let message = '';
  if (error) {
    if (error.message) {
      message = <span>{error.message}</span>;
    }
    if (error.messages) {
      message = error.message && <h6 className="mb-0"> {error.message}</h6>;
    }
  }
  return (
    <>
      {message}
      {!!error && !!error.messages && (
        <ul className="pl-1">
          {Object.keys(error.messages).map(item => {
            return (
              Array.isArray(error.messages[item]) &&
              error.messages[item].map((item2, i) => <li key={i}>{item2}</li>)
            );
          })}
        </ul>
      )}
    </>
  );
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const addProtocol = url => {
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return url;
};
