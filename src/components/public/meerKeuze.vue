<template>
<div class="text-center">
    <span v-html="vraag" class="text-h6"></span>
</div>
<div class="antwoord q-mt-md">
    <q-list separator>
      <q-item tag="label" v-ripple v-for="(optie, i) in opties" :key="optie">
        <q-item-section avatar>
          <q-checkbox v-model="answers[i]" :val="optie" />
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
    props:['question', 'qid'],
    emits:['answered-question'],
    mounted(){
        
            for(var i = 0; i<this.opties.length; i++){
                this.answers.push(false)
            }
            
       
    },
    data(){
        return{
            vraag:this.question.options[0].vraag,
            opties:this.question.options[0].opties,
            answers:[]
           
        }
    },
    watch:{
        answers:{
          deep:true,
          handler(){
            this.$emit('answered-question', {id:this.question.id, qId:this.qid, answers:this.answers})
            }
        }
    },
    
}
</script>