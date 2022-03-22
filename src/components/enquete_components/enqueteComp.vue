<template>
  <div class="row q-gutter-md">
    <div class="col-6" v-if="items.length < 1">
      <q-card flat>
        <q-card-section class="bg-grey-3">
          <div class="">
            <q-icon name="o_info" color="grey-4" size="sm" />
            <span class="q-ml-md text-grey-8"
              >Begin met het toevoegen van een vraag.</span
            >
          </div>
        </q-card-section>
        <q-list bordered>
          <q-item
            clickable
            v-for="v in vraagSoorten"
            :key="v.label"
            @click="addVraag(v.functie)"
          >
            <q-item-section top avatar>
              <q-avatar
                square
                :color="v.kleur"
                text-color="white"
                :icon="v.icoon"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ v.label }}</q-item-label>
              <q-item-label caption lines="2">
                {{ v.beschrijving }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
    <div class="col-6">
      <div v-if="items.length > 0">
        <div>
          <q-list>
            <draggable
              v-model="items"
              group="people"
              @start="drag = true"
              @end="drag = false"
              item-key="id"
            >
              <template #item="{ element }">
                <q-expansion-item
                  expand-separator
                  expand-icon="o_edit_note"
                  :icon="getSettings(element.type).icoon"
                  class="bg-grey-3 q-mb-sm"
                  :label="
                    element.waarde.vraag
                      ? element.waarde.vraag.substring(0, 24)+'...'
                      : element.name
                  "
                  :caption="'Type: '+getSettings(element.type).label"
                >
                  <q-card>
                    <q-card-section class="bg-grey-2">
                      <meer-keuze
                        v-if="element.type === 'Meerkeuze'"
                        :q="element.id"
                        :edit="element.waarde"
                        @delete-item="deleteItem(element)"
                        @vraag-preview="updateItems($event, false)"
                      />
                      <selecteren
                        v-if="element.type === 'Selecteren'"
                        :q="element.id"
                        :edit="element.waarde"
                        @delete-item="deleteItem(element)"
                        @vraag-preview="updateItems($event, false)"
                      />
                      <open-vraag
                        v-if="element.type === 'Open vraag'"
                        :q="element.id"
                        :edit="element.waarde"
                        @delete-item="deleteItem(element)"
                        @vraag-preview="updateItems($event, false)"
                      />
                      <rating
                        v-if="element.type === 'Rating'"
                        :q="element.id"
                        :edit="element.waarde"
                        @delete-item="deleteItem(element)"
                        @vraag-preview="updateItems($event, false)"
                      />
                      <tussen-pagina
                        v-if="element.type === 'Tussen'"
                        :q="element.id"
                        :edit="element.waarde"
                        @delete-item="deleteItem(element)"
                        @vraag-preview="updateItems($event, false)"
                      />
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </template>
            </draggable>
          </q-list>
        </div>
      </div>

      <q-fab
        color="secondary"
        icon="add"
        direction="right"
        style="z-index: 1000"
        class="q-mt-md"
        v-if="items.length > 0"
      >
        <q-fab-action
          v-for="v in vraagSoorten"
          :key="v.label"
          :color="v.kleur"
          :icon="v.icoon"
          :label="v.label"
          square
          @click="addVraag(v.functie)"
        />
      </q-fab>
    </div>
  </div>
</template>

<script>
import { api } from "boot/axios";
import draggable from "vuedraggable";
import MeerKeuze from "../vragen/meerKeuze.vue";
import Selecteren from "../vragen/selecteren.vue";
import OpenVraag from "../vragen/openVraag.vue";
import Rating from "../vragen/rating.vue";
import TussenPagina from "../vragen/tussenPagina.vue";
export default {
  emits: ["updateEvent"],
  props: ["editData"],
  components: {
    draggable,
    MeerKeuze,
    Selecteren,
    OpenVraag,
    Rating,
    TussenPagina,
  },
  mounted() {
    if (this.editData) {
      for (var i = 0; i < this.editData.questions.length; i++) {
        console.log(this.editData.questions[i])
        this.items.push({
          surveyQuestionId: this.editData.questions[i].id,
          id: this.ids,
          name: this.editData.questions[i].options[0].type,
          type: this.editData.questions[i].options[0].type,
          waarde: {
            id: this.editData.questions[i].options[0].id,
            vraag: this.editData.questions[i].options[0].vraag,
            type: this.editData.questions[i].options[0].type,
            verplicht: this.editData.questions[i].options[0].verplicht,
            ratingStijl: this.editData.questions[i].options[0].ratingStijl,
            opties: this.editData.questions[i].options[0].opties,
            soort: this.editData.questions[i].options[0].soort,
            ratingOpties: this.editData.questions[i].options[0].ratingOpties,
            subvraag: this.editData.questions[i].options[0].subvraag,
          },
        });

        this.ids++;
      }
      this.$emit("updateEvent", { val: this.items, cat: "vragen" });
    }
  },
  data() {
    return {
      items: [],
      drag: false,
      ids: 0,
      previewMode: false,
      vraagSoorten: [
        {
          kleur: "indigo-9",
          label: "Open vraag",
          icoon: "o_question_answer",
          functie: "Open vraag",
          beschrijving:
            "Bij een open vraag heeft de gebruiker de mogelijkheid zelf een antwoord te typen.",
        },
        {
          kleur: "primary",
          label: "Meerkeuze",
          icoon: "o_checklist",
          functie: "Meerkeuze",
          beschrijving:
            "De gebruiker heeft de keuze uit meerdere antwoorden en hierbij kunnen er meerdere antwoorden worden geselcteerd.",
        },
        {
          kleur: "accent",
          label: "Selecteren",
          icoon: "o_rule",
          functie: "Selecteren",
          beschrijving:
            "De gebruiker heeft de keuze uit meerdere antwoorden maar er kan slechts één antwoord geselecteerd worden.",
        },
        {
          kleur: "orange-6",
          label: "Rating",
          icoon: "o_star",
          functie: "Rating",
          beschrijving:
            "Gebruikers kunnen hun mening geven op basis van een schaal van 1 tot 5. Dit kan d.m.v. cijfers, tekst, emoticons of sterren.",
        },
        {
          kleur: "lime-6",
          label: "Tussen",
          icoon: "o_article",
          functie: "Tussen",
          beschrijving:
            "Met een tussenpagina kun je de gebruiker bijvoorbeeld extra informatie geven over de komende vragen.",
        },
      ],
    };
  },
  methods: {
    getSettings(vraagtype) {
      for (var i = 0; i < this.vraagSoorten.length; i++) {
        if (this.vraagSoorten[i].functie === vraagtype) {
          return this.vraagSoorten[i];
        }
      }
    },
    addVraag(k) {
      this.items.push({
        surveyQuestionId: null,
        id: this.ids,
        name: k,
        type: k,
        waarde: {
          id: null,
          vraag: "",
          opties: ["", ""],
          subvraag: [""],
          verplicht: false,
          type: k,
          ratingStijl: "",
          ratingOpties: [
            { label: "Verschrikkelijk" },
            { label: "slecht" },
            { label: "Redelijk" },
            { label: "Goed" },
            { label: "Fantastisch" },
          ],
        },
      });
      this.ids++;
    },
    deleteItem(e) {
      api.delete(`survey_questions/${e.surveyQuestionId}`);
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === e.id) {
          this.items.splice(i, 1);
          this.ids = this.ids - 1;
        }
      }
    },
    updateItems(e, p) {
      if (p === false) {
        this.items[e.id].waarde = e;
      }
    },
  },

  watch: {
    items: {
      deep: true,
      handler() {
        this.$emit("updateEvent", { val: this.items, cat: "vragen" });
      },
    },
  },
};
</script>

<style scoped>
#vraagContainer {
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  margin-bottom: 0.7rem;
}

.questionTitle {
  display: block;
  float: right;
  margin-left: 0.5rem;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
