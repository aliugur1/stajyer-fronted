import { api } from "../api/ApiKey";

export function usePatch() {
  const PatchData = async (dataName, id, id2, data) => {
    return await api(`/api/${dataName}/${id}${id2}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  };
  return { PatchData };
}

export default usePatch;
