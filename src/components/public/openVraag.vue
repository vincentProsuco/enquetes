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
    props:['question'],
    data(){
        return{
            vraag:this.question.options[0].vraag,
            antwoord:'',
        }
    }
    
}
</script>