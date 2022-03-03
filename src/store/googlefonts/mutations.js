/*
export function someMutation (state) {
}
*/


export function getFonts(state, fonts) {
    console.log(fonts)
   for(var x =0; x < fonts.length; x++){
       console.log(fonts[x].family)
       state.googlefonts.push({label:fonts[x].family, value:fonts[x].file})
    }
  }

