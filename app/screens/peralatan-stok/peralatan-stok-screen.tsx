import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { DataTable, TextInput } from "react-native-paper"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const PeralatanStokScreen: FC<StackScreenProps<NavigatorParamList, "peralatanStok">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);

    return (
      <Screen style={ROOT} header={
        <Header
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
          rightIcon="clipboard-list-outline"
          onRightPress={() => props.navigation.navigate("peralatanUses")}
          headerText="Data Stok Peralatan"
        />
      }>
        <View style={{
          backgroundColor: color.palette.bgForms,
          marginHorizontal: spacing[5],
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
        <ScrollView
          style={{
            paddingHorizontal: spacing[5]
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => { }}
            />
          }>
          <DataTable>
            <DataTable.Header style={{
              marginTop: spacing[3],
              borderBottomColor: color.primary
            }}>
              <DataTable.Title>No.</DataTable.Title>
              <DataTable.Title style={{ flex: 1.5 }}>Peralatan</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Ktg</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Stok</DataTable.Title>
              <DataTable.Title>Kondisi</DataTable.Title>
              <DataTable.Title style={{ flex: 1.5 }}>Aksi</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
              <DataTable.Cell>1</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1.5 }}>Vaksin</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>Habis Pakai</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>150</DataTable.Cell>
              <DataTable.Cell>Banyak</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1.5 }}>+USE</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </Screen>
    )
  })