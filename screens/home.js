// App.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

const App = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> FarmConnect</Text>
      <Text style={styles.subtitle}>
        All-in-one App for hardworking farmers
      </Text>

       
<Text>1</Text>
       <TouchableOpacity style={styles.fullButton}
      onPress={()=> navigation.navigate('document')}>
        <Text style={styles.buttonText}>Document Management</Text>
      </TouchableOpacity>

<Text>2</Text>
       <TouchableOpacity style={styles.fullButton}
      onPress={()=> navigation.navigate('gps')}>
        <Text style={styles.buttonText}>Live Vehicle Tracking</Text>
      </TouchableOpacity>

<Text>3</Text>
      <TouchableOpacity style={styles.fullButton}
      onPress={()=> navigation.navigate('expense')}>
        <Text style={styles.buttonText}>Expenses Report Generator</Text>
      </TouchableOpacity>

<Text>4</Text>
       <TouchableOpacity style={styles.fullButton}
      onPress={() => navigation.navigate('weather')}>
        <Text style={styles.buttonText}>Weather</Text>
      </TouchableOpacity>

<Text>5</Text>
      <TouchableOpacity style={styles.fullButton}
      onPress={()=> navigation.navigate('tasks')}>
        <Text style={styles.buttonText}>Farm Tasks</Text>
      </TouchableOpacity>

       <Text>6</Text>
       <TouchableOpacity style={styles.fullButton}
      onPress={()=> navigation.navigate('field')}>
        <Text style={styles.buttonText}>Field Mapping & GPS</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#00A86B'},
  title: {fontSize: 42, textAlign: 'center', fontWeight: 'bold', marginTop: 100, textDecorationLine:'none'},
  subtitle: {textAlign: 'center', fontSize: 16, marginVertical: 8, color: 'white'},
  row: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 16},
  button: {
    flex: 0.48,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  fullButton: {
    marginTop: 16,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  buttonText: {fontSize: 20, fontWeight: 'bold'},
});

export default App;
