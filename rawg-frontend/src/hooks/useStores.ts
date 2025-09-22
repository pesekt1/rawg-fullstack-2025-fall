import useData from "./useData";

export interface Store {
  id: number;
  name: string;
  image_background: string;
}

const useStores = () => {
  const { data, error, isLoading } = useData<Store>("/stores");
  return { stores: data, error, isLoading };
};

export default useStores;
