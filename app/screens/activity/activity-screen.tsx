import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Checkbox, Divider, Headline, Paragraph, Subheading, Title } from "react-native-paper"
import moment from "moment"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingHorizontal: spacing[5]
}

const ActivityItem = (props) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: props.isActive ? color.palette.primary : color.palette.bgForms,
      marginTop: spacing[3],
      borderRadius: spacing[3],
      padding: spacing[1],
      paddingHorizontal: spacing[4],
      borderWidth: 0.5,
      borderColor: "#A7B0C0",
    }}>
      <Checkbox
        color={color.palette.white}
        status={props.isActive ? 'checked' : 'unchecked'}
      />
      <Subheading style={{ marginLeft: spacing[2], color: props.isActive ? color.palette.white : color.palette.primary }}>Piket Bengkok</Subheading>
    </View>
  )
}

export const ActivityScreen: FC<StackScreenProps<NavigatorParamList, "activity">> = observer(
  (props) => {
    return (
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
          <Button
            preset="small">
            <Paragraph style={{ color: color.palette.white }}><Icofont name="plus-circle-outline" size={16} /> Simpan</Paragraph>
          </Button>
        </View>
        <Divider style={{ borderColor: color.primary, borderWidth: 0.5, marginVertical: spacing[2] }} />
        <Subheading style={{ marginVertical: 0 }}>Tanggal:</Subheading>
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: spacing[2],
          padding: spacing[2],
          paddingHorizontal: spacing[4],
          backgroundColor: color.palette.bgForms,
          borderColor: '#A7B0C0',
          borderRadius: spacing[3],
          borderWidth: 1
        }}>
          <Subheading style={{ fontWeight: 'bold' }}>04/10/2021</Subheading>
          <Icofont name="calendar" size={24} color={color.primary} />
        </TouchableOpacity>
        <ActivityItem isActive={true} />
        <ActivityItem isActive={false} />
      </Screen>
    )
  })
