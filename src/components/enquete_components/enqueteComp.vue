<template>
  <div class="row q-gutter-md">
    <div class="col-4" v-if="items.length < 1">
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
          <draggable
            v-model="items"
            group="people"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
            <template #item="{ element }">
              <div id="vraagContainer">
                <q-expansion-item
                  expand-separator
                  expand-icon="edit"
                  class="bg-grey-3"
                >
                  <template v-slot:header>
                    <div
                      class="flex justify-between q-pa-xs"
                      style="width: 100%; height: 100%"
                    >
                      <q-icon name="drag_indicator" size="sm" />
                      <span v-if="element.type === 'Open vraag'"
                        ><q-icon
                          name="question_answer"
                          size="xs"
                          color="indigo-9"
                        />
                       <span v-if="element.waarde.vraag">{{ element.waarde.vraag.substring(0,15) }}...</span>
                       <span v-else>{{ element.name }}</span>
                       </span
                      >
                      <span v-if="element.type === 'Meerkeuze'"
                        ><q-icon name="checklist" size="xs" color="primary" />
                        {{ element.name }}</span
                      >
                      <span v-if="element.type === 'Selecteren'"
                        ><q-icon name="rule" size="xs" color="accent" />
                        {{ element.name }}</span
                      >
                      <span v-if="element.type === 'Rating'"
                        ><q-icon name="star" size="xs" color="orange-6" />
                        {{ element.name }}</span
                      >
                      <span v-if="element.type === 'Tussen pagina'"
                        ><q-icon name="article" size="xs" color="lime-6" />
                        {{ element.name }}</span
                      >
                      <span></span>
                    </div>
                  </template>
                  <q-card class="q-pa-md bg-grey-1">
                    <meer-keuze
                      v-if="element.type === 'Meerkeuze'"
                      :q="element.id"
                      @delete-item="deleteItem($event)"
                      @vraag-preview="updateItems($event, false)"
                    />
                    <selecteren
                      v-if="element.type === 'Selecteren'"
                      :q="element.id"
                      @delete-item="deleteItem($event)"
                      @vraag-preview="updateItems($event, false)"
                    />
                    <open-vraag
                      v-if="element.type === 'Open vraag'"
                      :q="element.id"
                      :edit="element.waarde"
                      @delete-item="deleteItem($event)"
                      @vraag-preview="updateItems($event, false)"
                    />
                    <rating
                      v-if="element.type === 'Rating'"
                      :q="element.id"
                      @delete-item="deleteItem($event)"
                      @vraag-preview="updateItems($event, false)"
                    />
                    <tussen-pagina
                      v-if="element.type === 'Tussen pagina'"
                      :q="element.id"
                      @delete-item="deleteItem($event)"
                      @vraag-preview="updateItems($event, false)"
                    />
                  </q-card>
                </q-expansion-item>
              </div>
            </template>
          </draggable>
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
        this.items.push({
          surveyQuestionId: this.editData.questions[i].id,
          id: this.ids,
          name: "Open vraag",
          type: "Open vraag",
          waarde: {
            id: this.editData.questions[i].options[0].id,
            vraag: this.editData.questions[i].options[0].vraag,
            verplicht: this.editData.questions[i].options[0].verplicht,
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
          icoon: "question_answer",
          functie: "Open vraag",
          beschrijving:
            "Bij een open vraag heeft de gebruiker de mogelijkheid zelf een antwoord te typen.",
        },
        {
          kleur: "primary",
          label: "Meerkeuze vraag",
          icoon: "checklist",
          functie: "Meerkeuze",
          beschrijving:
            "De gebruiker heeft de keuze uit meerdere antwoorden en hierbij kunnen er meerdere antwoorden worden geselcteerd.",
        },
        {
          kleur: "accent",
          label: "Selectie vraag",
          icoon: "rule",
          functie: "Selecteren",
          beschrijving:
            "De gebruiker heeft de keuze uit meerdere antwoorden maar er kan slechts één antwoord geselecteerd worden.",
        },
        {
          kleur: "orange-6",
          label: "Rating",
          icoon: "star",
          functie: "Rating",
          beschrijving:
            "Gebruikers kunnen hun mening geven op basis van een schaal van 1 tot 5. Dit kan d.m.v. cijfers, tekst, emoticons of sterren.",
        },
        {
          kleur: "lime-6",
          label: "Tussen Pagina",
          icoon: "article",
          functie: "Tussen pagina",
          beschrijving:
            "Met een tussenpagina kun je de gebruiker bijvoorbeeld extra informatie geven over de komende vragen.",
        },
      ],
    };
  },
  methods: {
    addVraag(k) {
      this.items.push({
        surveyQuestionId: null,
        id: this.ids,
        name: k,
        type: k,
        waarde: {id:null, vraag:'', verplicht:false},
      });
      this.ids++;
    },
    deleteItem(e) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === e) {
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
</style>
