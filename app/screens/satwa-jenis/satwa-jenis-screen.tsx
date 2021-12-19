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

export const SatwaJenisScreen: FC<StackScreenProps<NavigatorParamList, "satwaJenis">> = observer(
  ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { satwaJenisStore } = useStores();
    useEffect(() => {
      getSatwaJenis();
    }, []);
    const getSatwaJenis = async () => {
      setLoading(true);
      await satwaJenisStore.getAllSatwaJenis();
      setLoading(false);
    }
    return (
      <Screen style={ROOT} header={
        <Header
          headerText="Data Jenis Satwa"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
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
              onRefresh={() => getSatwaJenis()}
            />
          }>
          <DataTable>
            <DataTable.Header style={{
              marginTop: spacing[3],
              borderBottomColor: color.primary
            }}>
              <DataTable.Title style={{ flex: 1 }}>ID</DataTable.Title>
              <DataTable.Title style={{ flex: 4 }}>Nama</DataTable.Title>
            </DataTable.Header>
            {satwaJenisStore.satwa_jenis.filter(createFilter(searchTerm, ['nama'])).map(data =>
              <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
                <DataTable.Cell style={{ flex: 1 }}>{data.id}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 4 }}>{data.nama}</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </ScrollView>
      </Screen>
    )
  })
