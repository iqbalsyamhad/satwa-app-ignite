import React, { FC, useState } from "react"
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

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const SatwaUpdateScreen: FC<StackScreenProps<NavigatorParamList, "satwaUpdate">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    return (
      <Screen style={ROOT} header={
        <Header
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
          headerText="Update Data Satwa"
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
        <Button
          onPress={() => props.navigation.navigate("satwaUpdateNew")}
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
              onRefresh={() => { }}
            />
          }>
          <DataTable>
            <DataTable.Header style={{
              marginTop: spacing[3],
              borderBottomColor: color.primary
            }}>
              <DataTable.Title>No.</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Nama</DataTable.Title>
              <DataTable.Title style={{ flex: 3 }}>Keterangan</DataTable.Title>
              <DataTable.Title>Jumlah</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
              <DataTable.Cell>1</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>Monyet</DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>Berkembang Biak</DataTable.Cell>
              <DataTable.Cell>5</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </Screen>
    )
  })
