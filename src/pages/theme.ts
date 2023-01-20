// theme.ts (Version 2 needs to be a tsx file, due to usage of StyleFunctions)
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const theme = extendTheme({
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				fontFamily: 'body',
				color: mode('gray.800', 'whiteAlpha.900')(props),
				bg: mode('gray.100', 'blue.800')(props),
				lineHeight: 'base',
			},
		}),
	},
})


export default theme
