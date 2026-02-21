import ImageKit from "imagekit-javascript";

const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
});

export const uploadToImageKit = async (file) => {
  if (!file) return null;

  try {
    const authRes = await fetch(`${import.meta.env.VITE_API_URL}/media/auth`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const authResponse = await authRes.json();

    if (!authRes.ok) {
      throw new Error(`Backend error: ${authResponse.message || 'Unknown error'}`);
    }

    const token = authResponse?.data?.token || authResponse?.token;
    const expire = authResponse?.data?.expire || authResponse?.expire;
    const signature = authResponse?.data?.signature || authResponse?.signature;

    if (!token || !expire || !signature) {
      throw new Error("Missing auth params! Look at the 🔥 FULL BACKEND RESPONSE log above to see what went wrong.");
    }

    const response = await imagekit.upload({
      file: file,
      fileName: file.name,
      token: token,
      expire: expire,
      signature: signature,
    });

    return response.url;

  } catch (error) {
    console.error("ImageKit upload error:", error);
    return null;
  }
};