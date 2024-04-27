import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OutlinedText = ({ text, outlineColor, textColor }) => {
  const outlineStyle = {
    textShadowColor: outlineColor,
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 2,
  };

  return (
    <View style={styles.container}>
      {/* Outline */}
      <Text style={[styles.text, outlineStyle, { color: textColor }]}>{text}</Text>
      <Text style={[styles.text, outlineStyle, { color: textColor, position: 'absolute', top: -1 }]}>{text}</Text>
      <Text style={[styles.text, outlineStyle, { color: textColor, position: 'absolute', top: 1 }]}>{text}</Text>
      <Text style={[styles.text, outlineStyle, { color: textColor, position: 'absolute', left: -1 }]}>{text}</Text>
      <Text style={[styles.text, outlineStyle, { color: textColor, position: 'absolute', left: 1 }]}>{text}</Text>

      {/* Main Text */}
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default OutlinedText;
