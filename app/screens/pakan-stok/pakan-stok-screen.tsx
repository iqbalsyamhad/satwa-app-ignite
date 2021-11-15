import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { DataTable, Paragraph, TextInput } from "react-native-paper"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const PakanStokScreen: FC<StackScreenProps<NavigatorParamList, "pakanStok">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    return (
      <Screen style={ROOT} header={
        <Header
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
          headerText="Data Stok Pakan"
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
              <DataTable.Title style={{ flex: 3 }}>Nama Pakan</DataTable.Title>
              <DataTable.Title>Ktg</DataTable.Title>
              <DataTable.Title style={{ flex: 1.5 }}>Stok T</DataTable.Title>
              <DataTable.Title style={{ flex: 1.5 }}>Stok D</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Pertanggal</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
              <DataTable.Cell>1</DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>Beras Merah</DataTable.Cell>
              <DataTable.Cell>Biji</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1.5 }}>10 kg</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1.5 }}>10 kg</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>10/11/21</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </Screen>
    )
  })
