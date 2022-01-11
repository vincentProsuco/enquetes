<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col">
        <q-table
          :rows="rows"
          :columns="columns"
          :filter="filter"
          row-key="name"
          no-data-label="Geen klanten gevonden."
          no-results-label="Geen resultaten gevonden."
          rows-per-page-label="Rijen per pagina"
          flat
        >
          <template v-slot:body-cell-akties="props">
            <q-td :props="props">
              <q-btn size="xs" round flat icon="delete" />
              <q-btn size="xs" round flat icon="edit" />
            </q-td>
          </template>

          <template v-slot:body-cell-campagnes="props">
            <q-td :props="props">
              <q-badge
                v-if="props.value > 0"
                color="green"
                :label="props.value"
              />
              <q-badge v-else color="orange" :label="props.value" />
            </q-td>
          </template>

          <template v-slot:top-right>
            <q-input outlined v-model="filter" placeholder="Klant zoeken..">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:top-left>
            <q-btn
              label="Klant toevoegen"
              color="secondary"
              icon="add_business"
              @click="dialog = true"
            />
          </template>

          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <q-icon size="2em" name="error_outline" />
              <span>
                {{ message }}
              </span>
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>

  <q-dialog
    v-model="dialog"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="flex justify-between"
        ><span class="text-h6">Klant toevoegen</span
        ><q-icon
          class="clickable"
          name="close"
          flat
          color="secondary"
          size="xs"
          @click="dialog = false"
      /></q-card-section>
      <q-card-section>
        <nieuwe-klant-form />
      </q-card-section>
      <q-card-actions class="flex justify-end">
        <q-btn
          icon="save"
          flat
          label="Opslaan"
          color="secondary"
          @click="dialog = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import nieuweKlantForm from "src/components/nieuweKlantForm.vue";

export default defineComponent({
  components: { nieuweKlantForm },
  name: "PageIndex",
  setup() {
    const $q = useQuasar();
    $q.loadingBar.start();
  },
  mounted() {
    this.$q.loadingBar.stop();
  },
  data() {
    return {
      dialog: false,
      filter: "",
      columns: [
        {
          name: "klant",
          label: "Klant",
          sortable: true,
          field: (row) => row.klant,
          align: "left",
        },
        {
          name: "campagnes",
          label: "Campagnes",
          field: "campagnes",
          sortable: true,
          align: "left",
        },
        { name: "akties", label: "Akties", field: "akties", sortable: false },
      ],
      rows: [
        { klant: "Oostappen vakantieparken", campagnes: "2" },
        { klant: "De Barkhoorn", campagnes: "1" },
        { klant: "Hoge Hexel", campagnes: "0" },
      ],
    };
  },
});
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
