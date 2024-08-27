import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [areNotificationsEnabled, setAreNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => setIsDarkMode((previousState) => !previousState);
  const toggleNotifications = () => setAreNotificationsEnabled((previousState) => !previousState);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Configuración</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Modo Oscuro</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#007BFF' : '#f4f3f4'}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notificaciones</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={areNotificationsEnabled ? '#007BFF' : '#f4f3f4'}
          onValueChange={toggleNotifications}
          value={areNotificationsEnabled}
        />
      </View>

      <Button
        title="Guardar Configuraciones"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => alert('Configuraciones guardadas')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  settingText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default SettingsScreen;
