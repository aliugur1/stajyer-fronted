import { api } from "../api/ApiKey";
export function usePut() {
  const PutData = async (dataName, id, id2, data) => {
    return await api(`/api/${dataName}/${id}${id2}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  };
  return { PutData };
}

export default usePut;
