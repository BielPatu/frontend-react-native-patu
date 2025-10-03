import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Checkbox from 'expo-checkbox';
import { Link } from "expo-router";
import * as React from 'react';
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProgressBar } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ToDoHome() {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState();
  const [isChecked, setChecked] = useState({});

  const activeQuestsCount = lists.filter(list => !isChecked[list.id]).length;

  const toggleCheckbox = (id) => {
    setChecked(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  function loadLists() {
    axios.get('http://localhost:3000/to-do-list/')
      .then(response => setLists(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }

  function loadUser() {
    axios.get('http://localhost:3000/user/1')
      .then(response => setName(response.data.name))
      .catch(error => console.error('Error fetching user:', error));
  }

  useEffect(() => {
    loadLists();
    loadUser();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#0d0d0d' }}>
  <View style={styles.profileCard}>
    <View style={styles.profileSection}>
      <Image
        source={{ uri: 'https://preview.redd.it/jonkler-bom-dia-v0-l7spc07a1kqd1.jpeg?auto=webp&s=2611c954e108166dd5428e1acac95d7296693c06' }}
        style={styles.avatar}
      />
      <ThemedText style={styles.userName}>{name || 'placeholder'}</ThemedText>
    </View>

    <View style={styles.statsSection}>
      <ThemedText style={styles.sectionTitle}>⚔️ Stats</ThemedText>
      <Text style={styles.statText}>Level: 5</Text>
      <Text style={styles.statText}>Completion Rate: 71%</Text>
      <ProgressBar progress={0.71} color="#4caf50" style={styles.progress} />
    </View>
  </View>



  <View style={styles.questHeader}>
      <Text style={styles.title}>📜 Quests</Text>
      <ThemedText style={styles.activeQuests}>
        Ativas: {activeQuestsCount}/{lists.length}
      </ThemedText>
    </View>




    <ScrollView style={styles.questScroll} contentContainerStyle={{ paddingBottom: 20 }}>

    <View style={styles.questList}>
      {lists.map((list) => (
        <View key={list.id} style={styles.questCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 8 }}>⚔️</Text>
            <ThemedText style={isChecked[list.id] ? styles.questDone : styles.questTitle}>
              {list.title}
            </ThemedText>
          </View>
          <Checkbox
            value={isChecked[list.id] || false}
            onValueChange={() => toggleCheckbox(list.id)}
            color={isChecked[list.id] ? '#4caf50' : '#888'}
          />
        </View>
      ))}
    </View>
  </ScrollView>

      <View style={styles.footer}>
          <Link href="/(tabs)">
        <TouchableOpacity onPress={() => console.log("Logout")} style={styles.iconButton}>
          <Ionicons name="log-out-outline" size={28} color="black" />
        </TouchableOpacity>
          </Link>
        <Link href="(modals)/ListCreatorModal" style={[styles.iconButton, styles.centralButton]}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add" size={28} color="black" />
          </TouchableOpacity>
        </Link>
        <Link href="(modals)/config" style={styles.iconButton}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings-outline" size={28} color="black" />
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 16,
  },
  profileCard: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#d4af37',
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  profileSection: {
    flex: 1,
    alignItems: 'center',
  },
  statsSection: {
    marginTop: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#ffd700',
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#fff',
    textShadowColor: '#000',
    textShadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 6,
  },
  statText: {
    fontSize: 14,
    marginBottom: 2,
    color: '#ccc',
  },
  progress: {
    height: 12,
    borderRadius: 6,
    marginTop: 8,
    backgroundColor: '#333',
  },
  questHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffd700',
    textShadowColor: '#000',
    textShadowRadius: 6,
  },
  activeQuests: {
    marginTop: 4,
    fontSize: 14,
    color: '#aaa',
  },
  questList: {
    marginBottom: 30,
  },
  questCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  questDone: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4caf50',
    textDecorationLine: 'line-through',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around", 
    alignItems: "center",
    paddingVertical: 12, 
    paddingHorizontal: 16,
    backgroundColor: "#DFFFFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", 
  },
  centralButton: {
    backgroundColor: "#4caf50",
  },
  questScroll: {
    flex: 1,
    paddingHorizontal: 16,
  }
  
});
