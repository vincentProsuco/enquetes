<template>
<div class="text-center">
    <span v-html="vraag" class="text-h6"></span>
</div>
<div class="antwoord q-mt-md">
    <q-select clearable outlined v-model="antwoord" :options="opties" label="Selecteer één" v-if="type === 'dropdown'"/>

    <q-list v-else>
      <q-item tag="label" v-ripple v-for="optie in opties" :key="optie">
        <q-item-section avatar>
          <q-radio v-model="antwoord" :val="optie" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{optie}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

</div>
</template>

<script>
export default {
    props:['question'],
    computed:{          
        type(){
            var type
            if (this.question.options[0].soort.label === 'Dropdown'){
                type = 'dropdown'
            }
            else{
                type = 'radio'
            }
            return type
        }
       
    },
    data(){
        return{
            vraag:this.question.options[0].vraag,
            opties:this.question.options[0].opties,
            antwoord:''
           
        }
    }
    
}
</script>