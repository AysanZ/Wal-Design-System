/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        english: ['roboto', 'sans-serif'],
        farsi: ['Yekan Bakh', 'sans-serif'],
      },
      colors: {
        neutral: {
          0: '#FFFFFF',
          50: '#F5F7FA',
          100: '#F2F5F8',
          200: '#E1E4EA',
          300: '#CACFD8',
          400: '#99A0AE',
          500: '#717784',
          600: '#525866',
          700: '#2B303B',
          800: '#222530',
          900: '#181B25',
          950: '#0E121B',
        },
        blue: {
          50: '#EBF1FF',
          100: '#D5E2FF',
          200: '#C0D5FF',
          300: '#97BAFF',
          400: '#6895FF',
          500: '#335CFF',
          600: '#3559E9',
          700: '#3559E9',
          800: '#1F3BAD',
          900: '#182F8B',
          950: '#122368',
        },
        orange: {
          50: '#FFF3EB',
          100: '#FFE6D5',
          200: '#FFD9C0',
          300: '#FFC197',
          400: '#FFA468',
          500: '#FF9147',
          600: '#E97D35',
          700: '#D06925',
          800: '#AD581F',
          900: '#8B4618',
          950: '#683412',
        },
        red: {
          50: '#FFEBEC',
          100: '#FFD5D8',
          200: '#FFC0C5',
          300: '#FF97A0',
          400: '#FF6875',
          500: '#FB3748',
          600: '#E93544',
          700: '#D02533',
          800: '#AD1F2B',
          900: '#8B1822',
          950: '#681219',
        },
        green: {
          50: '#E0FAEC',
          100: '#D0FBE9',
          200: '#C2F5DA',
          300: '#84EBB4',
          400: '#3EE089',
          500: '#1FC16B',
          600: '#1DAF61',
          700: '#178C4E',
          800: '#1A7544',
          900: '#16643B',
          950: '#0B4627',
        },
        yellow: {
          50: '#FFF4D6',
          100: '#FFEFCC',
          200: '#FFECC0',
          300: '#FFE097',
          400: '#FFD268',
          500: '#F6B51E',
          600: '#E6A819',
          700: '#C99A2C',
          800: '#A78025',
          900: '#86661D',
          950: '#624C18',
        },
        purple: {
          50: '#EFEBFF',
          100: '#DCD5FF',
          200: '#CAC0FF',
          300: '#A897FF',
          400: '#8C71F6',
          500: '#7D52F4',
          600: '#693EE0',
          700: '#5B2CC9',
          800: '#4C25A7',
          900: '#3D1D86',
          950: '#351A75',
        },
        sky: {
          50: '#EBF8FF',
          100: '#D5F1FF',
          200: '#C0EAFF',
          300: '#97DCFF',
          400: '#68CDFF',
          500: '#47C2FF',
          600: '#35ADE9',
          700: '#35ADE9',
          800: '#1F7EAD',
          900: '#18658B',
          950: '#124B68',
        },
        pink: {
          50: '#FFEBF4',
          100: '#FFD5EA',
          200: '#FFC0DF',
          300: '#FF97CB',
          400: '#FF68B3',
          500: '#FB4BA3',
          600: '#E9358F',
          700: '#D0257A',
          800: '#AD1F66',
          900: '#8B1852',
          950: '#68123D',
        },
        teal: {
          50: '#E4FBF8',
          100: '#D0FBF5',
          200: '#C2F5EE',
          300: '#84EBDD',
          400: '#3FDEC9',
          500: '#22D3BB',
          600: '#1DAF9C',
          700: '#178C7D',
          800: '#1A7569',
          900: '#16645A',
          950: '#0B463E',
        },
        // Alpha Colors
        'neutral-alpha': {
          10: '#99A0AE1A',
          16: '#99A0AE29',
          24: '#99A0AE3D',
        },
        'blue-alpha': {
          10: '#476CFF1A',
          16: '#476CFF29',
          24: '#476CFF3D',
        },
        'orange-alpha': {
          10: '#FF91471A',
          16: '#FF914729',
          24: '#FF91473D',
        },
        'red-alpha': {
          10: '#FB37481A',
          16: '#FB374829',
          24: '#FB37483D',
        },
        'green-alpha': {
          10: '#1FC16B1A',
          16: '#1FC16B29',
          24: '#1FC16B3D',
        },
        'yellow-alpha': {
          10: '#FBC64B1A',
          16: '#FBC64B29',
          24: '#FBC64B3D',
        },
        'sky-alpha': {
          10: '#47C2FF1A',
          16: '#47C2FF29',
          24: '#47C2FF3D',
        },
        'purple-alpha': {
          10: '#784DEF1A',
          16: '#784DEF29',
          24: '#784DEF3D',
        },
        'pink-alpha': {
          10: '#FB4BA31A',
          16: '#FB4BA329',
          24: '#FB4BA33D',
        },
        'teal-alpha': {
          10: '#22D3BB1A',
          16: '#22D3BB29',
          24: '#22D3BB3D',
        },
        'white-alpha': {
          10: '#FFFFFF1A',
          16: '#FFFFFF29',
          24: '#FFFFFF3D',
        },
        'black-alpha': {
          10: '#0E121B1A',
          16: '#0E121B29',
          24: '#0E121B3D',
        },
        // Color Tokens
        'primary-alpha': {
          10: '#476CFF1A',
          16: '#476CFF29',
        },
        primary: {
          base: '#335CFF',
          darker: '#335CFF',
          dark: '#1F3BAD',
        },
        'static-white': {
          DEFAULT: '#FFFFFF',
          dark: '#FFFFFF',
        },
        'static-black': {
          DEFAULT: '#0E121B',
          dark: '#0E121B',
        },
        'strong-950': {
          DEFAULT: '#0E121B',
          dark: '#FFFFFF',
        },
        'surface-800': {
          DEFAULT: '#222530',
          dark: '#E1E4EA',
        },
        'sub-300': {
          DEFAULT: '#CACFD8',
          dark: '#525866',
        },
        'soft-200': {
          DEFAULT: '#E1E4EA',
          dark: '#2B303B',
        },
        'weak-50': {
          DEFAULT: '#F5F7FA',
          dark: '#181B25',
        },
        'white-0': {
          DEFAULT: '#FFFFFF',
          dark: '#0E121B',
        },
        'sub-600': {
          DEFAULT: '#525866',
          dark: '#99A0AE',
        },
        'soft-400': {
          DEFAULT: '#99A0AE',
          dark: '#717784',
        },
        'disabled-300': {
          DEFAULT: '#F5F7FA',
          dark: '#525866',
        },
        faded: {
          dark: {
            DEFAULT: '#222530',
            dark: '#CACFD8',
          },
          base: {
            DEFAULT: '#717784',
            dark: '#717784',
          },
          light: {
            DEFAULT: '#E1E4EA',
            dark: '#99A0AE3D',
          },
          lighter: {
            DEFAULT: '#F2F5F8',
            dark: '#99A0AE29',
          },
        },
        information: {
          dark: {
            DEFAULT: '#122368',
            dark: '#6895FF',
          },
          base: {
            DEFAULT: '#335CFF',
            dark: '#335CFF',
          },
          light: {
            DEFAULT: '#C0D5FF',
            dark: '#476CFF3D',
          },
          lighter: {
            DEFAULT: '#EBF1FF',
            dark: '#476CFF29',
          },
        },
        warning: {
          dark: {
            DEFAULT: '#682F12',
            dark: '#FF9A68',
          },
          base: {
            DEFAULT: '#FF8447',
            dark: '#E97135',
          },
          light: {
            DEFAULT: '#FFD5C0',
            dark: '#FF91473D',
          },
          lighter: {
            DEFAULT: '#FFF1EB',
            dark: '#FF914729',
          },
        },
        error: {
          dark: {
            DEFAULT: '#681219',
            dark: '#FF6875',
          },
          base: {
            DEFAULT: '#FB3748',
            dark: '#E93544',
          },
          light: {
            DEFAULT: '#FFC0C5',
            dark: '#FB37483D',
          },
          lighter: {
            DEFAULT: '#FFEBEC',
            dark: '#FB374829',
          },
        },
        success: {
          dark: {
            DEFAULT: '#0B4627',
            dark: '#3EE089',
          },
          base: {
            DEFAULT: '#1FC16B',
            dark: '#1DAF61',
          },
          light: {
            DEFAULT: '#C2F5DA',
            dark: '#1FC16B3D',
          },
          lighter: {
            DEFAULT: '#E0FAEC',
            dark: '#1FC16B29',
          },
        },
        away: {
          dark: {
            DEFAULT: '#624C18',
            dark: '#FFD268',
          },
          base: {
            DEFAULT: '#F6B51E',
            dark: '#E6A819',
          },
          light: {
            DEFAULT: '#FFECC0',
            dark: '#FBC64B3D',
          },
          lighter: {
            DEFAULT: '#FFFAEB',
            dark: '#FBC64B29',
          },
        },
        feature: {
          dark: {
            DEFAULT: '#351A75',
            dark: '#8C71F6',
          },
          base: {
            DEFAULT: '#7D52F4',
            dark: '#7D52F4',
          },
          light: {
            DEFAULT: '#CAC0FF',
            dark: '#784DEF3D',
          },
          lighter: {
            DEFAULT: '#EFEBFF',
            dark: '#784DEF29',
          },
        },
        verified: {
          dark: {
            DEFAULT: '#124B68',
            dark: '#68CDFF',
          },
          base: {
            DEFAULT: '#47C2FF',
            dark: '#35ADE9',
          },
          light: {
            DEFAULT: '#C0EAFF',
            dark: '#47C2FF3D',
          },
          lighter: {
            DEFAULT: '#EBF8FF',
            dark: '#47C2FF29',
          },
        },
        highlighted: {
          dark: {
            DEFAULT: '#68123D',
            dark: '#FF68B3',
          },
          base: {
            DEFAULT: '#FB4BA3',
            dark: '#E9358F',
          },
          light: {
            DEFAULT: '#FFC0DF',
            dark: '#FB4BA33D',
          },
          lighter: {
            DEFAULT: '#FFEBF4',
            dark: '#FB4BA329',
          },
        },
        stable: {
          dark: {
            DEFAULT: '#0B463E',
            dark: '#C2F5EE',
          },
          base: {
            DEFAULT: '#22D3BB',
            dark: '#1DAF9C',
          },
          light: {
            DEFAULT: '#C2F5EE',
            dark: '#22D3BB3D',
          },
          lighter: {
            DEFAULT: '#E4FBF8',
            dark: '#22D3BB29',
          },
        },
      },
    },
  },
  plugins: [],
};
