<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col">
        <q-table
        :key="refreshKey"
          :rows="rows"
          :columns="columns"
          :filter="filter"
          :loading="loading"
          @request="refreshKey++"
          row-key="name"
          no-data-label="Geen enquetes gevonden."
          no-results-label="Geen resultaten gevonden."
          rows-per-page-label="Rijen per pagina"
          flat
          class="bg-grey-3"
        >
         

          <template v-slot:body-cell-campagne="props">
            <td>
              {{ props.value }}
            </td>
          </template>

          <template v-slot:body-cell-permalink="props">
            <td>
              <q-btn
                size="xs"
                flat
                icon="link"
                color="grey-8"
                round
                @click="copyPermaLink(props.value)"
              />
            </td>
          </template>

          <template v-slot:body-cell-resultaten="props">
            <td>
              <q-btn
                size="xs"
                flat
                icon="o_poll"
                color="grey-8"
                round
                :to="'/results/' + props.value"
              />
            </td>
          </template>

          <template v-slot:body-cell-status="props">
            <td>
              <q-chip
                square
                v-if="props.value === 'true'"
                label="Aktief"
                icon="o_check"
                text-color="white"
                color="green-4"
                size="sm"
              />
              <q-chip
                square
                v-if="props.value === 'null'"
                label="Gepauzeerd"
                icon="o_pause"
                text-color="white"
                color="orange-4"
                size="sm"
              />
              <q-chip
                square
                v-if="props.value === 'false'"
                label="Beëindigd"
                icon="o_stop"
                text-color="white"
                color="red-4"
                size="sm"
              />
            </td>
          </template>

          <template v-slot:top-right>
            <q-input
              outlined
              v-model="filter"
              placeholder="Enquête zoeken.."
              class="bg-grey-2"
            >
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

          <template v-slot:body-cell-akties="props">
            <q-td :props="props">
              <q-btn
                size="sm"
                round
                flat
                icon="o_delete"
                @click="deleteSurvey(props.row)"
              />
              <q-btn
                size="sm"
                round
                flat
                icon="o_edit"
                :to="'/enquetes/edit/'+props.row.id"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";

export default defineComponent({
  name: "PageIndex",
  setup() {
    const $q = useQuasar();
    $q.loadingBar.start();
  },
  mounted() {
    this.$q.loadingBar.stop();
    api.get("/surveys").then((response) => {
      for (var x = 0; x < response.data.length; x++) {
        this.rows.push({
          id: response.data[x].id,
          campagne: response.data[x].name,
          klant: response.data[x].client.name,
          status: response.data[x].status,
          permalink: response.data[x].slug,
        });
      }
    this.loading=false
    });
  },
  data() {
    return {
      loading:true,
      filter: "",
      refreshKey:0,
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
          field: (row) => row.klant + '#' + row.id ,
          align: "left",
        },
        {
          name: "permalink",
          label: "Link",
          sortable: false,
          field: (row) => row.klant + '#' + row.id ,
          align: "left",
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          sortable: true,
          align: "left",
        },
        {
          name: "akties",
          label: "Akties",
          field: "akties",
          sortable: false,
          align: "right",
          field: (row) => row.id,
        },
      ],
      rows: [],
    };
  },
  methods: {
    deleteSurvey(survey) {
      this.$q
        .dialog({
          title: `${survey.campagne} verwijderen?`,
          message: `Typ <b>${survey.campagne}</b> om te bevestigen. <br> Let op: Deze aktie kan niet meer ongedaan gemaakt worden!  `,
          prompt: {
            model: "",
            isValid: (data) => data === survey.campagne,
            type: "text",
          },
          html: true,
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          api.delete(`/surveys/${survey.id}`)
          .then(response =>{
            this.filter = ''
            
          })
                 
          this.$q.notify({
            message: `${survey.campagne} verwijderd.`,
            icon: "check",
          });
        });
    this.refreshKey++  
    },

    copyPermaLink(e) {
      var slug = "/#/enquete/" + e.replaceAll(' ', '-').toLowerCase() 
      
      var link = window.location.origin + slug;
      navigator.clipboard.writeText(link);
      this.$q.notify({
        message: "Link gekopieerd",
        icon: "content_copy",
      });
    },
  },
});
</script>
