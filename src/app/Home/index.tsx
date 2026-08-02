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
    setFilterStatus(FilterStatus.PENDING);
    setDescription("");
    await loadItems();
    Alert.alert("Sucesso", "Item adicionado com sucesso!");
  };

  const hadleRemoveItem = async (itemId: string) => {
    try {
      await itemsStorage.removeItem(itemId);
      await loadItems();
      Alert.alert("Sucesso", "Item removido com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível remover o item.");
    }
  };

  const handleClearItems = async () => {
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => itemsStorage.clearItems().then(() => loadItems()),
      },
    ]);
  };

  const updateItemStatus = async (itemId: string) => {
    try {
      await itemsStorage.updateItemStatus(itemId);
      await loadItems();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status do item.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
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

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => handleClearItems()}
          >
            <Text style={styles.clearText}>Limpar lista</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              onRemove={() => hadleRemoveItem(item.id)}
              onStatusChange={() => updateItemStatus(item.id)}
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
