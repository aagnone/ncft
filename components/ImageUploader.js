import React from 'react'
import { useState } from 'react'
import { auth, storage, STATE_CHANGED } from '../lib/firebase'
import FloatingInput from './FloatingInput'
import Form from './Form'
import Loader from './Loader'

// Uploads images to Firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState(null)
  const [name, setName] = useState('')

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0]
    const extension = file.type.split('/')[1]

    // Makes reference to the storage bucket location
    const ref = storage.ref(`uploads/${name}.${extension}`)
    setUploading(true)

    // Starts the upload
    const task = ref.put(file)

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
      setProgress(pct)

      // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url)
          setUploading(false)
        })
    })
  }

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <Form>
            <FloatingInput type="text" name="name" value={name} onchange={(e) => setName(e.target.value)} />
          </Form>
          <label className="btn">
            📸 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg,application/pdf,application/vnd.ms-excel"
            />
          </label>
        </>
      )}

      {downloadURL && <code className="upload-snippet">{`[Document Download](${downloadURL})`}</code>}
    </div>
  )
}
