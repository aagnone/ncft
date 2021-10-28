import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../context/context'
import Section from './Section'
import SmallHeader from './SmallHeader'

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username, isVerified } = useContext(UserContext)

  return isVerified
    ? props.children
    : props.fallback || (
        <>
          <SmallHeader page="Unauthorized" />
          <Section>
            <div className="mx-auto text-center">
              {username ? (
                'You are currently registered but the admin has yet to verify your account. Please try again later or contact your admin.'
              ) : (
                <Link href="/register">
                  You must be signed in and verified to access the site. Click here to access the site.
                </Link>
              )}
            </div>
          </Section>
        </>
      )
}
