import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import styles from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

export function Home() {
  const FILTER_STATUS = [FilterStatus.DONE, FilterStatus.PENDING];
  const ITEMS = [
    {
      id: "1",
      description: "Exemplo de item",
      status: FilterStatus.DONE,
    },
    {
      id: "2",
      description: "Exemplo de item 2",
      status: FilterStatus.PENDING,
    },
    {
      id: "3",
      description: "Exemplo de item 3",
      status: FilterStatus.DONE,
    },
    {
      id: "4",
      description: "Exemplo de item 4",
      status: FilterStatus.PENDING,
    },
    {
      id: "5",
      description: "Exemplo de item 5",
      status: FilterStatus.DONE,
    },
  ];
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

        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              onRemove={() => console.log("Item removido")}
              onStatusChange={() => console.log("Status alterado")}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={true}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Nenhum item encontrado</Text>
          )}
        />
      </View>
    </View>
  );
}
