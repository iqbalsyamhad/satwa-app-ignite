import React, { FC, useEffect, useState } from "react"
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
import { useStores } from "../../models"
import { createFilter } from 'react-native-search-filter'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const PeralatanStokScreen: FC<StackScreenProps<NavigatorParamList, "peralatanStok">> = observer(
  (props) => {
    const { peralatanStore } = useStores();
    const { peralatans, loading, getAllPeralatan, setLoading } = peralatanStore;
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      getPeralatan();
    }, []);

    const getPeralatan = async () => {
      setLoading(true);
      await getAllPeralatan();
      setLoading(false);
    }

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
            value={searchTerm}
            onChangeText={(v) => setSearchTerm(v)}
          />
        </View>
        <ScrollView
          style={{
            paddingHorizontal: spacing[5]
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => getPeralatan()}
            />
          }>
          <DataTable>
            <DataTable.Header style={{
              marginTop: spacing[3],
              borderBottomColor: color.primary
            }}>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title style={{ flex: 1.5 }}>Peralatan</DataTable.Title>
              <DataTable.Title style={{ flex: 1.5 }}>Ktg</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Stok</DataTable.Title>
              <DataTable.Title>Kondisi</DataTable.Title>
            </DataTable.Header>
            {peralatans.filter(createFilter(searchTerm, ['nama'])).map(data =>
              <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
                <DataTable.Cell>{data.id}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }}>{data.nama}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }}>{data.kategori.nama}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1 }}>{data.stok}</DataTable.Cell>
                <DataTable.Cell>Banyak</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </ScrollView>
      </Screen>
    )
  })
