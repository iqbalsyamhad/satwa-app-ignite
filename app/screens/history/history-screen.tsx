import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ActivityIndicator, Caption, DataTable, Paragraph, Subheading, TextInput, Title } from "react-native-paper"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStores } from "../../models"
import { Modalize } from 'react-native-modalize';
import Modal from "react-native-modal";
import moment from "moment"
import CalendarPicker from 'react-native-calendar-picker';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const HistoryScreen: FC<StackScreenProps<NavigatorParamList, "history">> = observer(
  (props) => {
    const [loading, setLoading] = useState(false);
    const { formActivitiesStore, satwaStore } = useStores();
    const {
      formactivities,
      getAllFormActivities,
      resetFormActivity,
      setCurrentPage,
      filterDate,
      filterSatwa,
      setFilterDate,
      setFilterSatwa,
    } = formActivitiesStore;
    const { satwa, getAllSatwa } = satwaStore;
    const [satwaLoading, setSatwaLoading] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
      getFormActivities();
    }, [formactivities.current_page]);

    useEffect(() => {
      setShowCalendar(false);
      refreshData();
    }, [filterDate]);

    useEffect(() => {
      modalizeRef.current?.close();
      refreshData();
    }, [filterSatwa?.id]);

    const refreshData = () => {
      formactivities.current_page == 1 ? getFormActivities() : setCurrentPage(1);
    }

    const getFormActivities = async () => {
      setLoading(true);
      await getAllFormActivities();
      setLoading(false);
    };

    const itemPress = (id) => {
      resetFormActivity();
      props.navigation.navigate("historyDetail", { id: id });
    }

    // other func
    const openModal = async () => {
      modalizeRef.current?.open();
      if (!satwa.length) {
        setSatwaLoading(true);
        await getAllSatwa();
        setSatwaLoading(false);
      }
    }

    return (
      <>
        <Screen style={ROOT} header={
          <Header
            headerText="Histori"
          />
        }>
          <Caption style={{ marginLeft: spacing[5] }}>Filter</Caption>
          <ScrollView horizontal style={{ maxHeight: 50 }}>
            <View style={[styles.filterBtn, { marginLeft: spacing[5] }]}>
              <TouchableOpacity onPress={() => setShowCalendar(true)}>
                <Text style={{ fontSize: 16, margin: 0 }}><Icofont name="calendar" size={16} color={color.primary} />  {filterDate == '' ? 'Semua tanggal' : moment(filterDate).format('DD MMM YYYY')}</Text>
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
                <Text style={{ fontSize: 16, margin: 0 }}><Icofont name="donkey" size={16} color={color.primary} />  {!filterSatwa?.id ? 'Semua satwa' : filterSatwa.nama}</Text>
              </TouchableOpacity>
              {filterSatwa?.id &&
                <TouchableOpacity onPress={() => setFilterSatwa({})}
                  style={{ marginLeft: spacing[2] }}>
                  <Icofont name="close" size={18} color={'red'} />
                </TouchableOpacity>
              }
            </View>
          </ScrollView>
          <ScrollView
            style={{
              paddingHorizontal: spacing[5]
            }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => refreshData()}
              />
            }>
            <DataTable>
              <DataTable.Header style={{
                marginTop: spacing[3],
                borderBottomColor: color.primary
              }}>
                <DataTable.Title>No.</DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>Tanggal</DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>Satwa</DataTable.Title>
                <DataTable.Title style={{ flex: 2 }}>Status</DataTable.Title>
                <DataTable.Title>x</DataTable.Title>
              </DataTable.Header>
              {formactivities?.data.map(data =>
                <DataTable.Row key={Math.random()} style={{ borderBottomColor: color.primary }}>
                  <DataTable.Cell>{data.id}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}>{data.tanggal}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}>{data.satwa.nama}</DataTable.Cell>
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
                      backgroundColor: data.status == 'Diterima' ? 'green' : 'orange'
                    }}>
                      <Paragraph style={{ color: color.palette.white }}>{data.status}</Paragraph>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <TouchableOpacity onPress={() => itemPress(data.id)}>
                      <Icofont name="eye" size={18} />
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              )}

              <DataTable.Pagination
                page={formactivities.current_page - 1}
                numberOfPages={formactivities.last_page}
                onPageChange={(page) => setCurrentPage(page + 1)}
                label={`Halaman ${formactivities.current_page} dari ${formactivities.last_page}`}
              />
            </DataTable>
            <View style={{ height: spacing[5] }} />
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
              <Title>Data Satwa</Title>
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
            />
          </View>
          {satwaLoading && <ActivityIndicator style={{ alignSelf: 'center' }} />}
          {satwa.map(data =>
            <TouchableOpacity key={data.id} onPress={() => setFilterSatwa(JSON.parse(JSON.stringify(data)))}>
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