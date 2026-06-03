import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function FormScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');

  const categorias = ['Iluminação', 'Buraco', 'Lixo', 'Esgoto', 'Outros'];

  const salvarReporte = async () => {
    if (!titulo.trim() || !categoria) {
      Alert.alert('Atenção', 'Por favor, selecione uma categoria e descreva o problema.');
      return;
    }

    try {
      await addDoc(collection(db, 'reportes'), { 
        titulo, 
        categoria,
        status: 'Pendente', 
        criadoEm: new Date() 
      });
      
      // Feedback visual antes de voltar
      Alert.alert('Sucesso', 'Denúncia enviada com sucesso! Obrigado por colaborar.', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botão para voltar manualmente */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Nova Denúncia</Text>
      <Text style={styles.instruction}>Selecione a categoria e descreva o problema.</Text>

      <Text style={styles.label}>Categoria:</Text>
      <View style={styles.catContainer}>
        {categorias.map((cat) => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.catButton, categoria === cat && styles.catButtonActive]} 
            onPress={() => setCategoria(cat)}
          >
            <Text style={[styles.catText, categoria === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput 
        style={styles.input} 
        placeholder="Descreva o problema aqui..." 
        value={titulo}
        onChangeText={setTitulo}
        multiline
      />
      
      <TouchableOpacity style={styles.button} onPress={salvarReporte}>
        <Text style={styles.buttonText}>Confirmar Envio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  backButton: { marginBottom: 20 },
  backButtonText: { color: '#2980b9', fontSize: 16, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  instruction: { fontSize: 16, color: '#7f8c8d', marginBottom: 25 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  catContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  catButton: { padding: 10, borderWidth: 1, borderColor: '#bdc3c7', borderRadius: 20, marginRight: 10, marginBottom: 10 },
  catButtonActive: { backgroundColor: '#2c3e50', borderColor: '#2c3e50' },
  catText: { color: '#2c3e50' },
  catTextActive: { color: '#fff' },
  input: { borderWidth: 1, borderColor: '#bdc3c7', padding: 15, borderRadius: 10, height: 120, marginBottom: 30, fontSize: 16 },
  button: { backgroundColor: '#c0392b', padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});