import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase-client'

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

return (
    <div className="mb-6 text-center">
      <div
        className="mx-auto mb-4 relative rounded-full border-2 border-gray-600 shadow-lg transition duration-300 hover:border-lime-400"
        style={{
          height: size,
          width: size,
          overflow: 'hidden',
          backgroundColor: '#1f2937',
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Avatar
          </div>
        )}
      </div>
  
      <label
        htmlFor="avatarUpload"
        className="inline-block px-4 py-2 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-lime-400 hover:text-black transition duration-300"
      >
        {uploading ? "Uploading..." : "Upload Avatar"}
      </label>
  
      <input
        type="file"
        id="avatarUpload"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />
    </div>
  );
  
}