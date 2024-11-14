import { Label } from "@/components/ui/label";
import { SelectNative } from "./ui/select-native";

export default function PopupSelectRowUser() {
  return (
    <div className="space-y-2">
      <Label>Pilihan</Label>
      <SelectNative id="select-row-user">
        <option value="name">Username</option>
        <option value="password">Password</option>
        <option value="role">Role</option>
        <option value="is_active">Status</option>
      </SelectNative>
    </div>
  );
}
