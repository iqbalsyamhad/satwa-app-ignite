import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { ActivityIndicator, Paragraph, Subheading } from "react-native-paper"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const ProfilUpdateScreen: FC<StackScreenProps<NavigatorParamList, "profileUpdate">> = observer(
  (props) => {
    const [initloading, setInitLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userdata, setUserdata] = useState(null);
    const { authenticationStore } = useStores();
    const { user } = authenticationStore;

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      setInitLoading(true);
      const result = await authenticationStore.getUser();
      if (result) {
        setUserdata(result);
      }
      setInitLoading(false);
    }

    type FormValues = {
      nama: string;
      email: string;
      notelp: string;
      alamat: string;
    };
    const { ...methods } = useForm();
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
      Alert.alert('Ops..', Object.values(errors)[0].message)
    }
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      setLoading(true);
      const collection = {
        name: data.nama,
        email: data.email,
        no_hp: data.notelp,
        alamat: data.alamat,
      }

      const result = await authenticationStore.updateUser(collection);
      setLoading(false);
      if (result) props.navigation.goBack();
    }

    return (
      <Screen style={ROOT} preset="scroll" header={
        <Header
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
          headerText="Update Profil"
        />
      }>
        <View style={{ paddingHorizontal: spacing[5] }}>
          {initloading && <ActivityIndicator />}
          {userdata &&
            <>
              <FormProvider {...methods}>
                <Paragraph>Nama Lengkap</Paragraph>
                <TextField
                  containerStyle={{ marginTop: spacing[2], marginBottom: spacing[3] }}
                  name="nama"
                  placeholder={'Nama Lengkap'}
                  defaultValue={user.nama}
                  rules={{ required: 'Nama harus diisi!' }}
                />
                <Paragraph>Email</Paragraph>
                <TextField
                  containerStyle={{ marginTop: spacing[2], marginBottom: spacing[3] }}
                  keyboardType="email-address"
                  name="email"
                  placeholder={'Email'}
                  defaultValue={user.email}
                  rules={{ required: 'Email harus diisi!' }}
                />
                <Paragraph>No Telepon</Paragraph>
                <TextField
                  containerStyle={{ marginTop: spacing[2], marginBottom: spacing[3] }}
                  name="notelp"
                  placeholder={'No Telepon'}
                  defaultValue={userdata.no_hp}
                  rules={{ required: 'No Telepon harus diisi!' }}
                />
                <Paragraph>Alamat</Paragraph>
                <TextField
                  containerStyle={{ marginTop: spacing[2], marginBottom: spacing[3] }}
                  name="alamat"
                  placeholder={'Alamat'}
                  defaultValue={userdata.alamat}
                  rules={{ required: 'Alamat harus diisi!' }}
                />
              </FormProvider>
              <Button
                loading={loading}
                style={{ marginTop: spacing[5] }}
                text={"Simpan"}
                onPress={methods.handleSubmit(onSubmit, onError)}
              />
            </>
          }
        </View>
      </Screen>
    )
  })
