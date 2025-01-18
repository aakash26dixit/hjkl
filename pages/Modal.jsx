import React from 'react'
import './Modal.css'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal = ({ closeModal }) => {

  return (
    <>
      <div className="modal_wrapper">
        <div className="modal_container">
          <div className="buttonsRow">
            <button onClick={closeModal} className="button"><FontAwesomeIcon icon={faArrowLeft} /></button>
          </div>
          <h1 className="title">You have low balance!!</h1>
          <p className="subtitle">Ahh! Short on balance, please add money by transferring money in this account</p>

          <div className="banks">
            <div className="bank">
              <p className="bankDetail"><span className="label">Account holder name:</span> Gautam Gambhir Singh</p>
              <p className="bankDetail"><span className="label">Account number:</span> 394702011276102</p>
              <p className="bankDetail"><span className="label">IFSC code:</span> UBIN0539473</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Modal