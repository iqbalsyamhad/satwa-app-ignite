import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ActivityIndicator, Checkbox, Menu, Paragraph, Subheading, TextInput, Title } from "react-native-paper"
import { Modalize } from 'react-native-modalize';
import { useStores } from "../../models";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from '../../utils/imagepicker';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { createFilter } from 'react-native-search-filter'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingHorizontal: spacing[5]
}

const ketSatwa = [
  'Berkembang Biak',
  'Mati',
  'Hibah',
  'Titipan'
]

export const SatwaUpdateNewScreen: FC<StackScreenProps<NavigatorParamList, "satwaUpdateNew">> = observer(
  (props) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [satwaLoading, setSatwaLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [satwa_, setSatwa_] = useState(null);
    const [keterangan, setKeterangan] = useState(null);
    const [imgresponse, setImgResponse] = useState(null);
    const { satwaStore } = useStores();
    const { satwa, getAllSatwa, createUpdateSatwa } = satwaStore;
    const modalizeRef = useRef<Modalize>(null);
    const rbSheet = useRef<RBSheet>(null);

    useEffect(() => {
      modalizeRef.current?.close();
    }, [satwa_]);

    const openModal = async () => {
      modalizeRef.current?.open();
      if (!satwa.length) {
        setSatwaLoading(true);
        await getAllSatwa();
        setSatwaLoading(false);
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

    type FormValues = {
      jumlah: bigint;
    };
    const { ...methods } = useForm();
    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
      return console.log(errors)
    }
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        if (!satwa_) throw new Error('Pilih Satwa!');
        if (!keterangan) throw new Error('Pilih Keterangan!');
        if (!imgresponse) throw new Error('Upload gambar update satwa!');

        let collection = {
          id_satwa: satwa_.id,
          keterangan: keterangan,
          jumlah: data.jumlah,
          bukti_foto: { name: imgresponse.fileName, ...imgresponse },
        }

        setSaveLoading(true);
        await createUpdateSatwa(collection);
        setSaveLoading(false);
      } catch (error) {
        alert(error.message);
      }
    }

    const SelectItem = (props) => {
      return (
        <TouchableOpacity onPress={() => props.open()}>
          <View style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: color.palette.bgForms,
            borderRadius: spacing[3],
            padding: spacing[1],
            paddingHorizontal: spacing[4],
            borderWidth: 1,
            borderColor: "#E7ECF3",
          }}>
            <Subheading style={{ flex: 1 }}>{satwa_?.nama || 'Pilih Satwa'}</Subheading>
            <Icofont name="chevron-down" color={color.primary} size={28} />
          </View>
        </TouchableOpacity>
      )
    }

    const OptionItem = (props) => {
      const item = props.item;
      return (
        <TouchableOpacity onPress={() => setKeterangan(item)}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: item == keterangan ? color.palette.primary : color.palette.bgForms,
            marginTop: spacing[2],
            borderRadius: spacing[3],
            padding: spacing[1],
            paddingHorizontal: spacing[4],
            borderWidth: 0.5,
            borderColor: "#A7B0C0",
          }}>
            <Checkbox
              color={color.palette.white}
              status={item == keterangan ? 'checked' : 'unchecked'}
            />
            <Subheading style={{ marginLeft: spacing[2], color: item == keterangan ? color.palette.white : color.palette.primary }}>{item}</Subheading>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <>
        <Screen style={ROOT} preset="scroll" header={
          <Header
            leftIcon="back"
            onLeftPress={() => props.navigation.goBack()}
            headerText="Tambah Update"
          />
        }>
          <SelectItem open={() => openModal()} />
          <Paragraph style={{ marginTop: spacing[4] }}>Keterangan:</Paragraph>
          {ketSatwa.map(data =>
            <OptionItem key={Math.random()} item={data} />
          )}
          <FormProvider {...methods}>
            <TextField
              containerStyle={{ marginTop: spacing[4] }}
              name="jumlah"
              keyboardType="numeric"
              placeholder={'Jumlah'}
              rules={{ required: 'Jumlah harus diisi!' }}
            />
          </FormProvider>
          <Paragraph style={{ marginTop: spacing[5] }}>Bukti Foto:</Paragraph>
          <TouchableOpacity onPress={() => rbSheet.current?.open()}>
            <View style={{
              marginTop: spacing[3],
              flexDirection: 'row',
              height: 160,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color.palette.bgForms,
              borderRadius: spacing[3],
              borderWidth: 0.5,
              borderColor: "#A7B0C0",
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
            style={{ marginTop: spacing[4] }}
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
              <Title>Data Satwa</Title>
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
          {satwaLoading && <ActivityIndicator style={{ alignSelf: 'center' }} />}
          {satwa.filter(createFilter(searchTerm, ['nama'])).map(satwa =>
            <TouchableOpacity key={satwa.id} onPress={() => setSatwa_(JSON.parse(JSON.stringify(satwa)))}>
              <View
                style={{
                  padding: spacing[2],
                  backgroundColor: color.palette.primary,
                  borderRadius: spacing[2],
                  marginTop: spacing[2],
                }}>
                <Subheading style={{ color: 'white' }}>{satwa.nama}</Subheading>
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