import { useEffect, useRef, useState } from 'react';
import supabase from '../supabase/client';

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Funzione che carica l'immagine nello storage...
  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }

  // Se url cambia invoca la funzione downloadImage...
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  // Funzione che controlla il path dell'immagine da inserire...

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  async function uploadAvatar(event) {
    const selectedFile = event.target.files[0];
    console.log('File selezionato:', selectedFile.name);

    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(event, filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="center-flex col-12 col-md-6">
      {avatarUrl ? (
        <div className="avatar-box rounded-pill overflow-hidden box-shadow-gold">
          <img src={avatarUrl} alt="Avatar" className="img-avatar" />
        </div>
      ) : (
        <div className="avatar-box rounded-pill overflow-hidden box-shadow-gold center-flex">
          <i class="fa-solid fa-circle-user"></i>
        </div>
      )}
      <div className="my-4 center-flex">
        {/* <input
          className="text-white center-flex"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        /> */}
        <button
          type="button"
          className="game-list-button mt-3"
          onClick={handleButtonClick}
        >
          Select File
        </button>
        <input
          id="single"
          style={{ visibility: 'hidden' }}
          className="text-white center-flex"
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          ref={fileInputRef}
          // onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
