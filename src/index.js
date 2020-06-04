import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from 'react-native';

import api from './services/api';

export default function App() {

  const [projects, setProjects] = useState([]);

  console.log('Starting App...');

  useEffect(() => {
    api.get('projects').then(response => {
      console.log('Retrieving data...');
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);
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
    fontSize: 30
  }
});
