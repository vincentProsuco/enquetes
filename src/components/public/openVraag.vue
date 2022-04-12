<template>
<div class="text-center">
    <span v-html="vraag" class="text-h6"></span>
</div>
<div class="antwoord q-mt-md">
    <q-editor v-model="antwoord" :toolbar="[]"/>
</div>
</template>

<script>
export default {
    props:['question', 'qid'],
    emits:['answered-question'],
    data(){
        return{
            vraag:this.question.options[0].vraag,
            antwoord:'',
        }
    },
    watch:{
        antwoord(){
            this.$emit('answered-question', {id:this.question.id, qId:this.qid, answers:this.antwoord})
        }
    },

    
}
</script>