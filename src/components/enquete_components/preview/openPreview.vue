<template>
<div>
    <div class="row q-pa-lg">
        <div class="col flex justify-center">
            <span class="vraag" v-html="vraag.waarde.vraag"></span>
        </div>
    </div>
    <div class="row">
        <div class="col"></div>
        <div class="col">
           <q-input
        v-model="dummyText"
        filled
        clearable
        type="textarea"
        color="teal"
        label="Uw antwoord"
        class="shadow-1"
        
      />
        </div>
        <div class="col"></div>
    </div>
</div>
</template>

<script>
export default {
    props:['vraag'],
    data(){
        return{
            dummyText:''
        }
    }
}
</script>

<style scoped>
.vraag{
    font-size: 1.5rem;
}
</style>