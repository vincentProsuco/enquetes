/*
export function someMutation (state) {
}
*/


export function getFonts(state, fonts) {
    console.log(fonts)
   for(var x =0; x < fonts.length; x++){
       state.googlefonts.push({label:fonts[x].family, value:fonts[x].files})
    }
  }

