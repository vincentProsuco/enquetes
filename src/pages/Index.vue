<template>
  <q-page class="q-px-md">
    <span>
      <h5>👋 {{begroeting}} Prosuco!</h5>
    </span>
    <div class="row q-col-gutter-x-lg">
      <div class="col-3">
        <q-card flat>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Klanten</div>
            <div class="text-subtitle2">
              <q-chip color="positive" size="sm" square>{{
                overzicht.klanten
              }}</q-chip>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="between" class="bg-grey-3">
            <q-btn unelevated to="/klanten">Bekijk alle</q-btn>
            <q-btn to="/klanten#new" flat icon="o_add" round />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3">
        <q-card flat>
          <q-card-section class="bg-secondary text-white">
            <div class="text-h6">Enquêtes</div>
            <div class="text-subtitle2">
              <q-chip color="positive" size="sm" square>{{
                overzicht.enquetes.actief
              }}</q-chip>
              <q-chip color="negative" size="sm" square>{{
                overzicht.enquetes.klaar
              }}</q-chip>
              <q-chip color="warning" size="sm" square>{{
                overzicht.enquetes.gepauzeerd
              }}</q-chip>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="between" class="bg-grey-3">
            <q-btn unelevated to="/enquetes">Bekijk alle</q-btn>
            <q-btn to="/enquetes/new" flat icon="o_add" round />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>


</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
export default defineComponent({
  name: "PageIndex",
  setup(){
    
  },
  mounted() {
    var d = new Date()
    var uur = d.getHours()
    
    if(uur > 5 && uur < 12){
      this.begroeting = 'Goedemorgen'
    }
    if(uur >= 12 && uur < 18){
      this.begroeting = "Goedemiddag"
    }
    if(uur >= 18 && uur <= 23){
      this.begroeting = "Goedenavond"
    }
    if(uur >= 0 && uur <= 5){
      this.begroeting = "Goedenacht"
    }
   
    api
      .get("/clients")
      .catch((error) => {
        if (error.response) {
          this.aanatalKlanten = "x";
        }
      })
      .then((response) => {
        this.overzicht.klanten = response.data.length;
      });
  },
  data() {
    return {
      dialog:false,
      begroeting:'Hoi',
      overzicht: {
        klanten: 0,
        enquetes: { actief: 0, klaar: 0, gepauzeerd: 0 },
      },
    };
  },
});
</script>
