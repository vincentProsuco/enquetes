<template>
  <div class="row q-gutter-md">
    <div class="col-12 flex justify-center" v-if="items.length < 1">
      <div style="display: flex; flex-direction: column; align-items: center">
        <q-icon size="lg" name="report" color="grey-5" class="q-ma-md" />
        <span>Nog geen vragen toegevoegd...</span>
      </div>
    </div>
    <div class="col-6">
      <transition-group
  appear
  enter-active-class="animated bounce"
  leave-active-class="animated fadeOut"
>
      <q-expansion-item
      v-if="errors.length > 0"
        expand-separator
        icon="warning"
        :label="`${errors.length} fout(en)`"
        caption="Los deze eerst op."
        class="q-mb-md bg-warning"
      >
     <q-card v-for="error in errors" :key="error" class="q-pa-sm q-my-sm" flat>
       <span class="">
        <q-icon name="warning" /> {{error.message}}
       </span>
     </q-card>
      </q-expansion-item>
      </transition-group>
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
                        {{ element.name }}</span
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
        >
          <q-fab-action
            color="indigo-9"
            icon="question_answer"
            label="Open vraag"
            square
            @click="addVraag('Open vraag')"
          />
          <q-fab-action
            color="primary"
            icon="checklist"
            label="Meerkeuze"
            square
            @click="addVraag('Meerkeuze')"
          />
          <q-fab-action
            color="accent"
            icon="rule"
            label="Selecteren"
            square
            @click="addVraag('Selecteren')"
          />
          <q-fab-action
            color="orange-6"
            icon="star"
            label="Rating"
            square
            @click="addVraag('Rating')"
          />
          <q-fab-action
            color="lime-6"
            icon="article"
            label="Tussen pagina"
            square
            @click="addVraag('Tussen pagina')"
          />
        </q-fab>
    
    </div>
    </div>
 




</template>

<script>
import draggable from "vuedraggable";
import MeerKeuze from "../vragen/meerKeuze.vue";
import Selecteren from "../vragen/selecteren.vue";
import OpenVraag from "../vragen/openVraag.vue";
import Rating from "../vragen/rating.vue";
import TussenPagina from "../vragen/tussenPagina.vue";
export default {
  emits:['updateEvent'],
  props:['errors'],
  components: {
    draggable,
    MeerKeuze,
    Selecteren,
    OpenVraag,
    Rating,
    TussenPagina,
  },
  data() {
    return {
      items: [], 
      drag: false,
      ids: 0,
      previewMode: false,
    };
  },
  methods: {
    addVraag(k) {
      this.items.push({ id: this.ids, name: k, type: k, waarde: "" });
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
  watch:{
    items: {
      deep: true,
      handler(){
        this.$emit('updateEvent', this.items)
      }
        }
  }
};
</script>

<style scoped>
#vraagContainer {
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  margin-bottom: 0.7rem;
}
</style>
