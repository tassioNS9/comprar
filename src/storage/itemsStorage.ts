import AsyncStorage from "@react-native-async-storage/async-storage";

import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function getItems(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error("Não foi possível carregar os itens");
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  const items = await getItems();
  return items.filter((item) => item.status === status);
}

async function saveItems(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("Não foi possível salvar os itens");
  }
}

async function addItem(item: ItemStorage): Promise<ItemStorage[]> {
  const items = await getItems();
  items.push(item);
  await saveItems(items);

  return items;
}

async function removeItem(itemId: string): Promise<void> {
  const items = await getItems();
  const updatedItems = items.filter((item) => item.id !== itemId);
  await saveItems(updatedItems);
}

async function clearItems(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error("Não foi possível limpar os itens");
  }
}

async function updateItemStatus(itemId: string): Promise<void> {
  const items = await getItems();
  const updatedITems = items.map((item: ItemStorage) =>
    item.id === itemId
      ? {
          ...item,
          status:
            item.status === FilterStatus.PENDING
              ? FilterStatus.DONE
              : FilterStatus.PENDING,
        }
      : item,
  );
  await saveItems(updatedITems);
}

export const itemsStorage = {
  getItems,
  getByStatus,
  saveItems,
  addItem,
  removeItem,
  clearItems,
  updateItemStatus,
};
