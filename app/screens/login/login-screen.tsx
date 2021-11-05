import React, { FC, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { observer } from "mobx-react-lite"
import { FormProvider, SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, TextField } from "../../components"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { Paragraph, Text, TextInput, Title } from "react-native-paper"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(
  ({ navigation }) => {
    const { authenticationStore } = useStores();
    const [showPassword, setShowPassword] = useState(true);
    type FormValues = {
      email: string;
      password: string;
    };
    const { ...methods } = useForm();
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
      return console.log(errors)
    }
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      await authenticationStore.login(data.email, data.password);
    }

    return (
      <Screen style={ROOT} preset="scroll">
        <Image source={require('../../../assets/images/SipesatLogo2.png')}
          style={{ width: 160, alignSelf: 'center', marginTop: spacing[5] }}
          resizeMode={'contain'} />
        <Title style={{ marginTop: spacing[6], alignSelf: 'center' }}>Login</Title>
        <View style={{ padding: spacing[5] }}>
          <FormProvider {...methods}>
            <TextField
              name="email"
              keyboardType="email-address"
              placeholder={'Email'}
              rules={{ required: 'Email is required!' }}
            />
            <TextField
              containerStyle={{ marginTop: spacing[3] }}
              name="password"
              secureTextEntry={showPassword}
              placeholder={'Password'}
              right={<TextInput.Icon color={'#007FFF'} name={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
              rules={{ required: 'Password is required!' }}
            />
          </FormProvider>
          <Button
            style={{ marginTop: spacing[5] }}
            text="Log In"
            onPress={methods.handleSubmit(onSubmit, onError)}
          />
          <TouchableOpacity style={{ alignSelf: 'center', marginTop: spacing[2] }}>
            <Paragraph style={{ color: '#007FFF' }}>Lupa Password?</Paragraph>
          </TouchableOpacity>
        </View>
      </Screen >
    )
  }
)
