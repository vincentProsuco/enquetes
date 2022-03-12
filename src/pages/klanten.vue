<template>
  <q-page class="q-pa-lg" :key="componentKey">
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
          class="bg-grey-3"
          :loading="loading"
          :pagination="pagination"
          
        >
          <template v-slot:body-cell-akties="props">
            <q-td :props="props">
              <q-btn
                size="sm"
                round
                flat
                icon="o_delete"
                @click="deleteKlant(props.row)"
              />
              <q-btn
                size="sm"
                round
                flat
                icon="o_edit"
                @click="editKlant(props.row.id)"
              />
            </q-td>
          </template>

        <template v-slot:top-right>
            <q-input
              outlined
              v-model="filter"
              placeholder="Klant zoeken.."
              bg-color="grey-1"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:top-left>
            <q-btn
              label="Klant toevoegen"
              color="secondary"
              icon="o_add_business"
              @click="(dialog = true), (editable = null)"
            />
          </template>

          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <q-icon size="2em" name="o_error" />
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
      <q-card-section class="flex justify-between">
        <span class="text-h6" v-if="!editable">Klant toevoegen</span>
        <span class="text-h6" v-else>{{ selectedKlant.name }} bewerken</span>
        <q-icon
          class="clickable"
          name="o_close"
          flat
          color="secondary"
          size="xs"
          @click="dialog = false"
      /></q-card-section>
      <nieuwe-klant-form :klantEdit="selectedKlant" @form-send="klantAdded($event)"/>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from 'boot/axios';
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
    this.forceRerender()
    this.$q.loadingBar.stop();
    if(window.location.hash.substr(window.location.hash.length - 3) === 'new'){
      this.dialog=true
    }
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10
      },
      loading:true,
      componentKey: 0,
      editable: null,
      dialog: false,
      filter: "",
      columns: [
        {
          name: "name",
          label: "Klant",
          sortable: true,
          field: (row) => row.name,
          align: "left",
        },
        {
          name: "surveys",
          label: "Campagnes",
          field: (row) => row.surveys.length,
          sortable: true,
          align: "left",
        },
        { name: "akties", label: "Akties", field: "akties", sortable: false },
      ],
      rows: [],
    };
  },
  computed: {
    selectedKlant() {
      var klantid = this.editable;
      for (var i = 0; i < this.rows.length; i++) {
        if (this.rows[i].id === klantid) {
          return this.rows[i];
        }
      }
      return false;
    },
  },
  methods: {
    forceRerender(){
      api.get('/clients').then(response => {
      this.rows=response.data
    })
    this.loading = false
    },
    klantAdded(m){
      this.dialog=false;
      this.forceRerender()
       this.$q.notify({
            message: m,
            icon: "check",
          });
    },
    deleteKlant(klant) {
      this.$q
        .dialog({
          title: `${klant.name} verwijderen?`,
          message: `Typ <b>${klant.name}</b> om te bevestigen. <br> Let op: Deze aktie kan niet meer ongedaan gemaakt worden!  `,
          prompt: {
            model: "",
            isValid: (data) => data === klant.name,
            type: "text",
          },
          html: true,
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          api.delete(`/clients/${klant.id}`);          
          this.$q.notify({
            message: `${klant.name} verwijderd.`,
            icon: "check",
          });
          this.forceRerender()
        });
    },
    editKlant(klantId) {
      this.dialog = true;
      this.editable = klantId;
    },
  },
});
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
