import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(
  ({ navigation }) => {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={ROOT} preset="scroll" header={
        <Header
          headerText="Settings"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
      }>
      </Screen>
    )
  }
)
