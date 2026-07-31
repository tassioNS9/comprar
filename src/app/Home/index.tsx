import { View, Image, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
export default function Home() {
  const FILTER_STATUS = [FilterStatus.DONE, FilterStatus.PENDING];
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={() => {}}
        />
        <Button title="Adicionar" onPress={() => {}} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === FilterStatus.DONE}
              onPress={() => {}}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={() => {}}>
            <Text style={styles.clearText}>Limpar lista</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
