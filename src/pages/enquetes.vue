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
            <q-btn size="xs" flat icon="o_poll" color="grey-8" round :to="'/results/'+props.value"/>      
            </td>
          </template>

          <template v-slot:body-cell-status="props">
            <td>
            <q-chip square v-if="props.value === 'true'" label="Aktief" icon="check" text-color="white" color="green-4" size="sm"/>
            <q-chip square v-if="props.value === 'null'" label="Gepauzeerd" icon="pause" text-color="white" color="orange-4" size="sm"/>
            <q-chip square v-if="props.value === 'false'" label="Beëindigd" icon="stop" text-color="white" color="red-4" size="sm"/>
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
import { api } from 'boot/axios'

export default defineComponent({
  name: "PageIndex",
  setup() {
    const $q = useQuasar();
    $q.loadingBar.start();
  },
  mounted() {
    this.$q.loadingBar.stop();
    api.get('/surveys').then(response =>{
      for(var x = 0; x < response.data.length; x++){
        console.log(response.data[x])
      this.rows.push({campagne:response.data[x].name, klant: "ntb", status: response.data[x].status, permalink:response.data[x].slug})
      }
    })
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
      rows: [],
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
