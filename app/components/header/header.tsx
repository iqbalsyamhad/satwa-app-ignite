import React from "react"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Icon } from "../icon/icon"
import { translate } from "../../i18n/"
import { Appbar } from "react-native-paper"
import { color } from "../../theme"

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    leftIcon,
    headerText,
    headerTx,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <Appbar.Header theme={{ colors: { primary: color.palette.white } }}>
      {leftIcon == "back" ?
        <Appbar.BackAction onPress={onLeftPress} />
        :
        <Button preset="link" onPress={onLeftPress}>
          <Icon icon={leftIcon} />
        </Button>
      }
      <Appbar.Content title={header} />
    </Appbar.Header>
  )
}