import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
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

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingHorizontal: spacing[5]
}

const OptionItem = (props) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: props.isActive ? color.palette.primary : color.palette.bgForms,
      marginTop: spacing[2],
      borderRadius: spacing[3],
      padding: spacing[1],
      paddingHorizontal: spacing[4],
      borderWidth: 0.5,
      borderColor: "#A7B0C0",
    }}>
      <Checkbox
        color={color.palette.white}
        status={props.isActive ? 'checked' : 'unchecked'}
      />
      <Subheading style={{ marginLeft: spacing[2], color: props.isActive ? color.palette.white : color.palette.primary }}>Berkembang Biak</Subheading>
    </View>
  )
}

const SelectItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.open()}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.palette.bgForms,
        borderRadius: spacing[3],
        padding: spacing[1],
        paddingHorizontal: spacing[4],
        borderWidth: 0.5,
        borderColor: "#A7B0C0",
      }}>
        <Subheading style={{ flex: 1 }}>Pilih Satwa</Subheading>
        <Icofont name="chevron-down" color={color.primary} size={28} />
      </View>
    </TouchableOpacity>
  )
}

export const SatwaUpdateNewScreen: FC<StackScreenProps<NavigatorParamList, "satwaUpdateNew">> = observer(
  (props) => {
    const [satwaLoading, setSatwaLoading] = useState(false);
    const [imgresponse, setImgResponse] = useState(null);
    const { satwaStore } = useStores();
    const modalizeRef = useRef<Modalize>(null);
    const rbSheet = useRef<RBSheet>(null);

    const openModal = async () => {
      modalizeRef.current?.open();
      setSatwaLoading(true);
      await satwaStore.getAllSatwa();
      setSatwaLoading(false);
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
            headerText="Tambah Update"
          />
        }>
          <SelectItem open={() => openModal()} />
          <Paragraph style={{ marginTop: spacing[5] }}>Keterangan:</Paragraph>
          <OptionItem isActive={true} />
          <OptionItem isActive={false} />
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
            />
          </View>
          {satwaLoading && <ActivityIndicator style={{ alignSelf: 'center' }} />}
          {satwaStore.satwa.map(satwa =>
            <View key={satwa.id}
              style={{
                padding: spacing[2],
                backgroundColor: color.palette.primary,
                borderRadius: spacing[2],
                marginTop: spacing[2],
              }}>
              <Subheading style={{ color: 'white' }}>{satwa.name}</Subheading>
            </View>
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