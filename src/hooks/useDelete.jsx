import { api } from "../api/ApiKey";

export function useDelete() {
  const DeleteData = async (data, id) => {
    return await api(`/api/${data}/${id}`, {
      method: "DELETE",
    });
  };
  return { DeleteData };
}

export default useDelete;
