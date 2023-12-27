export default function getProfileImg(fileUrl) {
    if (!fileUrl) {
        return 'https://icon-library.com/images/account-icon/account-icon-5.jpg';
    }
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileUrl}`;
}