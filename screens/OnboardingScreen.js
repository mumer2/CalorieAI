import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('medium'); // default

  const handleContinue = () => {
    if (!age || !weight || !height) {
      Alert.alert('Please fill in all fields');
      return;
    }

   navigation.navigate('HomeTab', {
    screen: 'Home', // The target screen inside the HomeStackNavigator
    params: {
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      activity,
    },
  });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Calorie AI</Text>
      <Text style={styles.subtitle}>Let’s get to know you</Text>

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (ft)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.label}>Activity Level:</Text>
      <View style={styles.activityOptions}>
        {['low', 'medium', 'high'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.option,
              activity === level && styles.activeOption,
            ]}
            onPress={() => setActivity(level)}
          >
            <Text style={styles.optionText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    height: 80,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  activityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  option: {
    flex: 1,
    padding: 10,
    marginHorizontal: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: '#2196F3',
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

});
