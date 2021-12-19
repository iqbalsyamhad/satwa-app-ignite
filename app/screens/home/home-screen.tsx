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
    const [loadingsj, setLoadingsj] = useState(false);
    const { satwaStore, satwaJenisStore } = useStores();
    useEffect(() => {
      initData();
      getSatwaJenis();
    }, []);
    const initData = async () => {
      setLoading(true);
      await satwaStore.getAllSatwa();
      setLoading(false);
    }
    const getSatwaJenis = async () => {
      setLoadingsj(true);
      await satwaJenisStore.getAllSatwaJenis();
      setLoadingsj(false);
    }
    return (
      <Screen style={ROOT} header={<></>}>
        <View style={{
          paddingHorizontal: spacing[5],
        }}>
          <Image source={require('../../../assets/images/SipesatLogo2.png')}
            style={{ width: 140 }}
            resizeMode={'contain'} />
        </View>
        <ScrollView style={{ paddingTop: spacing[4], paddingHorizontal: spacing[5] }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => initData()}
            />
          }>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1 }}
              onPress={() => props.navigation.navigate("activity")}>
              <View style={[primaryBox, { padding: spacing[3] }]}>
                <Icofont name="view-compact" size={50} color={color.palette.white} />
                <Subheading style={{ color: color.palette.white }}>Buat Aktivitas</Subheading>
              </View>
            </TouchableOpacity>
            <View style={{ width: spacing[4] }} />
            <TouchableOpacity style={{ flex: 1 }}
              onPress={() => props.navigation.navigate("history")}>
              <View style={[primaryBox, { padding: spacing[3] }]}>
                <Icofont name="calendar-check-outline" size={50} color={color.palette.white} />
                <Subheading style={{ color: color.palette.white }}>Lihat Histori</Subheading>
              </View>
            </TouchableOpacity>
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
                <Text style={{ color: color.palette.white, fontSize: 40 }}>{satwaJenisStore.satwa_jenis.length}</Text>
              </View>
            </View>
            <Divider style={{ borderColor: color.palette.white, borderWidth: 0.5 }} />
            <TouchableOpacity style={{ alignSelf: 'center' }}
              onPress={() => props.navigation.navigate("satwaJenis")}>
              <Paragraph style={{ color: color.palette.white, marginVertical: spacing[2] }}>Lihat Data</Paragraph>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate("pakanStok")}>
            <View style={[primaryBox, { alignItems: 'flex-start', marginTop: spacing[3], padding: spacing[1], paddingHorizontal: spacing[3] }]}>
              <Title style={{ color: color.palette.white }}><Icofont name="layers" size={22} />  Stok Pakan</Title>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("satwaUpdate")}>
            <View style={[primaryBox, { alignItems: 'flex-start', marginTop: spacing[3], padding: spacing[1], paddingHorizontal: spacing[3] }]}>
              <Title style={{ color: color.palette.white }}><Icofont name="layers" size={22} />  Update Satwa</Title>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("peralatanStok")}>
            <View style={[primaryBox, { alignItems: 'flex-start', marginTop: spacing[3], padding: spacing[1], paddingHorizontal: spacing[3] }]}>
              <Title style={{ color: color.palette.white }}><Icofont name="layers" size={22} />  Stok Peralatan</Title>
            </View>
          </TouchableOpacity>
          <View style={{ height: spacing[5] }} />
        </ScrollView>
      </Screen>
    )
  })