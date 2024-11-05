/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins']
      },
      colors: {
        'box-gray-1': '#111111',
        'box-gray-2': '#222222'
      },
      height: {
        '95%': '95%',
        '76%': '76%',
        '18': '4.5rem',
        '22': '5.5rem'
      },
      width: {
        '90%': '90%',
        '95%': '95%',
      },
      backgroundImage: {
        'Chuttamalle': "url('./Assests/Songs/Thumbnails/Chuttamalle.jpg')",
        'Diamond-Ni': "url('./Assests/Songs/Thumbnails/Diamond-Ni.jpg')",
        'Lover': "url('./Assests/Songs/Thumbnails/Lover.jpg')",
        'Kabir-Singh': "url('./Assests/Songs/Thumbnails/Kabir-Singh.jpg')",
        'One-Love': "url('./Assests/Songs/Thumbnails/One-Love.jpg')",
        'Softly': "url('./Assests/Songs/Thumbnails/Softly.jpg')",
        'Seethakalam': "url('./Assests/Songs/Thumbnails/Seethakalam.jpg')",
        'Sarphira': "url('./Assests/Songs/Thumbnails/Sarphira.jpg')",
        'Akhiyan-Gulab': "url('./Assests/Songs/Thumbnails/Akhiyan Gulab.jfif')",
        'Ayudha-Pooja': "url('./Assests/Songs/Thumbnails/Ayudha Pooja.jpg')",
        'King-Shit': "url('./Assests/Songs/Thumbnails/King Shit.jpg')",
        'Pehle-bhi-main': "url('./Assests/Songs/Thumbnails/Pehle bhi main.jpg')",
        'Shiva-Thandavame': "url('./Assests/Songs/Thumbnails/Shiva Thandavame.jpg')",
      }
    },
  },
  plugins: [],
}

