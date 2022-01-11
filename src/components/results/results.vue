<template>
<q-toolbar class="bg-grey-3 flex justify-between">
    <div>
    <q-chip text-color="white" color="green" label="Aktief" icon="play_arrow" />
    <q-chip text-color="white" color="primary" label="Klant naam" icon="store"/>
    <q-chip text-color="white" color="primary" label="Naam enquête" icon="label"/>
    </div>
    <div class="flex flex-end">
        <q-btn icon="download" unelevated color="white" label="download resultaten" text-color="black" size="sm"/>
    </div>
</q-toolbar>
    <div class="row q-pa-md q-gutter-lg flex flex-center">
        <div class="col-3" v-for="antwoord in vragen" :key="antwoord">
            <q-card class="bg-grey-2">
                <q-card-section class="text-grey-8 text-bold flex flex-center">
                    {{antwoord.nr}}. {{antwoord.vraag}}
                </q-card-section>
                <q-card-section>
               <circel-diagram :ans="antwoord.antwoorden" v-if="antwoord.type=='circle'"/>
               <staaf-diagram :ans="antwoord.antwoorden" v-if="antwoord.type=='bar'"/>
               <scatter-diagram :ans="antwoord.antwoorden" v-if="antwoord.type=='scatter'"/>
                </q-card-section>
                <q-card-actions class="flex justify-end">
                    <q-btn label="Bekijk alle antwoorden" flat size="sm"/>
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>

<script>
import circelDiagram from './charts/circelDiagram.vue'
import ScatterDiagram from './charts/scatterDiagram.vue'
import StaafDiagram from './charts/staafDiagram.vue'


export default {
  components: { circelDiagram, StaafDiagram, ScatterDiagram },
  setup(){
      return{
          vragen:[
              {vraag:'Lorem ipsum dolor sit amet?', nr:1, antwoorden:[6, 7, 4, 8], type:'circle'},
              {vraag:'sit amet Foo Baar Bazz?', nr:2, antwoorden:[10, 11, 12, 8], type:'bar'},
              {vraag:'Lorem ipsum dolor sit amet?', nr:3, antwoorden:[{x:4, y:8}, 7, 12, 18], type:'scatter'},
              {vraag:'Lorem ipsum dolor sit amet?', nr:4, antwoorden:[10, 7, 12, 8], type:'bar'},
              {vraag:'Lorem dolor sit amet?', nr:5, antwoorden:[10, 7, 12, 8], type:'circle'},
              {vraag:'Lorem ipsum dolor sit amet?', nr:6, antwoorden:[10, 7, 12, 8], type:'bar'},
              {vraag:'Lorem ipsum dolor amet?', nr:7, antwoorden:[10, 7, 12, 8], type:'circle'},
          ]
      }
  },
  computed:{
        id(){
            return this.$route.params.id
        }
    },
    
}
</script>