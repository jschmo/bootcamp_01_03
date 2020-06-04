import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    console.log('Adicionando Projeto');
    const newProjet = {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Alisson Veras'
    };
    console.log(newProjet);
    const response = await api.post('projects', newProjet);
    console.log(response.data);
    setProjects([...projects, response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project}) => ( // Desestruturação e renomeando item as project
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          styles={styles.button}
          onPress={handleAddProject}
        >
          <Text styles={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
  /*
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <FlatList 
        style={styles.container}
        data={projects}
        keyExtractor={project => project.id}
        renderItem />
      <View style={styles.container}>
        { projects.map(project => (
          <Text
            style={styles.project}
            key={project.id}>
              {project.title}
          </Text>
          )) }
      </View>
    </>
  );
  */
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#7159c1',
  },
  project: {
    color: '#FFF',
    fontSize: 30,
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});
