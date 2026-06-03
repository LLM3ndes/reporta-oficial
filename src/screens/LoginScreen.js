import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Alterna entre login e cadastro

  const handleAuth = () => {
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .catch(() => Alert.alert('Erro', 'Usuário não encontrado. Verifique seu e-mail ou senha.'));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => Alert.alert('Sucesso', 'Conta criada com sucesso!'))
        .catch((error) => Alert.alert('Erro', error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login Reporta' : 'Criar Conta'}</Text>
      
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#f4f7f6' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#bdc3c7' },
  button: { backgroundColor: '#2980b9', padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  toggleText: { marginTop: 20, textAlign: 'center', color: '#3498db', fontWeight: 'bold' }
});