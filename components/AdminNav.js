import React from 'react';
import Link from 'next/link'

const AdminNav = () => {
    return (
        <ul className="w-full flex bg-main text-white justify-between mx-auto lg:w-3/4 p-3 px-6 rounded-md mb-8">
            <li className="hover:underline"><Link href="/admin">Admin Home</Link></li>
            <li className="hover:underline"><Link href="/admin/verify_accounts">Authorize Accounts</Link></li>
            <li className="hover:underline"><Link href="/admin/site_info">Update Site Info</Link></li>
            <li className="hover:underline"><Link href="/admin/faq">Add FAQ</Link></li>
      </ul>
    );
};

export default AdminNav;