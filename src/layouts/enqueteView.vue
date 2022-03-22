<template>
  <q-layout view="hHh LpR fFf" v-if="status === false">
    <q-page-container>
      <div class="flex flex-center" style="min-height:100vh;">
           <span>\(^Д^)/</span>
           <span>Deze enquête is niet (meer) beschikbaar.</span>
      </div>
    </q-page-container>
  </q-layout>
  <q-layout view="hHh LpR fFf" v-else>
    <q-toolbar class="bg-warning flex flex-center" v-if="status === null">
      <span class="text-bold">
      <q-icon name ="o_warning"/>
        Let op: Enquête is in testmodus!
      </span>
    </q-toolbar>
    <q-page-container class="box">
      <div class="flex flex-center">
        <img
          :src="require('assets/prosucoLogo.png')"
          style="max-height: 5rem"
        />
      </div>
      <q-tab-panels v-model="tab" animated class="q-mt-lg" keep-alive>
        <q-tab-panel
          :name="index"
          v-for="(question, index) in survey"
          :key="index"
        >
        
        <open-vraag :question="question" v-if="question.options[0].type === 'Open vraag'"/>
        <meer-keuze :question="question" v-if="question.options[0].type === 'Meerkeuze'"/>
        <selectie :question="question" v-if="question.options[0].type === 'Selecteren'"/>
        <tussen-pagina :question="question" v-if="question.options[0].type === 'Tussen'"/>
        <rating :question="question" v-if="question.options[0].type === 'Rating'"/>

        </q-tab-panel>
        <q-tab-panel name="finnish">
          <div class="text-h6 flex flex-center">
            <span v-html="eindtext" class="text-center"></span>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-page-container>

    <q-footer class="bg-grey-3 text-white">
      <q-toolbar class="flex flex-center" v-if="tab != 'finnish' && status != false">
        <q-tabs
          v-model="tab"
          class="text-grey-10"
          active-color="primary"
          indicator-color="grey-10"
          narrow-indicator
        >
          <q-btn
            @click.prevent="tab--"
            label="Vorige"
            unelevated
            v-if="tab != 0 && tab != 'finnish'"
          />
          <q-btn
            @click.prevent="tab++"
            label="Volgende"
            unelevated
            v-if="tab != survey.length - 1 && tab != 'finnish'"
            class="q-mx-md"
          />
          <q-btn
            @click.prevent="postSurvey"
            label="Versturen"
            color="primary"
            unelevated
            size="md"
            class="q-mx-md"
            v-else
          />
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import openVraag from 'src/components/public/openVraag.vue';
import MeerKeuze from 'src/components/public/meerKeuze.vue';
import Selectie from 'src/components/public/selectie.vue';
import TussenPagina from 'src/components/public/tussenPagina.vue';
import Rating from 'src/components/public/rating.vue';
export default {
  components: { openVraag, MeerKeuze, Selectie, TussenPagina, Rating },
  setup() {
    var $q = useQuasar();
  },
  mounted() {
    var id = this.$route.hash.substring(1, this.$route.hash.legth);
    api.get(`/surveys/${id}`).then((response) => {
      console.log(response.data);
      this.status = response.data.options[0].status
      this.survey = response.data.questions;
      this.survey.sort(function (a, b) {
        return a.options[0].id - b.options[0].id;
      });
      this.nmQuestions = response.data.questions.length;
      this.eindtext = response.data.completedDescription;
      for(var n =0; n < this.nmQuestions; n++){
        
        this.answers.push({n:[]})
      }
    });
  },
  data() {
    return {
      answers: [],
      eindtext: null,
      tab: 0,
      nmQuestions: 0,
      activeQuestion: 0,
      survey: 0,
      status:null,
    };
  },
  methods: {
    postSurvey() {
      this.$q.loading.show();
      setTimeout(() => {
        this.$q.loading.hide();
      }, 1500);
      this.tab = "finnish";
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
  padding-top: 10vh;
}
</style>
