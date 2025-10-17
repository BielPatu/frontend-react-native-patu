import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewListModal() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  async function handleCreateList() {
    if (!title.trim()) return;

    try {
      // pega ID do usuário logado
      const userId = await AsyncStorage.getItem("@userId");
      if (!userId) throw new Error("Usuário não logado");

      const token = await AsyncStorage.getItem("@token");

      await axios.post(
        "http://localhost:3000/to-do-list",
        {
          title,
          userId: Number(userId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Lista criada com sucesso");
      router.back();
    } catch (error) {
      console.error("Erro ao criar lista:", error);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ marginBottom: 20 }}>
        Criar Nova Quest
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Digite o título da tarefa"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateList}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#555" }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0d0d0d",
  },
  input: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#ffd700",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
