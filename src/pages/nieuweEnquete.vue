<template>
  <q-toolbar class="bg-primary flex justify-between">
    <q-tabs class="text-grey-2" inline-label>
      <q-tab
        name="instellingenComp"
        icon="o_poll"
        label="Instellingen"
        @click="activeTab = 'Instellingen'"
      />
      <q-tab
        name="stijlComp"
        icon="o_palette"
        label="Stijl"
        @click="activeTab = 'Stijl'"
        :disable="id === null"
      />
      <q-tab
        name="enqueteComp"
        icon="o_poll"
        label="Enquête"
        @click="activeTab = 'Enquête'"
        :disable="id === null"
      />
    </q-tabs>
    <div class="">
      <span
        ><q-btn
          icon="remove_red_eye"
          label="preview"
          color="primary"
          class="q-mr-sm"
          @click="previewMode = true"
          :disabled="preview"
          unelevated
        />
        <q-tooltip style="overflow: hidden" v-if="preview">
          <strong v-if="enquete.vragen">Sla eerst je wijzigingen op</strong>
          <strong v-else>Voeg eerst een vraag toe.</strong>
        </q-tooltip>
      </span>
      <span>
        <q-btn
          label="Opslaan"
          color="secondary"
          icon="save"
          :disabled="save"
          @click.prevent="saveEnquete"
          unelevated
        />
        <q-tooltip style="overflow: hidden" v-if="save">
          <strong>Geen wijzigingen</strong>
        </q-tooltip>
      </span>
    </div>
  </q-toolbar>

  <q-tab-panels
    animated
    v-model="activeTab"
    style="width: 100%"
    class=""
    keep-alive
  >
    <q-tab-panel :name="stap.titel" v-for="stap in stappen" :key="stap">
      <q-card flat>
        <q-card-section style="height: 100%">
          <component
            :is="stap.content"
            @updateEvent="updateEvent($event)"
            :editData="editData"
          />
        </q-card-section>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>

  <!-- preview popup -->

  <q-dialog v-model="previewMode" full-width>
    <q-card class="">
      <q-card-section>
        <enquete-view :demo="true" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from "boot/axios";
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import enqueteComp from "src/components/enquete_components/enqueteComp.vue";
import stijlComp from "src/components/enquete_components/stijlComp.vue";
import instellingenComp from "src/components/enquete_components/instellingenComp.vue";
import EnquetePreview from "src/components/enquete_components/enquetePreview.vue";
import EnqueteView from "src/layouts/enqueteView.vue";

export default defineComponent({
  components: {
    enqueteComp,
    stijlComp,
    instellingenComp,
    EnquetePreview,
    EnqueteView,
  },
  name: "PageIndex",
  setup() {
    const $q = useQuasar();
    $q.loadingBar.start();
  },
  mounted() {
    this.$q.loadingBar.stop();
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      api.get(`/surveys/${this.id}`).then((response) => {
        this.editData = response.data;

        if (!this.enquete.vragen) {
          this.enquete.vragen = response.data.questions;
          this.enquete.vragen.sort(function (a, b) {
            return a.options[0].id - b.options[0].id;
          });
        } else {
          for (var i = 0; i < response.data.questions.length; i++) {
            this.enquete.vragen.push(response.data.questions[i]);
          }
        }
      });
    }
  },
  data() {
    return {
      questionId: null,
      editData: null,
      id: null,
      preview: true,
      save: true,
      activeTab: "Instellingen",
      previewMode: false,
      step: 1,
      stappen: [
        {
          nr: 1,
          titel: "Instellingen",
          icon: "o_tune",
          content: "instellingenComp",
        },
        { nr: 2, titel: "Stijl", icon: "o_palette", content: "stijlComp" },
        { nr: 3, titel: "Enquête", icon: "o_poll", content: "enqueteComp" },
      ],
      enquete: {
        settings: null,
        stijl: {
        fontface: { label: "Roboto", value: "Roboto" },
        fontcolor: "#000",
        achtergrondkleur: "#ffffff",
        btncolor: "#26A69A",
        textalign: "center",
        logo: "top",
      },
        vragen: null,
      },
    };
  },
  methods: {
    updateEvent(e) {
      if (e.cat === "instellingen") {
        this.enquete.settings = e.val;
      }
      else if (e.cat === "stijl") {
        this.enquete.stijl = e.val;
      }
      else if (e.cat === "vragen") {
        this.enquete.vragen = e.val;
        for (var i = 0; i < this.enquete.vragen.length; i++) {
          this.enquete.vragen[i].id = i;
          this.enquete.vragen[i].waarde.id = i;
        }
      }

      this.save = false;
    },
    saveEnquete() {
      this.$q.loading.show();

      var settingsData = {
        name: this.enquete.settings.name,
        slug: this.enquete.settings.name.replaceAll(" ", "-"),
        status: String(this.enquete.settings.status),
        completedDescription: this.enquete.settings.completedDescription,
        client: `api/clients/${this.enquete.settings.client.value.id}`,
        options: [this.enquete.stijl, {anoniem:this.enquete.settings.anoniem}],
      };
      console.log(this.enquete.stijl);
      if (this.id === null) {
        var apiSettings = api
          .post("/surveys", settingsData)
          .then((response) => {
            this.id = response.data.id;
          });
      } else {
        var apiSettings = api.put(`/surveys/${this.id}`, settingsData);
      }

      apiSettings.then(() => {
        this.save = true;
        this.$q.loading.hide();
        this.$q.notify({
          message: "Enquête opgeslagen",
          icon: "check",
          color: "secondary",
        });
      });

      if (this.enquete.vragen != null) {
        for (var x = 0; x < this.enquete.vragen.length; x++) {
          if (this.enquete.vragen[x].surveyQuestionId === null) {
            var questionData = {
              title: this.enquete.vragen[x].waarde.vraag,
              slug: this.enquete.vragen[x].waarde.vraag.replace(" ", "-"),
              options: [this.enquete.vragen[x].waarde],
              survey: `api/surveys/${this.id}`,
            };

            api
              .post("/survey_questions", questionData)
              .then((response) => {
                this.questionId = response.data.id;

                this.enquete.vragen[x].surveyQuestionId = this.questionId;
              })
              .then(() => {});
          } else {
            if (this.enquete.vragen[x].waarde) {
              var questionData = {
                title: this.enquete.vragen[x].waarde.vraag,
                slug: this.enquete.vragen[x].waarde.vraag.replace(" ", "-"),
                options: [this.enquete.vragen[x].waarde],
                survey: `api/surveys/${this.id}`,
              };
              api.put(
                `/survey_questions/${this.enquete.vragen[x].surveyQuestionId}`,
                questionData
              );
            }
          }
        }
      }
    },
  },
  watch: {
    save() {
      if (
        this.save === false ||
        this.enquete.vragen === null ||
        !this.enquete.vragen ||
        this.enquete.vragen.length < 1
      ) {
        this.preview = true;
      } else {
        this.preview = false;
      }
    },
  },
});
</script>
