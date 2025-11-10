import useStores from "../hooks/useStores";
import type { Store } from "../services/storeService";
import CustomList from "./reusableComponents/CustomList";

interface Props {
  onSelectStore: (store: Store | null) => void;
  selectedStore: Store | null;
}

const StoreList = ({ onSelectStore, selectedStore }: Props) => {
  return (
    <CustomList
      onSelectItem={onSelectStore}
      selectedItem={selectedStore}
      title="Stores"
      useDataHook={useStores}
    />
  );
};

export default StoreList;
