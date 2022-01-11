<template>
<div class="previewContainer">
   <q-tab-panels v-model="slides" animated class="shadow-2 rounded-borders no-shadow" style="height:80vh;">
       
        <q-tab-panel :name=index v-for="(vraag, index) in vragen" :key="index">
        
        <open-preview :vraag="vraag" v-if="vraag.type === 'Open vraag'"/>
        <meer-keuze-preview :vraag="vraag" v-if="vraag.type === 'Meerkeuze'"/>
        <selecteren-preview :vraag="vraag" v-if="vraag.type === 'Selecteren'"/>
        <rating-preview :vraag="vraag" v-if="vraag.type === 'Rating'"/>
        <tussen-pagina-preview :vraag="vraag" v-if="vraag.type === 'Tussen pagina'"/>
        </q-tab-panel>
    </q-tab-panels> 
    <div class="controls">
    <q-btn icon="navigate_before" @click="slides--" :style="slides===0 ? display:'hidden'" v-if="slides > 0" id="vorige_vraag" label="Vorige vraag" unelevated text-color="grey-9"/>
    <q-chip icon="question_answer">{{slides+1}}/{{numb_of_vragen}}</q-chip>
    <q-btn icon="navigate_next" @click="slides++" v-if="slides < numb_of_vragen-1" id="volgende_vraag" label="Volgende vraag" unelevated text-color="grey-9"/>
    </div>
</div>
</template>

<script>
import MeerKeuzePreview from './preview/meerKeuzePreview.vue'
import openPreview from './preview/openPreview.vue'
import RatingPreview from './preview/ratingPreview.vue'
import SelecterenPreview from './preview/selecterenPreview.vue'
import TussenPaginaPreview from './preview/tussenPaginaPreview.vue'
export default {
  components: { openPreview, MeerKeuzePreview, SelecterenPreview, RatingPreview, TussenPaginaPreview },
    props:['settings', 'stijl', 'vragen'],
    data(){
        return{
            numb_of_vragen:this.vragen.length,
            slides:0,
        }
    }
        
}
</script>

<style scoped>
.previewContainer{
    position:relative;
    height:100%;
}
.controls{
    bottom:0px;
    left: 0px;
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>