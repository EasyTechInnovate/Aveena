export const uploadToImageKit = async (file) => {
  if (!file) return null;

  const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY;

  console.log("Public Key Loaded:", !!publicKey);
  console.log("Private Key Loaded:", !!privateKey);

  if (!privateKey) {
    console.error("Missing ImageKit Private Key in .env file!");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", publicKey);

  const encodedKey = btoa(privateKey + ":"); 

  try {
    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedKey}`,
      },
      body: formData,
    });

    const data = await response.json();
    
    if (response.ok) {
      return data.url; 
    } else {
      throw new Error(data.message || "Upload failed");
    }
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return null;
  }
};