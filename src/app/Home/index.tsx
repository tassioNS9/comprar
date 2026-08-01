import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import styles from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useState } from "react";

export function Home() {
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
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.PENDING,
  );
  const [description, setDescription] = useState<String>("");

  const FILTER_STATUS = [FilterStatus.DONE, FilterStatus.PENDING];
  const [items, setItems] = useState<any>(ITEMS);

  const updateFilterStatus = (status: FilterStatus) => {
    setFilterStatus(status);
  };

  const addItem = () => {
    if (description.trim() === "") {
      return;
    }

    const newItem = {
      id: String(Math.random().toString(36).substring(2)),
      description: description,
      status: FilterStatus.PENDING,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={addItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filterStatus}
              onPress={() => updateFilterStatus(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={() => {}}>
            <Text style={styles.clearText}>Limpar lista</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
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
