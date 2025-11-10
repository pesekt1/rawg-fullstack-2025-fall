import useStores from "../hooks/useStores";
import useGameQueryStore from "../store";
import CustomList from "./reusableComponents/CustomList";

const selectedStore = useGameQueryStore((s) => s.gameQuery.store);
const setStore = useGameQueryStore((s) => s.setStore);

const StoreList = () => {
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
