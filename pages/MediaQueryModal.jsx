import React from 'react'
import '../pages/mediaquery_modal.css'

const MediaQueryModal = () => {

  return (
    <>
      <div className="modal_wrapper">
        <div className="modal_container">
          <div className="buttonsRow">
            {/* <button className={styles.button}><FontAwesomeIcon icon={faArrowLeft} /></button> */}
          </div>
          <h1 className="title">Compatibility issue!!</h1>
          <p className="subtitle">This table is only compatible with mobile devices</p>

          {/* <div className={styles.banks}>
            <div className={styles.bank}>
              <p className={styles.bankDetail}><span className={styles.label}>Account holder name:</span> Gautam Gambhir Singh</p>
              <p className={styles.bankDetail}><span className={styles.label}>Account number:</span> 394702011276102</p>
              <p className={styles.bankDetail}><span className={styles.label}>IFSC code:</span> UBIN0539473</p>
            </div>
          </div> */}
        </div>
      </div>

    </>
  )
}

export default MediaQueryModal