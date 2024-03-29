import * as React from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, View } from "react-native"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { color, spacing } from "../../theme"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const header = props.header ?
    <View style={{ marginBottom: spacing[5] }}>
      {props.header}
    </View>
    :
    <></>

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar backgroundColor={color.palette.white} barStyle={props.statusBar || "dark-content"} />
      {header}
      <SafeAreaView style={[preset.inner, style]}>{props.children}</SafeAreaView>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const header = props.header ?
    <View style={{ marginBottom: spacing[5] }}>
      {props.header}
    </View>
    :
    <></>

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar backgroundColor={color.palette.white} barStyle={props.statusBar || "dark-content"} />
      {header}
      <SafeAreaView style={[preset.inner, style]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
        >
          {props.children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
