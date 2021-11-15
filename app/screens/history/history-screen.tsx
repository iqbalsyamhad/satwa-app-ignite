import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { DataTable, Paragraph, TextInput } from "react-native-paper"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const HistoryScreen: FC<StackScreenProps<NavigatorParamList, "history">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { historiesStore } = useStores();
    useEffect(() => {
      getHistories(page);
    }, [page]);
    const getHistories = async (page) => {
      setLoading(true);
      await historiesStore.getHistories(page);
      setLoading(false);
    };
    return (
      <Screen style={ROOT} header={
        <Header
          headerText="Histori"
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
            placeholder={'Cari sesuai bulan/periode'}
          />
        </View>
        <ScrollView
          style={{
            paddingHorizontal: spacing[5]
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => setPage(1)}
            />
          }>
          <DataTable>
            <DataTable.Header style={{
              marginTop: spacing[3],
              borderBottomColor: color.primary
            }}>
              <DataTable.Title>No.</DataTable.Title>
              <DataTable.Title style={{ flex: 3 }}>Tanggal</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Status</DataTable.Title>
              <DataTable.Title>x</DataTable.Title>
            </DataTable.Header>
            {historiesStore.histories?.data.map(data =>
              <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
                <DataTable.Cell>{data.id}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 3 }}>{data.tanggal}</DataTable.Cell>
                <DataTable.Cell style={{
                  flex: 2,
                  paddingTop: spacing[1]
                }}>
                  <View style={{
                    padding: spacing[0],
                    paddingHorizontal: spacing[2],
                    borderRadius: spacing[2],
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'green'
                  }}>
                    <Paragraph style={{ color: color.palette.white }}>{data.status}</Paragraph>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell>
                  <TouchableOpacity onPress={() => props.navigation.navigate("historyDetail")}>
                    <Icofont name="eye" size={18} />
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            )}

            <DataTable.Pagination
              page={historiesStore.histories?.page}
              numberOfPages={historiesStore.histories?.totalPage}
              onPageChange={(page) => { }}
              label={`Halaman ${historiesStore.histories?.page} dari ${historiesStore.histories?.totalPage}`}
            />
          </DataTable>
        </ScrollView>
      </Screen>
    )
  })
