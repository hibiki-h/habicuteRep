"use client"

import { ChakraProvider } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

import { customconfig } from "@/theme/theme"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={customconfig}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
