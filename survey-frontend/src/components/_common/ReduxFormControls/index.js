import React from 'react';
import Select from 'react-select';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import moment from 'moment-timezone';
import CustomRadioButton from '../RadioButton';
import CustomSwitch from '../Switch';
import CustomCheckBox from '../Checkbox';

export const TextInputField = ({
  className,
  input,
  disabled,
  length,
  type,
  meta: { touched, error, warning },
  ...rest
}) => {
  if (length && Number.isInteger(length)) {
    rest.minLength = length;
    rest.maxLength = length;
  }
  const jsx =
    type && type.toLowerCase() === 'textarea' ? (
      <textarea
        {...input}
        disabled={disabled}
        className={`${className} input-custom`.trim()}
        {...rest}
      />
    ) : (
      <input
        {...input}
        type={type || 'text'}
        disabled={disabled}
        className={`${className} input-custom`.trim()}
        {...rest}
      />
    );
  return (
    <>
      {jsx}
      {touched && error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </>
  );
};

export const SelectInputField = ({
  options,
  name,
  label,
  placeholder,
  disabled,
  isSearchable,
  input,
  meta: { touched, error, warning },
  className = '',
  children,
  ...rest
}) => {
  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <div>
        {/*        {isMobileDevice ? <select className={`${className} mb-2 input-custom`.trim()}
                                  disabled={disabled}
                                  name={name} onChange={e => input.onChange(options.find(option => option.value === e.target.value))}>
            <option value="">{placeholder}</option>
            {options.map((option, index) => <option selected={option.value === input.value} key={index}
                                                    value={option.value}>{option.label}</option>)}
          </select> :*/}
        <Select
          {...input}
          blurInputOnSelect={false}
          isClearable={true}
          openMenuOnClick={true}
          openMenuOnFocus={true}
          hideSelectedOptions={true}
          placeholder={placeholder}
          classNamePrefix="react-select"
          className={`${className}`.trim()}
          name={name}
          isSearchable={!!isSearchable}
          options={options}
          value={input.value}
          onChange={selected => input.onChange(selected)}
          onBlur={e => e.preventDefault()}
          isDisabled={disabled}
        />
      </div>
      {touched && error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </>
  );
};

export const PhoneInputField = ({
  className,
  input,
  disabled,
  length,
  type,
  meta: { touched, error, warning },
  ...rest
}) => {
  if (length && Number.isInteger(length)) {
    rest.minLength = length;
    rest.maxLength = length;
  }

  return (
    <>
      <IntlTelInput
        fieldName={input.name}
        format={false}
        preferredCountries={['ng']}
        nationalMode={true}
        onPhoneNumberChange={(status, value, countryData, fullValue) =>
          input.onChange(value)
        }
        onPhoneNumberBlur={() => input.onBlur()}
        inputClassName={`${className} input-custom`.trim()}
        value={input.value}
        {...rest}
      />
      {touched && error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </>
  );
};

export const renderCustomControl = ({
  value,
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...rest
}) => {
  const newProps = {
    ...input,
    value: input.value,
    checked: value === input.value,
    onChange: e => input.onChange(e),
    ...rest,
  };
  let jsx = null;
  switch (type.toLowerCase()) {
    case 'radio':
      jsx = <CustomRadioButton label={label} {...newProps} />;
      break;
    case 'checkbox':
      jsx = <CustomCheckBox label={label} {...newProps} />;
      break;
    case 'switch':
      jsx = <CustomSwitch {...newProps} />;
      break;
    default:
      return;
  }
  return type ? (
    <div className="d-inline">
      {jsx}
      {touched && (
        <div className="invalid-feedback d-block">
          {error && <span>{error}</span>}
        </div>
      )}
    </div>
  ) : null;
};

export const renderNativeCheckBox = ({
  input,
  type,
  name,
  label,
  meta: { touched, error, warning },
  ...rest
}) => {
  return (
    <>
      <label>
        <input {...input} {...rest} type={type} />{' '}
        {label && (
          <strong
            style={{ fontSize: '11px', opacity: 0.7 }}
            className="text-muted text-sm"
          >
            {label}
          </strong>
        )}
      </label>
      {/*    {touched && (
      <div className="invalid-feedback d-block">
        {(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}
      </div>
    )}*/}
    </>
  );
};

export const DayPickerInputField = ({
  className,
  input,
  name,
  label,
  disabled,
  length,
  style = {},
  placeholder,
  // onChange,
  meta: { touched, error, warning },
  beforeDate,
  forTrip = true,

  ...rest
}) => {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const before = beforeDate ? new Date(beforeDate) : new Date(today.getTime());
  const datePickerProps = {
    initialMonth: new Date(),
    fromMonth: new Date(),
    toMonth: new Date(today.setMonth(today.getMonth() + 1)),
    disabledDays: {
      before,
    },
  };
  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <div className="day-picker-input-container" style={style}>
        <DayPickerInput
          parseDate={parseDate}
          formatDate={formatDate}
          format="LL"
          placeholder={placeholder || `${formatDate(new Date(), 'dd-MM-yyyy')}`}
          onDayChange={selected => input.onChange(selected)}
          value={moment(input.value)
            .tz('Africa/Lagos')
            .format('LL')}
          inputProps={{
            className,
          }}
          dayPickerProps={forTrip ? datePickerProps : undefined}
          {...rest}
        />
      </div>
      {touched && error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </>
  );
};
