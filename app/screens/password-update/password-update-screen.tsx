import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, View, ViewStyle } from "react-native"
import { CommonActions } from '@react-navigation/native'
import { Button, Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const PasswordUpdateScreen: FC<StackScreenProps<NavigatorParamList, "passwordUpdate">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    const { authenticationStore } = useStores();

    type FormValues = {
      oldpassword: string;
      newpassword: string;
      repeatpassword: string;
    };
    const { ...methods } = useForm();
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
      Alert.alert('Ops..', Object.values(errors)[0].message)
    }
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        if (data.newpassword != data.repeatpassword) throw new Error('Konfimasi password baru tidak sesuai.');

        setLoading(true);
        let collection = {
          password_lama: data.oldpassword,
          password_baru: data.newpassword,
          password_confirm: data.repeatpassword,
        };
        const result = await authenticationStore.changePassword(collection);
        if (result) {
          alert('Berhasil mengubah password');
          props.navigation.goBack();
        }
        setLoading(false);
      } catch (error) {
        alert(error.message);
      }
    }
    return (
      <Screen style={ROOT} preset="scroll" header={
        <Header
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
          headerText="Ganti Password"
        />
      }>
        <View style={{ paddingHorizontal: spacing[5] }}>
          <FormProvider {...methods}>
            <TextField
              containerStyle={{ marginTop: spacing[3] }}
              name="oldpassword"
              secureTextEntry={true}
              placeholder={'Password Lama'}
              rules={{ required: 'Password lama harus diisi!' }}
            />
            <TextField
              containerStyle={{ marginTop: spacing[3] }}
              name="newpassword"
              secureTextEntry={true}
              placeholder={'Password Baru'}
              rules={{ required: 'Password baru harus diisi!' }}
            />
            <TextField
              containerStyle={{ marginTop: spacing[3] }}
              name="repeatpassword"
              secureTextEntry={true}
              placeholder={'Konfirmasi Password Baru'}
              rules={{ required: 'Konfirmasi password harus diisi!' }}
            />
          </FormProvider>
          <Button
            loading={loading}
            style={{ marginTop: spacing[5] }}
            text={"Simpan"}
            onPress={methods.handleSubmit(onSubmit, onError)}
          />
        </View>
      </Screen>
    )
  })
