import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password,
      });

      const token = response.data.Authorization; // token JWT do backend
      const userData = response.data.data;      // { id, email }

      // salvar token e id no AsyncStorage
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@userId', String(userData.id));

      // limpar form
      setEmail('');
      setPassword('');

      // navegar para a tela principal
      router.push('/toDoHome');

    } catch (error: any) {
      console.error(error.response || error);
      Alert.alert('Erro', 'Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Image
        source={require('../../assets/images/quest-line-icon.png')}
        style={styles.logo}
        contentFit="contain"
      />

      <View style={styles.formCard}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Coloque seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>Senha</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Coloque sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.buttonWrapper}>
          <Button
            title={loading ? 'Carregando...' : 'Entrar'}
            color="#4CAF50"
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    width: 450,
    height: 250,
    position: 'relative',
  },
  formCard: {
    width: '90%',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    marginTop: 20,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
