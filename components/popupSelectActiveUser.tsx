import { SelectNative } from "./ui/select-native";

export default function PopupSelectActiveUser() {
  return (
    <div className="space-y-2">
      <SelectNative id="select-row-active">
        <option value="1">Aktif</option>
        <option value="0">Tidak Aktif</option>
      </SelectNative>
    </div>
  );
}
