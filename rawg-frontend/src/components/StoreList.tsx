import useStores from "../hooks/useStores";
import useGameQueryStore from "../store";
import CustomList from "./reusableComponents/CustomList";

const StoreList = () => {
  const selectedStore = useGameQueryStore((s) => s.gameQuery.store);
  const setStore = useGameQueryStore((s) => s.setStore);

  return (
    <CustomList
      onSelectItem={setStore}
      selectedItem={selectedStore}
      title="Stores"
      useDataHook={useStores}
    />
  );
};

export default StoreList;
