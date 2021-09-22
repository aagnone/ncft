import React from 'react'
import Section from '../components/Section'
import SmallHeader from '../components/SmallHeader'

const created_account = () => {
  return (
    <>
      <SmallHeader page="Welcome" />
      <Section>
        <div className="w-full pb-64 -mt-32 mx-auto">
          <h1>Your Account has been created!</h1>
          <p>
            Please allow the administrator to verify you account. Full site access will be granted once they have done
            so.
          </p>
          <p>If you believe you&apos;ve reached this message in error, try the page again or by logging out and logging back in. We apologize for the inconvenience.</p>
        </div>
      </Section>
    </>
  )
}

export default created_account
