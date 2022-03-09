<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container class="box">
      <div class="flex flex-center">
        <img :src="require('assets/prosucoLogo.png')" style="max-height:5rem;">
      </div>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel
          :name="index"
          v-for="(question, index) in survey"
          :key="index"
        >
          <div class="text-h6 flex flex-center">
          <span v-html="question.title"></span>
          </div>
        </q-tab-panel>
        <q-tab-panel
        name="finnish">
         <div class="text-h6 flex flex-center">
         <span v-html="eindtext"></span>
         </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-page-container>

    <q-footer class="bg-grey-3 text-white">
      <q-toolbar class="flex flex-center" v-if="tab != 'finnish'">
        <q-tabs
          v-model="tab"
          class="text-grey-10"
          active-color="primary"
          indicator-color="grey-10"
          narrow-indicator
        >
          <q-btn @click.prevent="tab--" label="Vorige" unelevated v-if="tab != 0  && tab != 'finnish'" />
          <q-btn @click.prevent="tab++" label="Volgende" unelevated v-if="tab != survey.length-1 && tab != 'finnish'" class="q-mx-md"/>
          <q-btn @click.prevent="postSurvey" label="Versturen" color="primary" unelevated size="md" class="q-mx-md" v-else/>
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import { api } from "boot/axios";
import { useQuasar } from "quasar"
export default {
  setup(){
    var $q = useQuasar()
  },
  mounted() {
    var id = this.$route.hash.substring(1, this.$route.hash.legth);
    api.get(`/surveys/${id}`).then((response) => {
      this.survey = response.data.questions;
      this.nmQuestions = response.data.questions.length
      this.eindtext = response.data.completedDescription
    });
  },
  data() {
    return {
      eindtext:null,
      tab: 0,
      nmQuestions:0,
      activeQuestion: 0,
      survey: 0,
    };
  },
  methods: {
    postSurvey(){
      this.$q.loading.show()
      setTimeout(() => {
      this.$q.loading.hide()  
      }, 1500);
      this.tab = 'finnish'
    },
    active(i) {
      if (this.activeQuestion === i) {
        return true;
      }
    },
  },
};
</script>

<style scoped>

.question {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.box {
  
  margin-left: auto;
  margin-right: auto;
  width: 500px !important;
  max-width: 95vw !important;
  height: 50vh;
  padding-top:10vh;
}
</style>
