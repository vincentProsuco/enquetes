<template> 
<div>
    <div class="row q-pa-lg">
      
        <div class="col flex justify-center">
            <span class="vraag" v-html="vraag.waarde.vraag" />
        </div>
    </div>
    <div class="row">
        <div class="col"></div>
        <div class="col">
            <q-list bordered class="shadow-1" v-if="vraag.waarde.type.value==='radio'">
                <q-item tag="label" v-for="o in vraag.waarde.opties" :key="o" v-ripple>
        <q-item-section side top>
          <q-radio v-model="dummyCheck" :val="o"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{o}}</q-item-label>
        </q-item-section>
      </q-item>
            </q-list>


    <q-select v-else
    :options="vraag.waarde.opties"
    outlined
    label="uw keuze"
    v-model="dummyCheck"
    class="shadow-1"
    />    
        </div>
        <div class="col"></div>
    </div>
</div>
</template>


<script>
import { ref } from 'vue'
export default {
    props:['vraag'],
    data(){
        return{
            dummyCheck:ref('')
        }
    }
}
</script>
<style scoped>
.vraag{
    font-size: 1.5rem;
}
</style>