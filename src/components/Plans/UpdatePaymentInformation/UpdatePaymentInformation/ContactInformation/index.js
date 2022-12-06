import { useState } from 'react';
import { InjectAppServices } from '../../../../../services/pure-di';
import { useIntl, FormattedMessage } from 'react-intl';
import {
  FieldGroup,
  FieldItem,
  InputFieldItem,
  PhoneFieldItem,
  EmailFieldItem,
  SubmitButton,
} from '../../../../form-helpers/form-helpers';
import { Form, Formik } from 'formik';
import { getFormInitialValues } from '../../../../../utils';
import useTimeout from '../../../../../hooks/useTimeout';
import { useNavigate } from 'react-router-dom';

const fieldNames = {
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'email',
  phone: 'phone',
};

const displayBlockStyle = {
  display: 'block',
};

export const DELAY_BEFORE_REDIRECT_TO_LOGIN = 3000;

const HAS_ERROR = 'HAS_ERROR';
const SAVED = 'SAVED';

export const ContactInformation = InjectAppServices(
  ({ dependencies: { dopplerBillingUserApiClient } }) => {
    const intl = useIntl();
    const _ = (id, values) => intl.formatMessage({ id: id }, values);
    const createTimeout = useTimeout();
    const navigate = useNavigate();
    const [status, setStatus] = useState('');

    const _getFormInitialValues = () => {
      return getFormInitialValues(fieldNames);
    };

    const sendContactInformation = async (values) => {
      const result = await dopplerBillingUserApiClient.sendContactInformation(values);
      if (result.success) {
        setStatus(SAVED);

        createTimeout(() => {
          navigate('/login');
        }, DELAY_BEFORE_REDIRECT_TO_LOGIN);
      } else {
        setStatus(HAS_ERROR);
      }
    };

    const submitContactInformationForm = async (values) => {
      sendContactInformation(values);
    };

    const showMessage = [SAVED, HAS_ERROR].includes(status);

    return (
      <li className="dp-box-shadow dp-form-successful">
        <div className="dp-wrapper-payment-process">
          <div className="dp-accordion-panel" style={displayBlockStyle}>
            <div className="dp-accordion-content">
              <div className="dp-accordion-thumb">
                {_('updatePaymentMethod.payment_method.transfer.title')}
              </div>
              <Formik
                onSubmit={submitContactInformationForm}
                initialValues={_getFormInitialValues()}
              >
                {() => (
                  <Form className="dp-form-payment-method">
                    <legend>{_('updatePaymentMethod.payment_method.transfer.title')}</legend>
                    <fieldset>
                      <FieldItem className="field-item m-t-12">
                        <p>
                          <FormattedMessage id="updatePaymentMethod.payment_method.transfer.note_legend" />
                        </p>
                      </FieldItem>
                      <FieldGroup>
                        <FieldItem className="field-item">
                          <FieldGroup>
                            <InputFieldItem
                              type="text"
                              fieldName={fieldNames.firstname}
                              id="firstname"
                              label={`*${_(
                                'updatePaymentMethod.payment_method.transfer.firstname',
                              )}`}
                              withNameValidation
                              required
                              className="field-item--50 dp-p-r"
                            />
                            <InputFieldItem
                              type="text"
                              label={`*${_(
                                'updatePaymentMethod.payment_method.transfer.lastname',
                              )}`}
                              fieldName={fieldNames.lastname}
                              id="lastname"
                              withNameValidation
                              required
                              className="field-item--50"
                            />
                          </FieldGroup>
                        </FieldItem>
                        <FieldItem className="field-item">
                          <FieldGroup>
                            <PhoneFieldItem
                              fieldName={fieldNames.phone}
                              id="phone"
                              label={`*${_('updatePaymentMethod.payment_method.transfer.phone')}`}
                              placeholder={_('forms.placeholder_phone')}
                              className="field-item--50 dp-p-r"
                              required
                            />
                            <EmailFieldItem
                              type="text"
                              fieldName={fieldNames.email}
                              id="email"
                              label={`*${_('updatePaymentMethod.payment_method.transfer.email')}`}
                              className="field-item--50"
                              required
                            />
                          </FieldGroup>
                        </FieldItem>
                        {status !== SAVED && (
                          <FieldItem className="field-item">
                            <div className="dp-buttons-actions">
                              <SubmitButton className="dp-button button-medium primary-green">
                                {_('updatePaymentMethod.payment_method.transfer.send_button')}
                              </SubmitButton>
                            </div>
                          </FieldItem>
                        )}
                        {showMessage && (
                          <FieldItem className="field-item">
                            <div
                              className={`dp-wrap-message dp-wrap-${
                                status === SAVED ? 'success' : 'cancel'
                              }`}
                              role="alert"
                              aria-label={status === SAVED ? 'success' : 'cancel'}
                            >
                              <span className="dp-message-icon" />
                              <div className="dp-content-message">
                                <p>
                                  {_(
                                    status === SAVED
                                      ? 'updatePaymentMethod.payment_method.transfer.send_email_success_message'
                                      : 'updatePaymentMethod.payment_method.transfer.send_email_error_message',
                                  )}
                                </p>
                              </div>
                            </div>
                            <hr className="m-t-24 m-b-24" />
                          </FieldItem>
                        )}
                      </FieldGroup>
                    </fieldset>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </li>
    );
  },
);
