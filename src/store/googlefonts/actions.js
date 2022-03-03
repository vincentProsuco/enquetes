import axios from "axios";

export function getFonts(context) {
    axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBASHqu0mr38ma56itFmG_h5rzGISwXY0c").then(response => {    
        context.commit('getFonts', response.data.items)
    }) 
    
 
}