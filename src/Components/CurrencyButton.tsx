import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { PropsWithChildren } from 'react'

type CurrencyButtonProp = PropsWithChildren<{
    name : "string";
    flag : "string"
}>

const CurrencyButton = (props: CurrencyButtonProp): JSX.Element => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.country}>{props.name}</Text>
      <Text style={styles.flag}>{props.flag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer : {
        alignItems: 'center'
    },
    flag: {
        fontSize: 28,
        color: "#FFFFFF",
        marginBottom: 4
    },
    country: {
        fontSize: 14,
        color: "#2d3436",
    }
})


export default CurrencyButton;