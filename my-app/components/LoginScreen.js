import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [mobileInput, setMobileInput] = useState('');

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://192.168.1.21:5000/api/otp/send-otp', {
        mobile: mobileInput,
      });
      if (response.status === 200) {
        navigation.navigate('Otp', { mobile: mobileInput });
      }
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error', error.message);
      }
      console.error('Config error:', error.config);
      navigation.navigate('Otp', { mobile: mobileInput });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={mobileInput}
        onChangeText={setMobileInput}
        placeholder="Enter your mobile number"
        // keyboardType="phone-pad"
      />
      <Button title="Send OTP" onPress={handleSendOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;