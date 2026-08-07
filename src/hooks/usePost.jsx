import { api } from "../api/ApiKey";
export function usePost() {
  const PostData = async (dataName, data) => {
    return await api(`/api/${dataName}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  return { PostData };
}

export default usePost;
