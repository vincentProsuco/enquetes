<template>
 <q-layout view="hHh lpR fFf">
    <q-page-container class="q-pa-md">
        <q-ribbon class="q-pb-md" position="right" leaf-position="top" decoration="rounded-in" inline glow>Inline Right Ribbon</q-ribbon>
      <div class="row q-mt-xl">
          <div class="col flex flex-center">
              <q-img :src="logo" style="max-width:150px"/>
          </div>
      </div>

      <div class="row flex flex-center">
        <div class="col flex flex-center">
           <span v-html="vraag" />
        </div>
    </div>

    <div class="row">
        <div class="col flex justify-center">
            <q-input
        v-model="antwoord"
        filled
        clearable
        type="textarea"
        color="teal"
        label="Uw antwoord"
        class="shadow-1"
        style="width:350px;"  
      />
        </div>
    </div>

    </q-page-container>

    <q-footer class="bg-grey-2 text-white flex flex-center q-pa-md">
      <div class="controls">
    <q-btn icon="navigate_before" id="vorige_vraag" flat rounded text-color="grey-9">
        <span v-if="!mobile">
            Vorige Vraag
        </span>
    </q-btn>
    <q-chip icon="question_answer">3/6</q-chip>
    <q-btn icon-right="navigate_next" id="volgende_vraag" flat rounded text-color="grey-9">
        <span v-if="!mobile">
            Volgende vraag
        </span>
    </q-btn>
    </div>
    </q-footer>

  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
export default {
    setup(){
        const $q = useQuasar()    
    },
    computed:{
        id(){
            return this.$route.params.id
        },
        mobile(){
            if(this.$q.platform.is.mobile){
                return true
                }
            else{return false}
    },
    },
    data(){
        return{
            vraag:'<h6><b>Lorem ipsum, dolor sit amet consectetur adipisicing elit?</b></h6>',
            logo:'https://www.barkhoorn.nl/images/footer-logo.svg',
            antwoord:'',
        }
    }
}
</script>