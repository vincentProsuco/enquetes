<template>
  <q-layout view="hHh LpR fFf" v-if="status === false">
    <q-page-container>
      <div class="flex flex-center" style="min-height: 100vh">
        <div class="centerContainer flex justify-content-center">
          <span class="text-bold"
            >Sorry, deze enquête is niet (meer) beschikbaar.</span
          >
        </div>
      </div>
    </q-page-container>
  </q-layout>
  <q-layout view="hHh LpR fFf" v-else>
    <q-page-container class="box">
      <div class="flex flex-center">
        <img
          :src="require('assets/prosucoLogo.png')"
          style="max-height: 5rem"
        />
      </div>
      <q-tab-panels v-model="tab" class="q-mt-lg" keep-alive>
        <q-tab-panel
          :name="index"
          v-for="(question, index) in survey"
          :key="index"
          class="bg-secondary"
        >
          <open-vraag
            :question="question"
            v-if="question.options[0].type === 'Open vraag'"
            :qid="index"
            @answered-question="updateAnswers($event)"
          />
          <meer-keuze
            :question="question"
            v-if="question.options[0].type === 'Meerkeuze'"
            :qid="index"
            @answered-question="updateAnswers($event)"
          />
          <selectie
            :question="question"
            v-if="question.options[0].type === 'Selecteren'"
            :qid="index"
            @answered-question="updateAnswers($event)"
          />
          <tussen-pagina
            :question="question"
            v-if="question.options[0].type === 'Tussen'"
            :qid="index"
            @answered-question="updateAnswers($event)"
          />
          <rating
            :question="question"
            v-if="question.options[0].type === 'Rating'"
            :qid="index"
            @answered-question="updateAnswers($event)"
          />
        </q-tab-panel>

        <q-tab-panel :name="lastTab">
          <contact-info @contact-info="updateContactInfo($event)" />
        </q-tab-panel>
        <q-tab-panel name="tabSend">
          <span v-html="eindtext" class="flex flex-center"></span>
        </q-tab-panel>
      </q-tab-panels>
    </q-page-container>

    <q-footer class="bg-grey-3 text-white">
      <q-toolbar class="flex flex-center bottomTool" v-if="status != false">
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
            v-if="tab != 0 && tab != 'tabSend'"
            class="navBtn"
            color="primary"
            flat
            icon="o_chevron_left"
          />
          <q-btn
            @click.prevent="tab++"
            label="Volgende"
            unelevated
            v-if="tab != lastTab && tab != 'tabSend'"
            class="q-mx-md navBtn"
            color="primary"
            flat
            icon-right="o_navigate_next"
          />
          <q-btn
            v-if="tab === lastTab && status != 'null'"
            color="primary"
            @click="postSurvey"
            label="Versturen"
          />
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { colors, setCssVar } from "quasar";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import openVraag from "src/components/public/openVraag.vue";
import MeerKeuze from "src/components/public/meerKeuze.vue";
import Selectie from "src/components/public/selectie.vue";
import TussenPagina from "src/components/public/tussenPagina.vue";
import Rating from "src/components/public/rating.vue";
import ContactInfo from "src/components/public/contactInfo.vue";
export default {
  components: {
    openVraag,
    MeerKeuze,
    Selectie,
    TussenPagina,
    Rating,
    ContactInfo,
  },
  props: ["demo"],
  setup() {
    var $q = useQuasar();
        const d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
  },
  computed: {
    responseInfo() {
      var info = {
        email: "******@*******.**",
        firstName: "*****",
        suffix: "***",
        lastName: "******",
        telephone: "******",
        survey: `api/surveys/${this.$route.hash.substring(
          1,
          this.$route.hash.length
        )}`,
        answers: "",
      };
      if (this.anoniem === false) {
        info.email = "";
        info.firstName = "";
        info.suffix = "";
        info.lastName = "";
        info.telephone = "";
      }
      return info;
    },
    lastTab() {
      if (this.anoniem === false) {
        return this.survey.length - 1;
      } else {
        return this.survey.length;
      }
    },
  },
  mounted() {
    var id = this.$route.hash.substring(1, this.$route.hash.length);
 
    document.cookie = "id" + "=" + id + ";" + this.expires + ";path=/";

    var client = this.$route.path.split("/").pop();
    api.get(`/surveys/${id}`).then((response) => {
      if (
        response.data.client.name.replaceAll(" ", "-").toLowerCase() != client
      ) {
        this.status = false;
        return;
      } else {
        document.body.style.backgroundColor =
          response.data.options[0].achtergrondkleur;
        document.body.style.color = response.data.options[0].fontcolor;
        document.querySelector(".bottomTool").style.backgroundColor =
          response.data.options[0].achtergrondkleur;
        setCssVar("primary", response.data.options[0].btncolor);
        setCssVar("secondary", response.data.options[0].achtergrondkleur);
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute(
          "href",
          `https://fonts.googleapis.com/css?family=${response.data.options[0].fontface.label.replace(
            " ",
            "+"
          )}:400italic,400,300,700`
        );
        document.head.appendChild(link);
        document.body.style.fontFamily =
          response.data.options[0].fontface.label;
        this.stijl = response.data.options[0];
        this.font = response.data.options[0].fontface;
        this.status = response.data.status;
        this.anoniem = response.data.options[1].anoniem;
        this.survey = response.data.questions;
        this.survey.sort(function (a, b) {
          return a.options[0].id - b.options[0].id;
        });
        this.nmQuestions = response.data.questions.length;
        this.eindtext = response.data.completedDescription;
        for (var n = 0; n < this.nmQuestions; n++) {
          this.answers.push({ n: [] });
        }
      }
    });
  },
  data() {
    return {
      stijl: null,
      font: null,
      answers: [],
      eindtext: null,
      anoniem: null,
      tab: 0,
      nmQuestions: 0,
      activeQuestion: 0,
      survey: 0,
      status: null,
    };
  },
  methods: {
    postSurvey() {
      for (var i = 0; i < this.answers.length; i++) {
        var data = {
          surveyQuestion: `api/survey_questions/${this.answers[i].question}`,
          value: [this.answers[i].answers],
        };

        api.post("/survey_response_answers", data).then((response) => {
          console.log(response.data.id);
        });
      }

      setTimeout(() => {
        this.$q.loading.hide();
      }, 1500);
      this.tab = "tabSend";
    },
    active(i) {
      if (this.activeQuestion === i) {
        return true;
      }
    },
    updateContactInfo(e) {
      this.responseInfo.email = e.email;
      this.responseInfo.firstName = e.firstName;
      this.responseInfo.suffix = e.suffix;
      this.responseInfo.lastName = e.lastName;
      this.responseInfo.telephone = e.telephone;
    },
    updateAnswers(e) {
      this.answers[e.qId] = {question:e.id, answers:e.answers};
     
    },
  },
};
</script>

<style>
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
