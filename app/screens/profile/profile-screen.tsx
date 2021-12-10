import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { Caption, Divider, List, Title } from "react-native-paper"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const ProfileScreen: FC<StackScreenProps<NavigatorParamList, "profile">> = observer(
  (props) => {
    const { authenticationStore } = useStores();
    const logout = () => {
      Alert.alert(
        "Apakah anda yakin?",
        "Anda akan keluar dari akun anda saat ini?",
        [
          // The "Yes" button
          {
            text: "Yakin",
            onPress: () => {
              authenticationStore.logout();
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "Batal",
          },
        ]
      );
    }
    return (
      <Screen style={ROOT} preset="scroll" header={
        <Header
          headerText="Profil Saya"
        />
      }>
        <View style={{ paddingHorizontal: spacing[5] }}>
          <Image source={require('../../../assets/images/profile.png')}
            style={{ width: 60 }}
            resizeMode={'contain'} />
          <Title style={{ marginTop: spacing[3] }}>{authenticationStore.user?.nama}</Title>
          <Caption>Perawat Satwa</Caption>
          <View style={{ height: spacing[6] }} />
          <List.Item
            style={{ paddingLeft: 0 }}
            title="Update Profil"
            titleStyle={{ marginLeft: -8 }}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            style={{ paddingLeft: 0 }}
            title="Ganti Password"
            titleStyle={{ marginLeft: -8 }}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            onPress={() => logout()}
            style={{ paddingLeft: 0 }}
            title="Log out"
            titleStyle={{ marginLeft: -8 }}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
        </View>
      </Screen>
    )
  })
