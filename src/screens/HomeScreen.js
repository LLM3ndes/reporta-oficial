import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'reportes'), orderBy('criadoEm', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReportes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const getStatusColor = (status) => (status === 'Resolvido' ? '#27ae60' : '#f39c12');

  return (
    <SafeAreaView style={styles.container}>
      {/* Gatilho Mental de Ação */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Reporta</Text>
        <Text style={styles.subtitle}>Sua voz transforma a cidade.</Text>
        <View style={styles.callToAction}>
          <Text style={styles.ctaText}>Viu um problema? Faça sua denúncia agora e ajude a infraestrutura da nossa região a melhorar!</Text>
          <TouchableOpacity style={styles.buttonAction} onPress={() => navigation.navigate('Form')}>
            <Text style={styles.buttonActionText}>+ Nova Denúncia</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Denúncias Recentes</Text>

      <FlatList
        data={reportes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.category}>{item.categoria}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.cardText}>{item.titulo}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  headerContainer: { backgroundColor: '#2c3e50', padding: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#bdc3c7', marginBottom: 20 },
  callToAction: { backgroundColor: '#fff', padding: 15, borderRadius: 15, elevation: 5 },
  ctaText: { color: '#2c3e50', fontSize: 14, marginBottom: 15, lineHeight: 20 },
  buttonAction: { backgroundColor: '#c0392b', padding: 12, borderRadius: 10, alignItems: 'center' },
  buttonActionText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginHorizontal: 20, marginBottom: 10 },
  card: { backgroundColor: '#fff', marginHorizontal: 20, padding: 20, borderRadius: 12, marginBottom: 12, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  category: { fontSize: 12, fontWeight: 'bold', color: '#c0392b' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  cardText: { fontSize: 16, color: '#34495e' }
});