import React, { FC, useEffect, useState } from "react"
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
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const PakanStokScreen: FC<StackScreenProps<NavigatorParamList, "pakanStok">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    const { pakanStore } = useStores();
    const { pakans, getAllPakan } = pakanStore;

    useEffect(() => {
      getPakan();
    }, []);

    const getPakan = async () => {
      setLoading(true);
      await getAllPakan();
      setLoading(false);
    }

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
              onRefresh={() => getPakan()}
            />
          }>
          <DataTable>
            <DataTable.Header style={{
              marginTop: spacing[3],
              borderBottomColor: color.primary
            }}>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title style={{ flex: 3 }}>Nama Pakan</DataTable.Title>
              <DataTable.Title>Ktg</DataTable.Title>
              <DataTable.Title style={{ flex: 1.5 }}>Stok T</DataTable.Title>
              <DataTable.Title style={{ flex: 1.5 }}>Stok D</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Pertanggal</DataTable.Title>
            </DataTable.Header>
            {pakans.map(data =>
              <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
                <DataTable.Cell>{data.id}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 3 }}>{data.nama}</DataTable.Cell>
                <DataTable.Cell>{data.kategori.nama}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }}>-</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }}>-</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>-</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </ScrollView>
      </Screen>
    )
  })
