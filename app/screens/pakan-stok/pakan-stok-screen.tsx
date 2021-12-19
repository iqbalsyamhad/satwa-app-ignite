import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ActivityIndicator, Caption, DataTable, Paragraph, Subheading, TextInput, Title } from "react-native-paper"
import { useStores } from "../../models"
import { createFilter } from 'react-native-search-filter'
import moment from "moment"
import CalendarPicker from 'react-native-calendar-picker'
import { Modalize } from 'react-native-modalize';
import Modal from "react-native-modal";

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const PakanStokScreen: FC<StackScreenProps<NavigatorParamList, "pakanStok">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    const [pakanLoading, setPakanLoading] = useState(false);
    const [searchPakan, setSearchPakan] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { pakanStore } = useStores();
    const {
      pakansMasalah,
      getAllPakanPermasalahan,
      setCurrentPage,
      filterDate,
      filterPakan,
      setFilterDate,
      setFilterPakan,
    } = pakanStore;
    const [showCalendar, setShowCalendar] = useState(false);
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
      getPakanStok();
    }, [pakansMasalah.current_page]);

    useEffect(() => {
      setShowCalendar(false);
      refreshData();
    }, [filterDate]);

    useEffect(() => {
      modalizeRef.current?.close();
      refreshData();
    }, [filterPakan?.id]);

    const refreshData = () => {
      pakansMasalah.current_page == 1 ? getPakanStok() : setCurrentPage(1);
    }

    const getPakanStok = async () => {
      setLoading(true);
      await getAllPakanPermasalahan();
      setLoading(false);
    }


    const openModal = async () => {
      modalizeRef.current?.open();
      if (!pakanStore.pakans.length) {
        setPakanLoading(true);
        await pakanStore.getAllPakan();
        setPakanLoading(false);
      }
    }

    return (
      <>
        <Screen style={ROOT} header={
          <Header
            leftIcon="back"
            onLeftPress={() => props.navigation.goBack()}
            headerText="Data Stok Pakan"
          />
        }>
          <Caption style={{ marginLeft: spacing[5] }}>Filter</Caption>
          <ScrollView horizontal style={{ maxHeight: 50 }}>
            <View style={[styles.filterBtn, { marginLeft: spacing[5] }]}>
              <TouchableOpacity onPress={() => setShowCalendar(true)}>
                <Text style={{ fontSize: 16, margin: 0, color: 'black' }}><Icofont name="calendar" size={16} color={color.primary} />  {filterDate == '' ? 'Semua tanggal' : moment(filterDate).format('DD MMM YYYY')}</Text>
              </TouchableOpacity>
              {filterDate != '' &&
                <TouchableOpacity onPress={() => setFilterDate('')}
                  style={{ marginLeft: spacing[2] }}>
                  <Icofont name="close" size={18} color={'red'} />
                </TouchableOpacity>
              }
            </View>
            <View style={[styles.filterBtn, { marginLeft: spacing[2] }]}>
              <TouchableOpacity onPress={() => openModal()}>
                <Text style={{ fontSize: 16, margin: 0, color: 'black' }}><Icofont name="donkey" size={16} color={color.primary} />  {!filterPakan?.id ? 'Semua pakan' : filterPakan.nama}</Text>
              </TouchableOpacity>
              {filterPakan?.id &&
                <TouchableOpacity onPress={() => setFilterPakan({})}
                  style={{ marginLeft: spacing[2] }}>
                  <Icofont name="close" size={18} color={'red'} />
                </TouchableOpacity>
              }
            </View>
          </ScrollView>
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
              {pakansMasalah.data.filter(createFilter(searchTerm, ['pakan.nama'])).map(data =>
                <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
                  <DataTable.Cell>{data.id}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 3 }}>{data.pakan.nama}</DataTable.Cell>
                  <DataTable.Cell>{data.pakan.kategori.nama}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1.5 }}>{data.pakan.stok_tetap}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1.5 }}>{data.jumlah}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}>{moment(data.created_at).format('DD-MM-YY')}</DataTable.Cell>
                </DataTable.Row>
              )}

              <DataTable.Pagination
                page={pakansMasalah.current_page - 1}
                numberOfPages={pakansMasalah.last_page}
                onPageChange={(page) => setCurrentPage(page + 1)}
                label={`Halaman ${pakansMasalah.current_page} dari ${pakansMasalah.last_page}`}
              />
            </DataTable>
          </ScrollView>
        </Screen>
        <Modal
          isVisible={showCalendar}
          onBackdropPress={() => setShowCalendar(false)}
          style={{ margin: 0 }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: 'white', paddingVertical: spacing[4] }}>
              <CalendarPicker
                selectedStartDate={filterDate == '' ? new Date() : filterDate}
                selectedDayColor={color.primary}
                selectedDayTextColor={color.palette.white}
                onDateChange={(date) => setFilterDate(moment(date).format('YYYY-MM-DD'))}
              />
            </View>
          </View>
        </Modal>
        <Modalize
          ref={modalizeRef}
          modalTopOffset={50}
          snapPoint={420}
          modalStyle={{
            padding: spacing[3]
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Title>Data Pakan</Title>
            </View>
            <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
              <Icofont name="close" size={20} />
            </TouchableOpacity>
          </View>
          <View style={{
            backgroundColor: color.palette.bgForms,
            marginVertical: spacing[3],
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
              value={searchPakan}
              onChangeText={(v) => setSearchPakan(v)}
            />
          </View>
          {pakanLoading && <ActivityIndicator style={{ alignSelf: 'center' }} />}
          {pakanStore.pakans.filter(createFilter(searchPakan, ['nama'])).map(data =>
            <TouchableOpacity key={data.id} onPress={() => setFilterPakan(JSON.parse(JSON.stringify(data)))}>
              <View
                style={{
                  padding: spacing[2],
                  backgroundColor: color.palette.primary,
                  borderRadius: spacing[2],
                  marginTop: spacing[2],
                }}>
                <Subheading style={{ color: 'white' }}>{data.nama}</Subheading>
              </View>
            </TouchableOpacity>
          )}
        </Modalize>
      </>
    )
  })

const styles = StyleSheet.create({
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.palette.bgForms,
    padding: spacing[3],
    paddingHorizontal: spacing[5],
    borderWidth: 1,
    borderColor: '#E7ECF3',
    borderRadius: spacing[3],
  }
})