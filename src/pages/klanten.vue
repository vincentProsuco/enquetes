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
          class="bg-grey-3"
        >
          <template v-slot:body-cell-akties="props">
            <q-td :props="props">
              <q-btn
                size="xs"
                round
                flat
                icon="delete"
                @click="deleteKlant(props.row)"
              />
              <q-btn
                size="xs"
                round
                flat
                icon="edit"
                @click="editKlant(props.row.id)"
              />
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
              icon="add_business"
              @click="(dialog = true), (editable = null)"
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
      <q-card-section class="flex justify-between">
        <span class="text-h6" v-if="!editable">Klant toevoegen</span>
        <span class="text-h6" v-else>{{ selectedKlant.klant }} bewerken</span>
        <q-icon
          class="clickable"
          name="close"
          flat
          color="secondary"
          size="xs"
          @click="dialog = false"
      /></q-card-section>
      <q-card-section>
        <nieuwe-klant-form
          :klantEdit="selectedKlant"
          @addKlantResult="klantAdded($event)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import nieuweKlantForm from "src/components/nieuweKlantForm.vue";
import { api } from "boot/axios";
export default defineComponent({
  components: { nieuweKlantForm },
  name: "PageIndex",

  
  setup() {
    const $q = useQuasar();
    $q.loadingBar.start();
  },
  mounted() {
    this.reloadKlanten()
    this.$q.loadingBar.stop();
  },
  data() {
    return {
      editable: null,
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
    deleteKlant(klant) {
      this.$q
        .dialog({
          title: `${klant.klant} verwijderen?`,
          message: `Typ <b>${klant.klant}</b> om te bevestigen. `,
          prompt: {
            model: "",
            isValid: (data) => data === klant.klant,
            type: "text",
          },
          html: true,
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          //Verwijder klant.id
          this.$q.notify({
            message: `${klant.klant} verwijderd.`,
            icon: "check",
          });
        });
    },
    editKlant(klantId) {
      this.dialog = true;
      this.editable = klantId;
    },
    klantAdded(mess) {
      this.dialog = false;
      this.reloadKlanten()
      this.$q.notify({
        message: mess,
        icon: "check",
      });
    },
    reloadKlanten() {
      this.rows =[]
      api.get("/klanten").then(response=>{
         for (var i = 0; i < response.data.data.length; i++) {
          this.rows.push({
          id: response.data.data[i].attributes.id,
          klant: response.data.data[i].attributes.naam,
          campagnes: "2",
          logo: "https://www.oostappen.de/media_file/park-icoonpos-og_5fbe4a91a229e.svg",
          email: response.data.data[i].attributes.mail,
          website: response.data.data[i].attributes.website,
        });
      }
      })
     
    },
  },
});
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
