import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { FormProvider, useForm } from "react-hook-form"
import { Subheading } from "react-native-paper"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingHorizontal: spacing[5]
}

const SelectItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.open()}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.palette.bgForms,
        borderRadius: spacing[3],
        padding: spacing[3],
        paddingHorizontal: spacing[4],
        borderWidth: 1,
        borderColor: "#E7ECF3",
      }}>
        <Subheading style={{ flex: 1 }}>Pilih Peralatan</Subheading>
        <Icofont name="chevron-down" color={color.primary} size={28} />
      </View>
    </TouchableOpacity>
  )
}

export const PeralatanUsesNewScreen: FC<StackScreenProps<NavigatorParamList, "peralatanUsesNew">> = observer(
  (props) => {

    type FormValues = {
      jumlah: bigint;
      keterangan: string;
    };
    const { ...methods } = useForm();

    return (
      <Screen style={ROOT} preset="scroll" header={
        <Header
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
          headerText="Tambah Penggunaan"
        />
      }>
        <SelectItem open={() => { }} />
        <FormProvider {...methods}>
          <TextField
            containerStyle={{ marginTop: spacing[3] }}
            name="jumlah"
            keyboardType="numeric"
            placeholder={'Jumlah Penggunaan'}
            rules={{ required: 'Jumlah harus diisi!' }}
          />
          <TextField
            containerStyle={{ marginTop: spacing[3] }}
            name="keterangan"
            placeholder={'Keterangan'}
            rules={{ required: 'Keterangan harus diisi!' }}
          />
        </FormProvider>
      </Screen>
    )
  })
