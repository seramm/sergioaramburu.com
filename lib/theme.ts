import { extendTheme } from '@chakra-ui/react'

const theme = {
  styles: {
    global: {
      'html, body': {
        bg: '#282c34',
        color: '#bbc2cf'
      }
    }
  },
  components: {
    Heading: {
      variants: {
        section: {
          textDecoration: 'underline',
          textDecorationColor: '#8e9aaf',
          textDecorationThickness: 5
        }
      }
    }
  }
}

export default extendTheme(theme)
