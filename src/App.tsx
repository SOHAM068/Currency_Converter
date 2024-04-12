import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import currencyByRupee from './constants'
import CurrencyButton from './Components/CurrencyButton'
import Snackbar from 'react-native-snackbar'

export default function App():JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')

  const buttonPressed = (targetValue : CurrencyFormat) => {
    if(!inputValue){
      return Snackbar.show({
        text : 'Please enter any input !',
        backgroundColor : '#ff0000',
        textColor : '#ffffff'
      })
    }
    const inputAmmount = parseFloat(inputValue)
    if(!isNaN(inputAmmount)){ 
      const convertedValue = inputAmmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
      setResultValue(result)
      setTargetCurrency(targetValue.symbol)
    }else{
      return Snackbar.show({
        text : 'Please enter a valid number !',
        backgroundColor : '#ff0000',
        textColor : '#ffffff'
      })
    }
  }
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Amount in Rupees</Text>
            <TextInput
              style={styles.input}
              maxLength={14}
              clearButtonMode='always'
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter Amount'
            />
          </View>
          {resultValue && (
            <Text style={styles.resultText}>{resultValue}</Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList 
            numColumns={3}
            keyExtractor={(item) => item.name}
            data={currencyByRupee}
            renderItem={({item}) => (
              <Pressable
                onPress={() => buttonPressed(item)}
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected
                ]}
              >
                <CurrencyButton name={item.name as 'string'} flag={item.flag as 'string'} />
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  bottomContainer: {
    flex: 2,
  },
  button: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
})
