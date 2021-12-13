import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TouchableOpacity, View, ViewStyle } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { Button, Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ActivityIndicator, Checkbox, Divider, Headline, Paragraph, Subheading, TextInput, Title } from "react-native-paper"
import { Modalize } from 'react-native-modalize';
import Modal from "react-native-modal";
import moment from "moment";
import CalendarPicker from 'react-native-calendar-picker';
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStores } from "../../models"
import { ActivityItem } from "./activity-list"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingHorizontal: spacing[5]
}

export const ActivityScreen: FC<StackScreenProps<NavigatorParamList, "activity">> = observer(({ navigation }) => {
  const { satwaStore, formActivitiesStore } = useStores();
  const { satwa, getAllSatwa } = satwaStore;
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [satwaLoading, setSatwaLoading] = useState(false);
  const [newactLoading, setNewactLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(formActivitiesStore.formactivity?.tanggal || moment(new Date()).format('YYYY-MM-DD'));
  const [satwa_, setSatwa_] = useState(formActivitiesStore.formactivity?.satwa || null);
  const isFocused = useIsFocused();
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    setShowCalendar(false);
  }, [date]);

  useEffect(() => {
    modalizeRef.current?.close();
  }, [satwa_]);

  useEffect(() => {
    formActivitiesStore.resetFormActivity();
    setFetched(false);
  }, [date, satwa_, isFocused]);

  const openModal = async () => {
    modalizeRef.current?.open();
    if (!satwa.length) {
      setSatwaLoading(true);
      await getAllSatwa();
      setSatwaLoading(false);
    }
  }

  const fetchActivities = async () => {
    setLoading(true);
    await formActivitiesStore.getFormActivity(null, date, satwa_?.id || null);
    setLoading(false);
    setFetched(true);
  }

  const createActivity = async () => {
    setNewactLoading(true);
    await formActivitiesStore.createFormActivity(date, satwa_?.id || null);
    setNewactLoading(false);
    fetchActivities();
  }

  return (
    <>
      <Screen style={ROOT} preset="scroll" header={
        <Header
          headerText="Form Aktivitas"
        />
      }>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Subheading style={{ marginVertical: 0 }}>Periode:</Subheading>
            <Subheading style={{ marginVertical: 0 }}>{moment(new Date()).format('MMMM YYYY')}</Subheading>
          </View>
          <Subheading>{`Status: ${formActivitiesStore.formactivity?.status || '-'}`}</Subheading>
        </View>
        <Divider style={{ borderColor: color.primary, borderWidth: 0.5, marginVertical: spacing[4] }} />
        <Subheading style={{ marginVertical: 0 }}>Tanggal:</Subheading>
        <TouchableOpacity onPress={() => setShowCalendar(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: spacing[2],
            padding: spacing[2],
            paddingHorizontal: spacing[4],
            backgroundColor: color.palette.bgForms,
            borderColor: '#A7B0C0',
            borderRadius: spacing[3],
            borderWidth: 0.5
          }}>
          <Subheading style={{ fontWeight: 'bold' }}>{moment(date).format('DD MMM YYYY')}</Subheading>
          <Icofont name="calendar" size={24} color={color.primary} />
        </TouchableOpacity>
        <Subheading style={{ marginVertical: 0 }}>Satwa:</Subheading>
        <TouchableOpacity onPress={() => openModal()}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: spacing[2],
            backgroundColor: color.palette.bgForms,
            borderRadius: spacing[3],
            padding: spacing[2],
            paddingHorizontal: spacing[4],
            borderWidth: 0.5,
            borderColor: "#A7B0C0",
          }}>
            <Subheading style={{ flex: 1 }}>{satwa_?.nama || 'Pilih Satwa'}</Subheading>
            <Icofont name="chevron-down" color={color.primary} size={24} />
          </View>
        </TouchableOpacity>
        {!formActivitiesStore.formactivity.list_aktivitas.length && fetched ?
          <View style={{ alignItems: 'center', marginTop: spacing[4] }}>
            <Text style={{ color: 'grey' }}>No Data!</Text>
            {date && satwa_ &&
              <Button
                preset="small"
                style={{ marginTop: spacing[3] }}
                loading={newactLoading}
                onPress={() => createActivity()}>
                <Paragraph style={{ color: color.palette.white }}><Icofont name="plus" size={16} /> Tambah Aktivitas</Paragraph>
              </Button>
            }
          </View>
          :
          !formActivitiesStore.formactivity.list_aktivitas.length &&
          <Button
            preset="small"
            style={{ marginTop: spacing[3] }}
            onPress={() => fetchActivities()}>
            <Paragraph style={{ color: color.palette.white }}><Icofont name="magnify" size={16} /> Tampilkan</Paragraph>
          </Button>
        }
        {loading ?
          <ActivityIndicator style={{ margin: spacing[4] }} />
          :
          formActivitiesStore.formactivity.list_aktivitas?.map(activity =>
            <ActivityItem key={Math.random()} data={activity} />
          )
        }
      </Screen>
      <Modal
        isVisible={showCalendar}
        onBackdropPress={() => setShowCalendar(false)}
        style={{ margin: 0 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', paddingVertical: spacing[4] }}>
            <CalendarPicker
              selectedStartDate={date}
              selectedDayColor={color.primary}
              selectedDayTextColor={color.palette.white}
              onDateChange={(date) => setDate(moment(date).format('YYYY-MM-DD'))}
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
          <TouchableOpacity key={data.id} onPress={() => setSatwa_(JSON.parse(JSON.stringify(data)))}>
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
