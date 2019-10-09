const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
}

const style = {
  h1: {
    
    fontSize: size.h1
  },
  h2: {
    fontFamily:'SourceSansPro-Bold',
    fontSize: size.h2
  },
  h3: {
    
    fontSize: size.h3
  },
  h4: {
    
    fontSize: size.h4
  },
  h5: {
    
    fontSize: size.h5
  },
  h6: {
    
    fontSize: size.h6
  },
  normal: {
    
    fontSize: size.regular
  },
  description: {
    
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
