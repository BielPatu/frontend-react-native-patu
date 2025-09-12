import { Image } from 'expo-image';
import { Button, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const[nome, setNome] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[passwordConfirm, setPasswordConfirm] = useState('');


  function handleSubmit() 
  {
    console.log(nome);
    console.log(email);
  }  


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={'https://as1.ftcdn.net/jpg/03/16/06/18/1000_F_316061887_nCWfeJKqbIxgpaAkgce2lhAfXnAE06Te.jpg'}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.container}>
      <ThemedText style={styles.semiTitle} >Nome</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Coloque seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <ThemedText style={styles.semiTitle}>Email</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Coloque seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <ThemedText style={styles.semiTitle}>Senha</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Coloque sua senha"
        value={password}
        onChangeText={setPassword}
       
      />
      <ThemedText style={styles.semiTitle}>Confirmar Senha</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
      />

      <Button title="Registrar" onPress={handleSubmit}/>
    </View>


      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
    
  },
  input: 
  {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    border: '1px solid #000',
    borderRadius: '5px',
    padding: '5px',
    height: '100%',
    width: '100%'
  },
  container: 
  {
    display: 'flex',
    alignItems: 'center',
    margin: 8,
    padding: 10,
    boxShadow: '0px 0px 10px #5a5a5aff',
    borderRadius: '5px'
  },
  semiTitle: 
  {
    fontWeight: 'bold'
  }
  
});
