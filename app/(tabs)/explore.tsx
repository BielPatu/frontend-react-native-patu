import { ThemedText } from '@/components/themed-text';
import axios from 'axios';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleSubmit() {
    if (password !== passwordConfirm) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    console.log(nome, email, password, passwordConfirm);

    axios.post('http://localhost:3000/user', {
      name: nome,
      email: email,
      password: password,
    })
    .then(response => {
      setNome('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      router.push('/(tabs)');
    })
    .catch(error => {
      console.error(error);
      console.log('Erro ao registrar usuário');
    });
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <Image
        source={require('../../assets/images/quest-line-icon.png')}
        style={styles.logo}
        contentFit="contain"
      />

      <View style={styles.formCard}>
        <ThemedText style={styles.label}>Nome</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Coloque seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Coloque seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <ThemedText style={styles.label}>Senha</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Coloque sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <ThemedText style={styles.label}>Confirmar Senha</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
        />

        <View style={styles.buttonWrapper}>
          <Button title="Registrar" color="#4CAF50" onPress={handleSubmit} />
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
    height:250,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
