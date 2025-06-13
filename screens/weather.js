//10ba2ecefae38a017da9f4cd3ba3456a
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';

const API_KEY = '10ba2ecefae38a017da9f4cd3ba3456a'; // Replace with your OpenWeatherMap API key


const logoUri = 'https://cdn-icons-png.flaticon.com/512/1116/1116453.png'; // Cloud icon from flaticon

export default function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setErrorMsg(null);
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchByCity = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setErrorMsg(null);
        setSuggestions([]);
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const handleCityInput = (text) => {
    setCity(text);

  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f6fc" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Image source={{ uri: logoUri }} style={styles.logo} />
          <Text style={styles.title}>WeatherNow</Text>

          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#555" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter city name"
              value={city}
              onChangeText={handleCityInput}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionBox} onPress={() => { setCity(item); setSuggestions([]); }}>
                <Feather name="map-pin" size={18} color="#1a75ff" style={{ marginRight: 8 }} />
                <Text style={styles.suggestion}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={fetchByCity}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#4da6ff" style={{ marginTop: 20 }} />
        ) : errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : weatherData ? (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>{weatherData.name}</Text>
            <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
            <Text style={styles.desc}>{weatherData.weather[0].description}</Text>
            <Text style={styles.infoText}>Rain Chance: {weatherData.clouds?.all || 0}%</Text>
            <View style={styles.moreInfo}>
              <Text style={styles.infoText}>Humidity: {weatherData.main.humidity}%</Text>
              <Text style={styles.infoText}>Wind: {weatherData.wind.speed} m/s</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f6fc',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#333',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    width: '100%',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  suggestionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    width: '100%',
  },
  suggestion: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4da6ff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ffffffee',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  city: {
    fontSize: 26,
    fontWeight: '600',
    color: '#222',
    marginBottom: 10,
  },
  temp: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#1a75ff',
  },
  desc: {
    fontSize: 22,
    fontStyle: 'italic',
    textTransform: 'capitalize',
    color: '#444',
    marginBottom: 10,
  },
  error: {
    marginTop: 10,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  moreInfo: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
});
