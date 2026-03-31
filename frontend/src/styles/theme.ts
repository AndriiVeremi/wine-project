export const theme = {
  colors: {
    wine: {
      primary: '#841013',
      secondary: '#D52025',
      gradient: 'linear-gradient(90deg, #841013 0%, #D52025 100%)',
    },
    gray: {
      primary: '#3F3F3F',
      secondary: '#6B6B6B',
      tertiary: '#E4E2E2',
      shadow: '#B7B7B7',
      font: '#454443',
      input: '#A4A4A4',
      icon: '#A5A5A5',
    },
    accent: {
      star: '#E3900A',
      orange: '#E28E33',
      secondaryOrange: '#D67C22',
      brownIcon: '#895129',
      blackIcon: '#323232',
    },
    filter: {
      border: '#A38861',
      activeBg: 'linear-gradient(180deg, #FFFFFF 0%, #FCDFB6 100%)',
    },
    common: {
      white: '#FFFFFF',
      black: '#000000',
      error: '#FF0000',
      overlay: 'rgba(0, 0, 0, 0.5)',
      bgMain: '#FFFFFF',
      footerCream: '#FFEACB',
    },
  },
  typography: {
    fonts: {
      main: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      accent:
        "'Montserrat Alternates', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    sizes: {
      base: '16px',
      mainText: '17px',
    },
  },
  layout: {
    containerWidth: '1200px',
    headerHeight: '80px',
    footerHeight: '200px',
  },
  spacing: {
    xs: '16px',
    sm: '19px',
    md: '26px',
    lg: '30px',
    xl: '49px',
  },
  effects: {
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    transitionFast: 'all 150ms ease-in-out',
    transitionSmooth: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: {
      main: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      modal: '0px 10px 25px rgba(0, 0, 0, 0.2)',
    },
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '20px',
      in: '32px',
    },
  },
};

export type Theme = typeof theme;
