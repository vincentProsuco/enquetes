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
            <q-list bordered class="shadow-1">
                <q-item tag="label" v-for="(o, index) in vraag.waarde.opties" :key="o" v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="dummyCheck[index]" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{o}}</q-item-label>
        </q-item-section>
      </q-item>
            </q-list>
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
            dummyCheck:[false, false, false, false, false, false, false, false, false]
        }
    }
}
</script>
<style scoped>
.vraag{
    font-size: 1.5rem;
}
</style>