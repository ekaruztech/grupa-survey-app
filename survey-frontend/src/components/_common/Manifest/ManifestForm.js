import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { SelectInputField, TextInputField } from '../ReduxFormControls';
import { Button } from '../Styled/Button';
import { options } from '../../../utils/data';
import Progress from '../Progress';

const required = value => (value ? undefined : 'Please select departure point');
const ManifestForm = props => {
  const { handleSubmit, formLoading } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
          <Field
            validate={required}
            name="mobile"
            type="mobile"
            disabled={formLoading}
            className="large"
            component={TextInputField}
            placeholder="Mobile Number*"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
          <Field
            validate={required}
            name="name"
            type="text"
            disabled={formLoading}
            className="large"
            component={TextInputField}
            placeholder="Full name*"
          />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
          <Field
            name="email"
            type="email"
            disabled={formLoading}
            className="large"
            component={TextInputField}
            placeholder="Email"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
          <Field
            validate={required}
            name="next_of_kin_name"
            type="text"
            disabled={formLoading}
            className="large"
            component={TextInputField}
            placeholder="Next of Kin Name*"
          />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
          <Field
            validate={required}
            name="next_of_kin_mobile"
            type="text"
            disabled={formLoading}
            className="large"
            component={TextInputField}
            placeholder="Next of Kin  Mobile Number*"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
          <Field
            name="gender"
            disabled={formLoading}
            options={options.gender}
            component={SelectInputField}
            placeholder="Gender..."
          />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
          <Field
            name="blood_group"
            disabled={formLoading}
            options={options.bloodGroup}
            component={SelectInputField}
            placeholder="Blood group..."
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
          <Field
            name="destination"
            type="text"
            disabled={formLoading}
            className="large"
            component={TextInputField}
            placeholder="Closest Destination / Landmark"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-auto">
          <Button
            disabled={formLoading}
            type="submit"
            size="md"
            color="primary"
          >
            {formLoading ? <Progress className="alt" /> : 'Save'}
          </Button>
          {!formLoading && (
            <Button type="button" color="grey" size="sm" className="ml-2 share">
              <i className="fa fa-share-alt"> </i>
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};

const mapStateToProps = (state, ownProps) => ({
  form: ownProps.formName || 'userTripManifestForm',
});

export default compose(
  connect(mapStateToProps),
  reduxForm({
    //other redux-form options...
    touchOnChange: true,
  })
)(ManifestForm);
