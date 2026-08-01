import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import styles from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useEffect, useState } from "react";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";
export function Home() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.PENDING,
  );
  const [description, setDescription] = useState<string>("");

  const FILTER_STATUS = [FilterStatus.DONE, FilterStatus.PENDING];
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function loadItems() {
    try {
      const response = await itemsStorage.getByStatus(filterStatus);
      setItems(response);
    } catch (error) {
      console.log(error);
      console.log("Não foi possível carregar os itens");
    }
  }

  useEffect(() => {
    loadItems();
  }, [filterStatus]);

  const updateFilterStatus = async (status: FilterStatus) => {
    setFilterStatus(status);
  };

  const handleAddItem = async () => {
    if (!description.trim()) {
      return Alert.alert(
        "Atenção",
        "Por favor, insira uma descrição para o item.",
      );
    }

    const newItem: ItemStorage = {
      id: String(Math.random().toString(36).substring(2)),
      status: FilterStatus.PENDING,
      description: description,
    };
    setItems((prevItems) => [...prevItems, newItem]);
    await itemsStorage.addItem(newItem);
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={handleAddItem} />
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
