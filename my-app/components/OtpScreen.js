import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const OtpScreen = ({ route, navigation }) => {
  const { mobile } = route.params;
  const [otpInput, setOtpInput] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`http://192.168.1.21:5000/api/otp/verify-otp`, {
        mobile,
        otp: otpInput,
      });
      if (response.data.message === 'OTP verified successfully') {
        alert('Logged in successfully!');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <TextInput
        style={styles.input}
        value={otpInput}
        onChangeText={setOtpInput}
        placeholder="Enter OTP"
        keyboardType="numeric"
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
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

export default OtpScreen;
