import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen } from "../../components"
import { color, spacing } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Divider, Paragraph, Subheading, Title, Text } from "react-native-paper"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const primaryBox: ViewStyle = {
  backgroundColor: color.palette.primary,
  borderRadius: spacing[4],
  alignItems: 'center'
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    const { satwaStore } = useStores();
    useEffect(() => {
      initData();
    }, []);
    const initData = async () => {
      setLoading(true);
      await satwaStore.getAllSatwa();
      setLoading(false);
    }
    return (
      <Screen style={ROOT} header={<></>}>
        <View style={{
          paddingTop: spacing[5],
          paddingHorizontal: spacing[5],
        }}>
          <Image source={require('../../../assets/images/SipesatLogo2.png')}
            style={{ width: 140 }}
            resizeMode={'contain'} />
          <Title style={{ color: '#007FFF', marginVertical: spacing[3] }}>Home</Title>
        </View>
        <ScrollView style={{ paddingHorizontal: spacing[5] }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => initData()}
            />
          }>
          <View style={{ flexDirection: 'row' }}>
            <View style={[primaryBox, { flex: 1, padding: spacing[3] }]}>
              <Icofont name="view-compact" size={50} color={color.palette.white} />
              <Subheading style={{ color: color.palette.white }}>Buat Aktivitas</Subheading>
            </View>
            <View style={{ width: spacing[4] }} />
            <View style={[primaryBox, { flex: 1, padding: spacing[3] }]}>
              <Icofont name="calendar-check-outline" size={50} color={color.palette.white} />
              <Subheading style={{ color: color.palette.white }}>Lihat Histori</Subheading>
            </View>
          </View>
          <Divider style={{ borderColor: color.palette.primary, borderWidth: 0.5, marginVertical: spacing[4] }} />
          <View style={[primaryBox, { alignItems: 'stretch' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing[3] }}>
              <View style={{ flex: 1.2, alignItems: 'center' }}>
                <Subheading style={{ color: color.palette.white }}>Jumlah Satwa</Subheading>
                <Text style={{ color: color.palette.white, fontSize: 40 }}>{satwaStore.satwa.length || '-'}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image source={require('../../../assets/images/burungnyawhite.png')}
                  style={{ width: 70 }}
                  resizeMode={'contain'} />
              </View>
            </View>
            <Divider style={{ borderColor: color.palette.white, borderWidth: 0.5 }} />
            <TouchableOpacity style={{ alignSelf: 'center' }}
              onPress={() => props.navigation.navigate("satwa")}>
              <Paragraph style={{ color: color.palette.white, marginVertical: spacing[2] }}>Lihat Data</Paragraph>
            </TouchableOpacity>
          </View>
          <View style={[primaryBox, { alignItems: 'stretch', marginTop: spacing[3] }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing[3] }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Icofont name="layers" color={color.palette.white} size={70} />
              </View>
              <View style={{ flex: 1.2, alignItems: 'center' }}>
                <Subheading style={{ color: color.palette.white }}>Jenis Satwa</Subheading>
                <Text style={{ color: color.palette.white, fontSize: 40 }}>200</Text>
              </View>
            </View>
            <Divider style={{ borderColor: color.palette.white, borderWidth: 0.5 }} />
            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <Paragraph style={{ color: color.palette.white, marginVertical: spacing[2] }}>Lihat Data</Paragraph>
            </TouchableOpacity>
          </View>
          <View style={[primaryBox, { alignItems: 'flex-start', marginTop: spacing[3], padding: spacing[1], paddingHorizontal: spacing[3] }]}>
            <Title style={{ color: color.palette.white }}><Icofont name="layers" size={22} />  Stok Pakan</Title>
          </View>
          <View style={[primaryBox, { alignItems: 'flex-start', marginTop: spacing[3], padding: spacing[1], paddingHorizontal: spacing[3] }]}>
            <Title style={{ color: color.palette.white }}><Icofont name="layers" size={22} />  Permasalahan Pakan</Title>
          </View>
          <View style={[primaryBox, { alignItems: 'flex-start', marginTop: spacing[3], padding: spacing[1], paddingHorizontal: spacing[3] }]}>
            <Title style={{ color: color.palette.white }}><Icofont name="layers" size={22} />  Update Satwa</Title>
          </View>
        </ScrollView>
      </Screen>
    )
  })