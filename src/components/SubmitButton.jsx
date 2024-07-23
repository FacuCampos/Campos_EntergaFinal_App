import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const SubmitButton = ({onPress=()=>{}, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secundario,
        borderRadius: 6,
        justifyContent:'center',
        alignItems: 'center',
        padding: 8,
        width: "60%",
    },
    text: {
      color: colors.textoOscuro,
      fontFamily: "SecundariaRegular",
      fontSize: 22,
    },
})