<template>
<q-toolbar class="bg-primary"></q-toolbar>
 <div class="row q-gutter-md q-pa-md flex flex-center">
     <div class="col-2" v-for="font in rows" :key="font.family">
         <q-card class="flex flex-center column" style="min-height:5rem;">
             <span class="text-bold">{{font.family}}</span>
         <span class="text-italic">{{font.category}}</span>
         <!-- {{font.files.regular}} -->
         </q-card>
         
     </div>
 </div>
</template>

<script>
import { api } from 'boot/axios'
export default {
   async created(){
    const fonts = await api.get();
    this.rows = fonts.data.items
    
  }, 
  data() {
    return {
        currentPage:1,
        rows:[]
    };
  },
};
</script>

<style scoped>

</style>
