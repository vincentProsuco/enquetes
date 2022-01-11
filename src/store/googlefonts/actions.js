import { api } from 'boot/axios'
export function googleFonts (context) {
    api.get().then(
        (resp)=>{
            console.log(resp.data.items)
        }
    )
}

