import { StatusIcon } from "@/components/StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";
import { Text, TouchableOpacity, View } from "react-native";
import { Trash2 } from "lucide-react-native";
import styles from "./styles";

type ItemData = {
  id: string;
  status: FilterStatus;
  description: string;
};
type ItemProps = {
  data: ItemData;
  onRemove: () => void;
  onStatusChange: () => void;
};

export function Item({ data, onRemove, onStatusChange }: ItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatusChange}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
}
