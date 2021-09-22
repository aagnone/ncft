import { createContext } from 'react';

export const UserContext = createContext({ user: null, username: null, isVerified: false, isAdmin: false });
export const SiteDataContext = createContext({ phone: null, email: null, address: false, mission: false, lead: false });