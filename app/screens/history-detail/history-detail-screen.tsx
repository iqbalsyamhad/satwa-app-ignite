import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { ActivityIndicator, Checkbox, Divider, Paragraph, Subheading } from "react-native-paper"
import moment from "moment"
import Icofont from 'react-native-vector-icons/MaterialCommunityIcons';
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingHorizontal: spacing[5]
}

export const HistoryDetailScreen: FC<StackScreenProps<NavigatorParamList, "historyDetail">> = observer(
  (props) => {
    const { formActivitiesStore } = useStores();
    const [loading, setLoading] = useState(false);
    const id = props.route.params.id;

    useEffect(() => {
      fetchActivities();
    }, []);

    const fetchActivities = async () => {
      setLoading(true);
      await formActivitiesStore.getFormActivity(id);
      setLoading(false);
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
            status={props.activityResult == '1' ? 'checked' : 'unchecked'}
          />
          <Subheading style={{ marginLeft: spacing[2], color: color.palette.black }}>{props.jenis_aktivitas.name}</Subheading>
        </View>
      )
    }

    return (
      <Screen style={ROOT} preset="scroll" header={
        <Header
          leftIcon="back"
          onLeftPress={() => props.navigation.goBack()}
          headerText="Detail Histori"
        />
      }>
        <ScrollView>
          {loading && <ActivityIndicator />}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Subheading style={{ marginVertical: 0 }}>Periode:</Subheading>
              <Subheading style={{ marginVertical: 0 }}>{moment(formActivitiesStore.formactivity.tanggal).format('MMMM YYYY')}</Subheading>
            </View>
            <View>
              <Subheading style={{ marginVertical: 0 }}>Tanggal:</Subheading>
              <Subheading style={{ marginVertical: 0 }}>{moment(formActivitiesStore.formactivity.tanggal).format('DD/MM/YYYY')}</Subheading>
            </View>
          </View>
          <Divider style={{ borderColor: color.primary, borderWidth: 0.5, marginVertical: spacing[3] }} />
          {formActivitiesStore.formactivity.list_aktivitas.map(activity =>
            <ActivityItem key={Math.random()} {...activity} />
          )}
          <Divider style={{ borderColor: color.primary, borderWidth: 0.5, marginVertical: spacing[3] }} />
          <Subheading>{`Status: ${formActivitiesStore.formactivity.status}`}</Subheading>
          <Divider style={{ borderColor: color.primary, borderWidth: 0.5, marginVertical: spacing[3] }} />
          <Subheading>{`Pelaksana: ${formActivitiesStore.formactivity.pelaksana.name}`}</Subheading>
          <Subheading>{`Koordinator: ${formActivitiesStore.formactivity.koordinator.name}`}</Subheading>
          <Subheading>{`Kadiv: ${formActivitiesStore.formactivity.kadiv.name}`}</Subheading>
        </ScrollView>
      </Screen>
    )
  })
