import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modalize } from 'react-native-modalize';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { ActivityIndicator, Paragraph, Subheading, TextInput, Title } from "react-native-paper"
import { useStores } from "../../models"
import { createFilter } from 'react-native-search-filter'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingHorizontal: spacing[5]
}

export const PeralatanUsesNewScreen: FC<StackScreenProps<NavigatorParamList, "peralatanUsesNew">> = observer(
  (props) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [peralatan_, setPeralatan_] = useState(null);
    const { peralatanStore } = useStores();
    const { peralatans, getAllPeralatan, getAllPeralatanPenggunaan, loading, setLoading, createPeralatanPenggunaan, errmsg } = peralatanStore;
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
      modalizeRef.current?.close();
    }, [peralatan_]);

    type FormValues = {
      jumlah: bigint;
      keterangan: string;
    };
    const { ...methods } = useForm();

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
      Alert.alert('Ops..', Object.values(errors)[0].message)
    }
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        if (!peralatan_) throw new Error('Pilih jenis peralatan!');

        let collection = {
          id_peralatan: peralatan_.id,
          jumlah: data.jumlah,
          keterangan: data.keterangan,
        }

        setSaveLoading(true);
        await createPeralatanPenggunaan(collection);
        if (errmsg == '') {
          await getAllPeralatanPenggunaan();
          setSaveLoading(false);
          props.navigation.goBack()
        } else {
          setSaveLoading(false);
          alert(errmsg);
        }
      } catch (error) {
        alert(error.message);
      }
    }

    const openModal = async () => {
      modalizeRef.current?.open();
      if (!peralatans.length) {
        setLoading(true);
        await getAllPeralatan();
        setLoading(false);
      }
    }

    return (
      <>
        <Screen style={ROOT} preset="scroll" header={
          <Header
            leftIcon="back"
            onLeftPress={() => props.navigation.goBack()}
            headerText="Tambah Penggunaan"
          />
        }>

          <TouchableOpacity onPress={() => openModal()}>
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
              <Subheading style={{ flex: 1 }}>{peralatan_?.nama || 'Pilih Peralatan'}</Subheading>
              <Icofont name="chevron-down" color={color.primary} size={28} />
            </View>
          </TouchableOpacity>
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
          <Button
            preset="small"
            style={{ marginTop: spacing[3] }}
            loading={saveLoading}
            onPress={methods.handleSubmit(onSubmit, onError)}>
            <Paragraph style={{ color: color.palette.white }}><Icofont name="check" size={16} /> Simpan</Paragraph>
          </Button>
        </Screen>
        <Modalize
          ref={modalizeRef}
          modalTopOffset={50}
          snapPoint={420}
          modalStyle={{
            padding: spacing[3]
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Title>Data Peralatan</Title>
            </View>
            <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
              <Icofont name="close" size={20} />
            </TouchableOpacity>
          </View>
          <View style={{
            backgroundColor: color.palette.bgForms,
            marginVertical: spacing[3],
            borderWidth: 1,
            borderColor: '#E7ECF3',
            borderRadius: spacing[3],
            overflow: 'hidden'
          }}>
            <TextInput
              style={{ marginVertical: -spacing[2], backgroundColor: 'transparent' }}
              underlineColor={'transparent'}
              left={<TextInput.Icon name="magnify" color={color.palette.primary} />}
              placeholder={'Cari'}
              value={searchTerm}
              onChangeText={(v) => setSearchTerm(v)}
            />
          </View>
          {loading && <ActivityIndicator style={{ alignSelf: 'center' }} />}
          {peralatans.filter(createFilter(searchTerm, ['nama'])).map(data =>
            <TouchableOpacity key={Math.random()} onPress={() => setPeralatan_(JSON.parse(JSON.stringify(data)))}>
              <View
                style={{
                  padding: spacing[2],
                  backgroundColor: color.palette.primary,
                  borderRadius: spacing[2],
                  marginTop: spacing[2],
                }}>
                <Subheading style={{ color: 'white' }}>{data.nama}</Subheading>
              </View>
            </TouchableOpacity>
          )}
        </Modalize>
      </>
    )
  })
