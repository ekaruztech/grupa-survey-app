import React from 'react';
import { connect } from 'react-redux';
import ShadowedBoxContainer from '../ShadowedBoxContainer';
import Modal from '../Modal';
import '../Authentication/Authentication.scss';
import { closeModal, login } from '../../../redux/actions';
import ManifestForm from '../../_common/Manifest/ManifestForm';
import { Button } from '../Styled/Button';

const ManifestModal = props => {
  const {
    isOpen,
    closeModal,
    booking,
    handleManifestSave,
    isUpdatingManifest,
    seat_number,
    formValues,
  } = props;

  const handleManifestFormSubmit = values => {
    handleManifestSave(booking._id, seat_number, values);
  };

  const initialValues =
    (formValues && {
      ...formValues,
      gender: formValues.gender
        ? { label: formValues.gender, value: formValues.gender }
        : '',
      blood_group: formValues.blood_group
        ? { label: formValues.blood_group, value: formValues.blood_group }
        : '',
    }) ||
    {};
  return (
    <Modal isOpen={isOpen}>
      <div className="Auth-Wrapper">
        <ShadowedBoxContainer className="Authentication col-xl-4 col-lg-6 col-md-8 col-12 mx-auto manifest-modal">
          <span
            className="close-auth-modal"
            onClick={() => closeModal('manifest')}
          >
            X
          </span>
          <div className="title-wrapper">
            <h4 className="title">Update Manifest</h4>
            <Button
              style={{ cursor: 'default' }}
              className="ml-2"
              color="white"
              size="sm"
              noHover
            >
              Seat no: <span className="text-black-50">{seat_number}</span>
            </Button>
          </div>
          <div className="manifest-item mb-3">
            <ManifestForm
              seat_number={seat_number}
              initialValues={initialValues}
              formName={`manifestForm_${booking._id}_${seat_number}`}
              formLoading={isUpdatingManifest(booking._id, seat_number)}
              onSubmit={handleManifestFormSubmit}
            />
          </div>
        </ShadowedBoxContainer>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isUpdatingManifest: (bookingId, seatNumber) =>
    state.ui.loading[`manifest_${bookingId}_${seatNumber}`],
});
const mapDispatchToProps = {
  login,
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManifestModal);
