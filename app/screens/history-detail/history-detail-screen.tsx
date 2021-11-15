import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Checkbox, Divider, Paragraph, Subheading } from "react-native-paper"
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
      marginTop: spacing[2],
    }}>
      <Checkbox
        color={color.palette.black}
        status={props.isActive ? 'checked' : 'unchecked'}
      />
      <Subheading style={{ marginLeft: spacing[2], color: color.palette.black }}>Piket Bengkok</Subheading>
    </View>
  )
}

export const HistoryDetailScreen: FC<StackScreenProps<NavigatorParamList, "historyDetail">> = observer(
  (props) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={ROOT} preset="scroll" header={
        <Header
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
          headerText="Detail Histori"
        />
      }>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Subheading style={{ marginVertical: 0 }}>Periode:</Subheading>
            <Subheading style={{ marginVertical: 0 }}>{moment(new Date()).format('MMMM YYYY')}</Subheading>
          </View>
          <View>
            <Subheading style={{ marginVertical: 0 }}>Tanggal:</Subheading>
            <Subheading style={{ marginVertical: 0 }}>{moment(new Date()).format('DD/MM/YYYY')}</Subheading>
          </View>
        </View>
        <Divider style={{ borderColor: color.primary, borderWidth: 0.5, marginVertical: spacing[3] }} />
        <ActivityItem isActive={true} />
        <ActivityItem isActive={false} />
        <Divider style={{ borderColor: color.primary, borderWidth: 0.5, marginVertical: spacing[3] }} />
        <Subheading>Status: Diterima</Subheading>
        <Divider style={{ borderColor: color.primary, borderWidth: 0.5, marginVertical: spacing[3] }} />
        <Subheading>Pelaksana: </Subheading>
        <Subheading>Koordinator: </Subheading>
        <Subheading>Kadiv: </Subheading>
      </Screen>
    )
  })
