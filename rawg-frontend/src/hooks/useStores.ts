import useData from "./useData";

export interface Store {
  id: number;
  name: string;
  image_background: string;
}

const useStores = () => useData<Store>("/stores");

export default useStores;
