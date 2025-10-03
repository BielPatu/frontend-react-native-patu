import { ThemedText } from "@/components/themed-text";
import axios from "axios";
import { Link } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [name, setName] = useState("");

  function loadUser() {
    axios
      .get("http://localhost:3000/user/1")
      .then((response) => setName(response.data.name))
      .catch((error) => console.error("Erro ao carregar usuário:", error));
  }

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = () => {
    console.log("Sair da conta");
    // Aqui você pode limpar o token/sessão e redirecionar para login
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Avatar + Nome */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://preview.redd.it/jonkler-bom-dia-v0-l7spc07a1kqd1.jpeg?auto=webp&s=2611c954e108166dd5428e1acac95d7296693c06",
            }}
            style={styles.avatar}
          />
          <ThemedText style={styles.userName}>{name || "placeholder"}</ThemedText>
        </View>

        {/* Opções */}
        <View style={styles.options}>
          {/* Editar informações abre a modal */}
          <Link href="/(modals)/EditUserModal" asChild>
            <TouchableOpacity style={styles.optionCard}>
              <Text style={styles.optionText}>✏️ Alterar informações</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.optionCard} onPress={handleLogout}>
            <Text style={styles.optionText}>🚪 Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#ffd700",
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#000",
    textShadowRadius: 3,
  },
  options: {
    width: "100%",
    marginTop: 20,
  },
  optionCard: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});
