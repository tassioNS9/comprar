import { FilterStatus } from "@/types/FilterStatus";
import { CircleDashed, CircleCheck } from "lucide-react-native";
export function StatusIcon({ status }: { status: FilterStatus }) {
  return status === FilterStatus.DONE ? (
    <CircleCheck size={18} color="#4CAF50" />
  ) : (
    <CircleDashed size={18} color="#FF9800" />
  );
}
