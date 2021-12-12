import React, { FC, useEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { DataTable, Paragraph, TextInput } from "react-native-paper"
import { useStores } from "../../models"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const SatwaScreen: FC<StackScreenProps<NavigatorParamList, "satwa">> = observer(
  ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { satwaStore } = useStores();
    const { satwa, getAllSatwa } = satwaStore;

    useEffect(() => {
      getSatwa();
    }, []);

    const getSatwa = async () => {
      setLoading(true);
      await getAllSatwa();
      setLoading(false);
    }

    return (
      <Screen style={ROOT} header={
        <Header
          headerText="Data Satwa"
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
          />
        </View>
        <ScrollView
          style={{
            paddingHorizontal: spacing[5]
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => getSatwa()}
            />
          }>
          <DataTable>
            <DataTable.Header style={{
              marginTop: spacing[3],
              borderBottomColor: color.primary
            }}>
              <DataTable.Title>No.</DataTable.Title>
              <DataTable.Title style={{ flex: 3 }}>Nama</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Jenis</DataTable.Title>
              <DataTable.Title>Jumlah</DataTable.Title>
            </DataTable.Header>
            {satwa.map(data =>
              <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
                <DataTable.Cell>{data.id}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 3 }}>{data.nama}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>{data.jenis_satwa.nama}</DataTable.Cell>
                <DataTable.Cell>{data.jumlah}</DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>
        </ScrollView>
      </Screen>
    )
  })
