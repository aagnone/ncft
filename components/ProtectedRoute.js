import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../context/context';
import Section from './Section';
import SmallHeader from './SmallHeader';

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username ? props.children : props.fallback || <><SmallHeader page="Unauthorized"/><Section><div className="mx-auto text-center"><Link href="/enter">You must be signed in. Click here to access the site.</Link></div></Section></>;
}