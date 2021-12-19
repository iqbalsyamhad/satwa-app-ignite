import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { DataTable, Paragraph, TextInput } from "react-native-paper"
import { useStores } from "../../models"
import { createFilter } from 'react-native-search-filter'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const PakanStokScreen: FC<StackScreenProps<NavigatorParamList, "pakanStok">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { pakanStore } = useStores();
    const { pakansMasalah, getAllPakanPermasalahan } = pakanStore;

    useEffect(() => {
      getPakanStok();
    }, []);

    const getPakanStok = async () => {
      setLoading(true);
      await getAllPakanPermasalahan();
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
            value={searchTerm}
            onChangeText={(v) => setSearchTerm(v)}
          />
        </View>
        <Button
          onPress={() => props.navigation.navigate('pakanMasalahNew')}
          preset="small"
          style={{
            marginHorizontal: spacing[5],
            marginTop: spacing[3],
            alignSelf: 'baseline',
          }}>
          <Paragraph style={{ color: color.palette.white }}><Icofont name="plus-circle-outline" size={16} /> Tambah</Paragraph>
        </Button>
        <ScrollView
          style={{
            paddingHorizontal: spacing[5]
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => getPakanStok()}
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
            {pakansMasalah.filter(createFilter(searchTerm, ['pakan.nama'])).map(data =>
              <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
                <DataTable.Cell>{data.id}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 3 }}>{data.pakan.nama}</DataTable.Cell>
                <DataTable.Cell>{'-'}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }}>{'-'}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }}>{data.jumlah}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>{'-'}</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </ScrollView>
      </Screen>
    )
  })
