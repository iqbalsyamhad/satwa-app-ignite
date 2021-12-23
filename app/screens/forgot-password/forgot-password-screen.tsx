import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { Paragraph } from "react-native-paper"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const ForgotPasswordScreen: FC<StackScreenProps<NavigatorParamList, "forgotPassword">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const { authenticationStore } = useStores();

    type FormValues = {
      email: string;
      kode: string;
      password: string;
      passwordrepeat: string;
    };
    const { ...methods } = useForm();
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
      console.log("error catch" + JSON.stringify(errors))
      Alert.alert('Ops..', Object.values(errors)[0].message)
    }
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        setLoading(true);
        if (isSent) {
          if (!data.kode) throw new Error('Kode harus diisi!');
          if (!data.password) throw new Error('Password harus diisi!');
          if (data.password != data.passwordrepeat) throw new Error('Konfirmasi password baru tidak sesuai!');
          let collection = {
            email: data.email,
            reset_code: data.kode,
            password: data.password,
          }
          const result = await authenticationStore.updatePassword(collection);
          if (result) {
            alert('Berhasil mengubah password!');
            props.navigation.goBack();
          }
        } else {
          const result = await authenticationStore.forgotPassword(data.email);
          if (result) setIsSent(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(error.message);
      }
    }

    return (
      <Screen style={ROOT} preset="scroll" header={
        <Header
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
          headerText="Lupa Password"
        />
      }>
        <View style={{ paddingHorizontal: spacing[5] }}>
          <FormProvider {...methods}>
            <TextField
              name="email"
              keyboardType="email-address"
              placeholder={'Email'}
              rules={{ required: 'Email harus diisi!' }}
              disabled={isSent}
            />
            {isSent &&
              <>
                <View style={{
                  marginTop: spacing[5],
                  marginBottom: spacing[3],
                  padding: spacing[3],
                  backgroundColor: color.palette.primary + '30',
                  borderRadius: spacing[2]
                }}>
                  <Paragraph>Kami telah mengirim kode ke email anda. Silahkan masukkan kode pada kolom dibawah.</Paragraph>
                </View>
                <View style={{ marginVertical: spacing[2] }}>
                  <TextField
                    name="kode"
                    placeholder={'Kode'}
                  />
                </View>
                <View style={{ marginVertical: spacing[2] }}>
                  <TextField
                    name="password"
                    secureTextEntry={true}
                    placeholder={'Password Baru'}
                  />
                </View>
                <TextField
                  name="passwordrepeat"
                  secureTextEntry={true}
                  placeholder={'Konfirmasi Password Baru'}
                />
              </>
            }
            <Button
              loading={loading}
              style={{ marginTop: spacing[5] }}
              text={isSent ? "Simpan" : "Kirim Kode"}
              onPress={methods.handleSubmit(onSubmit, onError)}
            />
          </FormProvider>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ alignSelf: 'center', marginTop: spacing[2] }}>
            <Paragraph style={{ color: '#007FFF' }}><Icofont name="arrow-left" /> Kembali Login</Paragraph>
          </TouchableOpacity>
        </View>
      </Screen>
    )
  })
