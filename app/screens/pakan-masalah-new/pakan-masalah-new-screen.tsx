import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ActivityIndicator, Menu, Paragraph, RadioButton, Subheading, TextInput, Title } from "react-native-paper"
import { Modalize } from 'react-native-modalize';
import { FormProvider, useForm } from "react-hook-form";
import * as ImagePicker from '../../utils/imagepicker';
import RBSheet from "react-native-raw-bottom-sheet"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingHorizontal: spacing[5]
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
        paddingHorizontal: spacing[4],
        borderWidth: 1,
        borderColor: "#E7ECF3",
      }}>
        <Subheading style={{ flex: 1 }}>Pilih Satwa</Subheading>
        <Icofont name="chevron-down" color={color.primary} size={28} />
      </View>
    </TouchableOpacity>
  )
}

export const PakanMasalahNewScreen: FC<StackScreenProps<NavigatorParamList, "pakanMasalahNew">> = observer(
  (props) => {
    const [pakanLoading, setPakanLoading] = useState(false);
    const [keterangan, setKeterangan] = useState('retur');
    const [alasan, setAlasan] = useState('tdklayak');
    const [imgresponse, setImgResponse] = useState(null);
    const modalizeRef = useRef<Modalize>(null);
    const rbSheet = useRef<RBSheet>(null);

    type FormValues = {
      jumlah: bigint;
      supplier: string;
    };
    const { ...methods } = useForm();

    const openModal = async () => {
      modalizeRef.current?.open();
      setPakanLoading(true);
      // await satwaStore.getAllSatwa();
      setPakanLoading(false);
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
            headerText="Tambah Permasalahan Pakan"
          />
        }>
          <SelectItem open={() => openModal()} />
          <FormProvider {...methods}>
            <TextField
              containerStyle={{ marginTop: spacing[3] }}
              name="jumlah"
              keyboardType="numeric"
              placeholder={'Jumlah'}
              rules={{ required: 'Jumlah harus diisi!' }}
            />
            <TextField
              containerStyle={{ marginTop: spacing[3] }}
              name="supplier"
              placeholder={'Supplier'}
              rules={{ required: 'Supplier harus diisi!' }}
            />
          </FormProvider>
          <Paragraph style={{ marginTop: spacing[5] }}>Keterangan</Paragraph>
          <View>
            <RadioButton.Group onValueChange={value => setKeterangan(value)} value={keterangan}>
              <RadioButton.Item label="Retur" value="retur" />
              <RadioButton.Item label="Permintaan" value="permintaan" />
            </RadioButton.Group>
          </View>
          <Paragraph style={{ marginTop: spacing[5] }}>Alasan</Paragraph>
          <View>
            <RadioButton.Group onValueChange={value => setAlasan(value)} value={alasan}>
              <RadioButton.Item label="Tidak Layak" value="tdklayak" />
              <RadioButton.Item label="Kurang" value="kurang" />
            </RadioButton.Group>
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
            />
          </View>
          {pakanLoading && <ActivityIndicator style={{ alignSelf: 'center' }} />}
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
