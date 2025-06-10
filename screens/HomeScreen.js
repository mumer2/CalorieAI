import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { calculateBMI, calculateBMR, calculateTDEE } from '../utils/calculator';
import { BarChart } from 'react-native-chart-kit';

export default function HomeScreen({ route }) {
  const defaultData = {
    age: 25,
    height: 170,
    weight: 65,
    activity: 'medium',
  };

  const { age, height, weight, activity } = route?.params || defaultData;

  // 👇 Example fallback logging (optional)
  if (!route?.params) {
    console.warn('No user data received. Using default values.');
  }

  // Now you can safely calculate
  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age);
  const tdee = calculateTDEE(bmr, activity);


  const chartData = {
    labels: ['BMI', 'BMR', 'TDEE'],
    datasets: [{ data: [parseFloat(bmi), Number(bmr), Number(tdee)] }]
  };



  const weeklyPlan = {
  Monday: require('../assets/food/Monday.jpeg'),
  Tuesday: require('../assets/food/Tuesday.jpeg'),
  Wednesday: require('../assets/food/Wednesday.jpeg'),
  Thursday: require('../assets/food/Thursday.jpeg'),
  Friday: require('../assets/food/Friday.jpeg'),
  Saturday: require('../assets/food/Saturday.jpeg'),
  Sunday: require('../assets/food/Sunday.jpeg'),
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Calorie AI</Text>
      <Image source={require('../assets/Calorie.png')} style={styles.image} resizeMode="contain" />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Fitness Summary</Text>

        <View style={styles.resultRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{age}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.label}>BMI:</Text>
          <Text style={styles.value}>{bmi}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.label}>BMR:</Text>
          <Text style={styles.value}>{bmr} kcal/day</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.label}>TDEE:</Text>
          <Text style={styles.value}>{tdee} kcal/day</Text>
        </View>

        <Text style={styles.recommendation}>
          ✅ Based on your stats and activity level, you should aim for {tdee} kcal/day to maintain your weight.
        </Text>
      </View>

      <Text style={styles.chartTitle}>Your Fitness Metrics</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        fromZero
        chartConfig={{
          backgroundColor: '#f5f7fa',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          labelColor: () => '#555',
        }}
        style={{ marginVertical: 10, borderRadius: 12 }}
      />

      <Text style={styles.sectionTitle2}>🍽 Weekly Eating Plan</Text>

{Object.entries(weeklyPlan).map(([day, image]) => (
  <View key={day} style={styles.planCard}>
    <View style={styles.planTextContainer}>
      <Text style={styles.planDay}>{day}</Text>
    </View>
    <Image source={image} style={styles.planImage} />
  </View>
))}

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 25,
    borderRadius: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  recommendation: {
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 14,
    color: '#2e7d32',
    textAlign: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
    color: '#333',
  },


  sectionTitle2: {
  fontSize: 22,
  fontWeight: 'bold',
  marginTop: 25,
  marginBottom: 16,
  color: '#222',
  textAlign: 'center',
},

planCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  paddingVertical: 14,
  paddingHorizontal: 18,
  marginBottom: 12,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

planTextContainer: {
  flex: 1,
},

planDay: {
  fontSize: 18,
  fontWeight: '600',
  color: '#333',
},

planImage: {
  width: 100,
  height: 80,
  borderRadius: 30,
  marginLeft: 16,
},

});
