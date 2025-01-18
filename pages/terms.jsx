import {React , useState, useEffect} from 'react';
const ClimbingBoxLoader = dynamic(() => import("react-spinners").then((mod) => mod.ClimbingBoxLoader), { ssr: false });

import '../app/globals.css'
const Terms = () => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {
        isLoading ? (
          <div className="loader">
            <ClimbingBoxLoader size={30} color={'#F37A24'} loading={isLoading} />
          </div>
        ) : <div
          style={{
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.6',
            backgroundColor: 'black',
            color: 'white',
            minHeight: '100vh',
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Terms and Conditions</h1>
          <p><strong>Effective Date:</strong> [Insert Date]</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using our website, you confirm that you are at least 18 years old (or the legal age
              of gambling in your jurisdiction) and have the legal capacity to enter into this agreement.
              If you do not agree to these Terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2>2. Use of the Website</h2>
            <ul>
              <li>You may only use this website for personal, non-commercial purposes.</li>
              <li>You agree not to use the website for illegal or unauthorized purposes.</li>
              <li>Do not attempt to interfere with the website’s functionality or security.</li>
            </ul>
          </section>

          <section>
            <h2>3. Account Registration</h2>
            <p>
              To access certain features, you may need to create an account. You are responsible
              for maintaining the confidentiality of your account details. We are not liable for
              any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2>4. Fair Play and Responsible Gambling</h2>
            <p>
              We promote fair play and responsible gambling. You agree not to use any automated tools,
              scripts, or bots to manipulate the game. Gambling involves financial risk, and we are not
              responsible for any losses incurred while using our services.
            </p>
          </section>

          <section>
            <h2>5. Payments and Withdrawals</h2>
            <p>
              Any deposits or withdrawals must comply with our payment policies. You are responsible
              for ensuring that your payment method is valid and that you have sufficient funds.
              Withdrawals may be subject to verification and processing time.
            </p>
          </section>

          <section>
            <h2>6. Limitation of Liability</h2>
            <p>
              We are not responsible for interruptions, errors, or bugs on the website, or losses or
              damages arising from your use of the website. Our liability is limited to the maximum
              extent permitted by law.
            </p>
          </section>

          <section>
            <h2>7. Governing Law</h2>
            <p>
              These Terms are governed by the laws of [Your Country/State]. Any disputes shall be
              resolved exclusively in the courts of [Your Jurisdiction].
            </p>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at [Your Contact Information].
            </p>
          </section>

          <p style={{ marginTop: '20px' }}>
            By using our website, you confirm that you have read, understood, and agreed to these Terms and Conditions.
            Enjoy playing responsibly!
          </p>
        </div>
      }
    </>

  );
};

export default Terms;
