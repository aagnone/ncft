import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Section from '../../components/Section'
import SmallHeader from '../../components/SmallHeader'
import { db } from '../../lib/firebase'
import AdminNav from '../../components/AdminNav'

const VerifyAccounts = () => {
  const [value, loading, error] = useCollection(db.collection('users').where('isVerified', '==', false), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })
  const [valueAdmin, loadingAdmin, errorAdmin] = useCollection(db.collection('users').where('isAdmin', '==', false), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const updateAccount = (user, field) => {
    const userRef = db.collection('users').doc(user.id)
    return userRef
      .update({
        [field]: true,
      })
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
  }

  return (
    <>
      <SmallHeader page="Verify Accounts" />
      <Section>
        <div className="w-full">
          <AdminNav />
          <div>
            <h2 className="text-lg text-main text-center mb-4">Unverified Accounts</h2>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value && (
              <div>
                {value.docs.map((doc) => (
                  <div className="w-full flex justify-between" key={doc.id}>
                    <p>{doc.data().username}</p>
                    <button
                      className="bg-main bg-gradient-to-r from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light hover:to-main"
                      onClick={() => updateAccount(doc, 'isVerified')}
                    >
                      Verify Account
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg text-main text-center mb-4">Non Admin Accounts</h2>
            {errorAdmin && <strong>Error: {JSON.stringify(errorAdmin)}</strong>}
            {loadingAdmin && <span>Collection: Loading...</span>}
            {valueAdmin && (
              <div>
                {valueAdmin.docs.map((doc) => (
                  <div className="w-full flex justify-between" key={doc.id}>
                    <p>{doc.data().username}</p>
                    <button
                      className="bg-main bg-gradient-to-r from-main to-secondary-light border-0 p-2 px-4 rounded-2xl -mt-2 hover:from-secondary-light hover:to-main"
                      onClick={() => updateAccount(doc, 'isAdmin')}
                    >
                      Make Admin
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}

export default VerifyAccounts
