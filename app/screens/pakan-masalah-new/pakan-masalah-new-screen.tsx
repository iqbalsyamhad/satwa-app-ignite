import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ActivityIndicator, Checkbox, Menu, Paragraph, RadioButton, Subheading, TextInput, Title } from "react-native-paper"
import { Modalize } from 'react-native-modalize';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as ImagePicker from '../../utils/imagepicker';
import RBSheet from "react-native-raw-bottom-sheet"
import { useStores } from "../../models"
import { createFilter } from 'react-native-search-filter'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingHorizontal: spacing[5]
}

export const PakanMasalahNewScreen: FC<StackScreenProps<NavigatorParamList, "pakanMasalahNew">> = observer(
  (props) => {
    const [pakanLoading, setPakanLoading] = useState(false);
    const [searchPakan, setSearchPakan] = useState('');
    const [supplierLoading, setSupplierLoading] = useState(false);
    const [searchSupplier, setSearchSupplier] = useState('');
    const [saveLoading, setSaveLoading] = useState(false);
    const [pakan_, setPakan_] = useState(null);
    const [supplier_, setSupplier_] = useState(null);
    const [isBermasalah, setIsBermasalah] = useState(false);
    const [keterangan, setKeterangan] = useState('Retur');
    const [alasan, setAlasan] = useState('Tidak Layak');
    const [imgresponse, setImgResponse] = useState(null);
    const { pakanStore, supplierStore } = useStores();
    const { pakans, getAllPakan, createPakanPermasalahan } = pakanStore;
    const { suppliers, getAllSupplier } = supplierStore;
    const modalizeRef = useRef<Modalize>(null);
    const modalizeSuppRef = useRef<Modalize>(null);
    const rbSheet = useRef<RBSheet>(null);

    useEffect(() => {
      modalizeRef.current?.close();
    }, [pakan_]);

    useEffect(() => {
      modalizeSuppRef.current?.close();
    }, [supplier_]);

    type FormValues = {
      jumlah: bigint;
    };
    const { ...methods } = useForm();
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
      Alert.alert('Ops..', Object.values(errors)[0].message)
    }
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        if (!pakan_) throw new Error('Pilih jenis pakan!');
        if (!supplier_?.id) throw new Error('Pilih supplier!');
        if (!imgresponse) throw new Error('Upload gambar permasalahan pakan!');

        let collection = {
          id_pakan: pakan_.id,
          jumlah: data.jumlah,
          id_supplier: supplier_.id,
          keterangan: isBermasalah ? keterangan : '',
          alasan: isBermasalah ? alasan : '',
          bukti_foto: { name: imgresponse.fileName, ...imgresponse },
        }

        setSaveLoading(true);
        await createPakanPermasalahan(collection)
        if (pakanStore.errmsg == '') {
          await pakanStore.getAllPakanPermasalahan();
          setSaveLoading(false);
          props.navigation.goBack();
        } else {
          setSaveLoading(false);
        }
      } catch (error) {
        alert(error.message);
      }
    }

    const openModal = async () => {
      modalizeRef.current?.open();
      if (!pakans.length) {
        setPakanLoading(true);
        await getAllPakan();
        setPakanLoading(false);
      }
    }

    const openSuppModal = async () => {
      modalizeSuppRef.current?.open();
      if (!suppliers.length) {
        setSupplierLoading(true);
        await getAllSupplier();
        setSupplierLoading(false);
      }
    }

    const imagePick = async (type) => {
      if (type === 'capture') {
        ImagePicker.onlaunchCamera(onImagePick);
      } else {
        ImagePicker.onlaunchImageLibrary(onImagePick);
      }
    }

    const onImagePick = (response) => {
      if (response.assets) {
        response.assets.map(asset => setImgResponse(asset));
        rbSheet.current.close();
      }
    }

    return (
      <>
        <Screen style={ROOT} preset="scroll" header={
          <Header
            leftIcon="back"
            onLeftPress={() => props.navigation.goBack()}
            headerText="Tambah Serah Terima Pakan"
          />
        }>
          <TouchableOpacity onPress={() => openModal()}>
            <View style={{
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: color.palette.bgForms,
              borderRadius: spacing[3],
              paddingHorizontal: spacing[4],
              borderWidth: 1,
              borderColor: "#E7ECF3",
            }}>
              <Subheading style={{ flex: 1 }}>{pakan_?.nama || 'Pilih Pakan'}</Subheading>
              <Icofont name="chevron-down" color={color.primary} size={28} />
            </View>
          </TouchableOpacity>
          <FormProvider {...methods}>
            <TextField
              containerStyle={{ marginTop: spacing[3] }}
              name="jumlah"
              keyboardType="numeric"
              placeholder={'Jumlah'}
              rules={{ required: 'Jumlah harus diisi!' }}
            />
          </FormProvider>
          <TouchableOpacity onPress={() => openSuppModal()}>
            <View style={{
              marginTop: spacing[3],
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: color.palette.bgForms,
              borderRadius: spacing[3],
              paddingHorizontal: spacing[4],
              borderWidth: 1,
              borderColor: "#E7ECF3",
            }}>
              <Subheading style={{ flex: 1 }}>{supplier_?.nama || 'Pilih Supplier'}</Subheading>
              <Icofont name="chevron-down" color={color.primary} size={28} />
            </View>
          </TouchableOpacity>
          <View style={{
            backgroundColor: color.palette.bgForms,
            marginTop: spacing[5],
            borderRadius: spacing[3],
            borderWidth: 1,
            borderColor: "#E7ECF3",
          }}>
            <Checkbox.Item label="Serah Terima Bermasalah" status={isBermasalah ? "checked" : "unchecked"} onPress={() => setIsBermasalah(v => !v)} />
            {isBermasalah &&
              <View style={{ paddingHorizontal: spacing[3] }}>
                <Paragraph style={{ marginTop: spacing[5] }}>Keterangan</Paragraph>
                <View>
                  <RadioButton.Group onValueChange={value => setKeterangan(value)} value={keterangan}>
                    <RadioButton.Item label="Retur" value="Retur" />
                    <RadioButton.Item label="Permintaan" value="Permintaan" />
                  </RadioButton.Group>
                </View>
                <Paragraph style={{ marginTop: spacing[5] }}>Alasan</Paragraph>
                <View>
                  <RadioButton.Group onValueChange={value => setAlasan(value)} value={alasan}>
                    <RadioButton.Item label="Tidak Layak" value="Tidak Layak" />
                    <RadioButton.Item label="Kurang" value="Kurang" />
                  </RadioButton.Group>
                </View>
              </View>
            }
          </View>
          <Paragraph style={{ marginTop: spacing[5] }}>Bukti Photo</Paragraph>
          <TouchableOpacity onPress={() => rbSheet.current?.open()}>
            <View style={{
              marginTop: spacing[3],
              flexDirection: 'row',
              height: 160,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color.palette.bgForms,
              borderRadius: spacing[3],
              borderWidth: 1,
              borderColor: "#E7ECF3",
              overflow: 'hidden',
            }}>
              {imgresponse ?
                <>
                  <Image source={{ uri: imgresponse.uri }}
                    style={{ flex: 1, width: undefined, height: 160 }}
                    resizeMode={'contain'} />
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}>
                    <TouchableOpacity onPress={() => setImgResponse(null)}>
                      <Paragraph style={{ color: color.palette.angry, backgroundColor: color.palette.bgForms, borderRadius: 10, padding: 5 }}><Icofont name="delete" size={16} /> Hapus</Paragraph>
                    </TouchableOpacity>
                  </View>
                </>
                :
                <Image source={require('../../../assets/images/cameraplus.png')}
                  style={{ opacity: 0.2, width: 100, height: 100 }}
                  resizeMode={'contain'} />
              }
            </View>
          </TouchableOpacity>
          <Button
            preset="small"
            style={{ marginTop: spacing[3] }}
            loading={saveLoading}
            onPress={methods.handleSubmit(onSubmit, onError)}>
            <Paragraph style={{ color: color.palette.white }}><Icofont name="check" size={16} /> Simpan</Paragraph>
          </Button>
          <View style={{ height: spacing[5] }} />
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
              <Title>Data Pakan</Title>
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
              value={searchPakan}
              onChangeText={(v) => setSearchPakan(v)}
            />
          </View>
          {pakanLoading && <ActivityIndicator style={{ alignSelf: 'center' }} />}
          {pakans.filter(createFilter(searchPakan, ['nama'])).map(data =>
            <TouchableOpacity key={data.id} onPress={() => setPakan_(JSON.parse(JSON.stringify(data)))}>
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
        <Modalize
          ref={modalizeSuppRef}
          modalTopOffset={50}
          snapPoint={420}
          modalStyle={{
            padding: spacing[3]
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Title>Data Supplier</Title>
            </View>
            <TouchableOpacity onPress={() => modalizeSuppRef.current?.close()}>
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
              value={searchSupplier}
              onChangeText={(v) => setSearchSupplier(v)}
            />
          </View>
          {supplierLoading && <ActivityIndicator style={{ alignSelf: 'center' }} />}
          {suppliers.filter(createFilter(searchSupplier, ['nama'])).map(data =>
            <TouchableOpacity key={data.id} onPress={() => setSupplier_(JSON.parse(JSON.stringify(data)))}>
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
        <RBSheet
          ref={rbSheet}
          height={120}
          openDuration={250}>
          <Menu.Item icon="camera" onPress={() => imagePick('capture')} title="Ambil dari Kamera" />
          <Menu.Item icon="image" onPress={() => imagePick('library')} title="Pilih dari Galeri" />
        </RBSheet>
      </>
    )
  })
