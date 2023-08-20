import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appearance, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import getStyles from './css/styles.js';
import { lightTheme, darkTheme } from './css/themes';

// import TcpSocket from 'react-native-tcp-socket'; // Import the TcpSocket library
// import net from 'net';
import TcpSocket from 'react-native-tcp-socket';

// import * as WebSocket from 'ws'; // Import the ws library

export default function App() {

  const [currentTheme, setCurrentTheme] = useState(Appearance.getColorScheme());
  const [toggleSwitchState, setToggleSwitchState] = useState(false);
  const [portNumber, setPortNumber] = useState("");
  const [ipAddress, setIpAddress] = useState('');
  // const [webSocketServer, setWebSocketServer] = useState(null);
  // const [webSocket, setWebSocket] = useState(null);

  // useEffect(() => {
  //   NetInfo.fetch().then((state) => {
  //     setIpAddress(state.details.ipAddress);
  //   });
  // }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setCurrentTheme(colorScheme);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const toggleTheme = (isOn) => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    setToggleSwitchState(isOn);
  };

  const theme = currentTheme === 'dark' ?  lightTheme : darkTheme;
  const styles = getStyles(theme);

  // const handleStart = () => {
  //   if (portNumber === '') {
  //     Alert.alert(
  //       'Validation Error',
  //       'Please enter a port number before starting the connection.',
  //       [{ text: 'OK', style: 'cancel' }],
  //       { cancelable: true }
  //     );
  //     return;
  //   }
  
  //   try {
  //     console.log("device ip= ", ipAddress)
  //     const client = TcpSocket.createConnection({
  //       host: ipAddress, // Replace with the IP address of your server
  //       port: parseInt(portNumber),
  //     });
  
  //     client.on('connect', () => {
  //       console.log('Connected to server');
  //       // You can send data or perform other actions here
  //     });
  
  //     client.on('error', (error) => {
  //       console.error('Socket error:', error);
  //       // Handle socket errors here
  //     });
  
  //     client.on('close', () => {
  //       console.log('Socket connection closed');
  //       // Handle socket connection close here
  //     });
  //   } catch (error) {
  //     console.error('Failed to create socket:', error);
  //     Alert.alert(
  //       'Socket Connection Error',
  //       'An error occurred while creating the socket connection, try changing the port',
  //       [{ text: 'OK', style: 'cancel' }],
  //       { cancelable: true }
  //     );
  //     return;
  //   }
  // };

  const handleStart = () => {
    if (portNumber === '') {
      Alert.alert(
        'Validation Error',
        'Please enter a port number before starting the server.',
        [{ text: 'OK', style: 'cancel' }],
        { cancelable: true }
      );
      return;
    }
  
    try {
      const server = net.createServer(socket => {
        console.log('Client connected to server');
  
        socket.on('data', data => {
          // Handle incoming data from clients
          console.log('Received:', data.toString());
        });
  
        socket.on('end', () => {
          console.log('Client disconnected');
        });
      });
  
      server.listen(portNumber, () => {
        console.log('TCP server started on port:', portNumber);
      });
  
      server.on('error', error => {
        console.error('Server error:', error);
        Alert.alert(
          'Server Error',
          'An error occurred while starting the server, try changing the port',
          [{ text: 'OK', style: 'cancel' }],
          { cancelable: true }
        );
      });
    } catch (error) {
      console.error('Failed to create server:', error);
      Alert.alert(
        'Server Creation Error',
        'An error occurred while creating the server, try changing the port',
        [{ text: 'OK', style: 'cancel' }],
        { cancelable: true }
      );
    }
  };
  



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Phone Mouse</Text>
      </View>
      <View style={[styles.content, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.iconToggleContainer}>
          {currentTheme === 'light' ? (
            <Image source={require('./assets/sun-solid.png')} style={{ width: 16, height: 16, marginRight: 2 }} />
            ) : (
            <Image source={require('./assets/sun-solid-dark.png')} style={{ width: 16, height: 16, marginRight: 2 }} />
          )}
          <ToggleSwitch
            style={styles.toggleSwitch}
            isOn={toggleSwitchState}
            onColor="black"
            offColor="grey"
            size="small"
            onToggle={toggleTheme}
          />
        </View>
        <StatusBar style="auto" />
      </View>
        <Text style={styles.text}>Enter Port Number</Text>
        <TextInput
          style={styles.portInput}
          placeholder="Ex: 12345"
          // placeholderTextColor= {currentTheme.textColor}
          // placeholderTextColor= "white"
          placeholderTextColor= {currentTheme === 'dark' ? 'black' : 'white'}
          keyboardType="numeric"
          maxLength={5}
          onChangeText={text => {
            if (/^\d*$/.test(text)) { // Only allow numeric characters
              setPortNumber(text);
            }
          }}
          value={portNumber}
        />
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <Text style={styles.author}>By Kinou</Text>
    </View>
  );
}