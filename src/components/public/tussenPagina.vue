<template>
<div class="text-center">
    <span v-html="vraag"></span>
</div>
</template>

<script>
export default {
    props:['question'],
    data(){
        return{
            vraag:this.question.options[0].vraag,
        }
    }
    
}
</script>