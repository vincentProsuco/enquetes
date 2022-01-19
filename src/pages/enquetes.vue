<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col">
        <q-table
          :rows="rows"
          :columns="columns"
          :filter="filter"
          row-key="name"
          no-data-label="Geen enquetes gevonden."
          no-results-label="Geen resultaten gevonden."
          rows-per-page-label="Rijen per pagina"
          flat
          class="bg-grey-3"
        >

            <template v-slot:body-cell-campagne="props">
            <td>         
          {{props.value}}
            </td>
          </template>

           <template v-slot:body-cell-permalink="props">
            <td>   
            <q-btn size="xs" flat icon="link" color="grey-8" round @click="copyPermaLink(props.value, props.row.klant)"/>      
            </td>
          </template>

          <template v-slot:body-cell-resultaten="props">
            <td>   
            <q-btn size="xs" flat icon="poll" color="grey-8" round :to="'/results/'+props.value"/>      
            </td>
          </template>

          <template v-slot:body-cell-status="props">
            <td>
            <q-chip square v-if="props.value === 'Actief'" :label="props.value" icon="check" text-color="white" color="green-4" size="sm"/>
            <q-chip square v-if="props.value === 'Gepauzeerd'" :label="props.value" icon="pause" text-color="white" color="orange-4" size="sm"/>
            <q-chip square v-if="props.value === 'Beëindigd'" :label="props.value" icon="stop" text-color="white" color="red-4" size="sm"/>
            </td>
          </template>


          <template v-slot:top-right>
            <q-input outlined v-model="filter" placeholder="Enquête zoeken.." class="bg-grey-2">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:top-left>
            <q-btn
              label="Nieuwe enquête"
              color="secondary"
              icon="add"
              to="/enquetes/new"
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
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
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
      filter: "",
      columns: [
        {
          name: "campagne",
          label: "Campagne",
          sortable: true,
          field: (row) => row.campagne,
          align: "left",
        },
        {
          name: "klant",
          label: "Klant",
          sortable: true,
          field: (row) => row.klant,
          align: "left",
        },
        {
          name: "resultaten",
          label: "Resultaten",
          sortable: false,
          field: (row) => row.permalink,
          align: "left",
        },
        {
          name: "permalink",
          label: "Link",
          sortable: false,
          field: (row) => row.permalink,
          align: "left",
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          sortable: true,
          align: "left",
        },
      ],
      rows: [
        {campagne:'Enquete Horeca', klant: "Oostappen vakantieparken", status: "Actief", permalink:'BA6nugy8dPfcPqdn' },
        {campagne:'Vragenlijst Boekingsproces', klant: "De Barkhoorn", status: "Gepauzeerd", permalink:'u9AEZKsRc303o9pO' },
        {campagne:'Klanttevredenheidsonderzoek', klant: "Hoge Hexel", status: "Beëindigd", permalink:'XTHF41A4WXMV9XDI' },
      ],
    };
  },
  methods:{
    copyPermaLink(e, k){
      var klant = k.replaceAll(' ', '-').toLowerCase();
      var link = window.location.origin + '/#/enquete/' + klant + '/' + e
      navigator.clipboard.writeText(link);
      this.$q.notify({
        message:'Link gekopieerd',
        icon:'content_copy'
      })
    }
  }
});
</script>
