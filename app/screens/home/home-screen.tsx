import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Divider, Paragraph, Subheading, Title, Text } from "react-native-paper"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={ROOT} preset="scroll">
        <View style={{ paddingHorizontal: spacing[6] }}>
          <Image source={require('../../../assets/images/SipesatLogo2.png')}
            style={{ width: 140 }}
            resizeMode={'contain'} />
          <Subheading style={{ color: '#007FFF', marginVertical: spacing[3] }}>Home</Subheading>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.primaryBox, { flex: 1, padding: spacing[3] }]}>
              <Icofont name="view-compact" size={50} color={color.palette.white} />
              <Subheading style={{ color: color.palette.white }}>Buat Aktivitas</Subheading>
            </View>
            <View style={{ width: spacing[4] }} />
            <View style={[styles.primaryBox, { flex: 1, padding: spacing[3] }]}>
              <Icofont name="calendar-check-outline" size={50} color={color.palette.white} />
              <Subheading style={{ color: color.palette.white }}>Lihat Histori</Subheading>
            </View>
          </View>
          <Divider style={{ borderColor: color.palette.primary, borderWidth: 0.5, marginVertical: spacing[4] }} />
          <View style={[styles.primaryBox, { alignItems: 'stretch' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing[3] }}>
              <View style={{ flex: 1.2, alignItems: 'center' }}>
                <Subheading style={{ color: color.palette.white }}>Jumlah Satwa</Subheading>
                <Text style={{ color: color.palette.white, fontSize: 40 }}>200</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image source={require('../../../assets/images/burungnyawhite.png')}
                  style={{ width: 70 }}
                  resizeMode={'contain'} />
              </View>
            </View>
            <Divider style={{ borderColor: color.palette.white, borderWidth: 0.5 }} />
            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <Paragraph style={{ color: color.palette.white, marginVertical: spacing[2] }}>Lihat Data</Paragraph>
            </TouchableOpacity>
          </View>
          <View style={[styles.primaryBox, { alignItems: 'stretch', marginTop: spacing[3] }]}>
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
          <View style={[styles.primaryBox, { alignItems: 'flex-start', marginTop: spacing[3], padding: spacing[1], paddingHorizontal: spacing[3] }]}>
            <Title style={{ color: color.palette.white }}><Icofont name="layers" size={22} />  Stok Pakan</Title>
          </View>
          <View style={[styles.primaryBox, { alignItems: 'flex-start', marginTop: spacing[3], padding: spacing[1], paddingHorizontal: spacing[3] }]}>
            <Title style={{ color: color.palette.white }}><Icofont name="layers" size={22} />  Permasalahan Pakan</Title>
          </View>
          <View style={[styles.primaryBox, { alignItems: 'flex-start', marginTop: spacing[3], padding: spacing[1], paddingHorizontal: spacing[3] }]}>
            <Title style={{ color: color.palette.white }}><Icofont name="layers" size={22} />  Update Satwa</Title>
          </View>
        </View>
      </Screen>
    )
  })

const styles = StyleSheet.create({
  primaryBox: {
    backgroundColor: color.palette.primary,
    borderRadius: spacing[4],
    alignItems: 'center'
  }
})