<template>
    <q-toolbar class="bg-grey-3 flex justify-between">
      <q-tabs class="text-grey-8" v-model="activeTab" inline-label>
        <q-tab
          :name="stap.titel"
          :icon="stap.icon"
          :label="stap.titel"
          v-for="stap in stappen"
          :key="stap"
        />
      </q-tabs>
      <div class="">
           <span><q-btn
        icon="remove_red_eye"
        label="preview"
        color="primary"
        class="q-mr-sm"
        @click="previewMode = true"
        :disabled="preview"
        unelevated
      />
       <q-tooltip style="overflow:hidden;" v-if="preview">
          <strong v-if="enquete.vragen">Sla eerst je wijzigingen op</strong> 
          <strong v-else>Voeg eerst een vraag toe.</strong> 
        </q-tooltip>
      </span>
      <span>
      <q-btn
        label="Opslaan"
        color="secondary"
        icon="save"
        :disabled="save"
        @click="saveEnquete"
        unelevated
      />
        <q-tooltip style="overflow:hidden;" v-if="save">
          <strong>Geen wijzigingen</strong> 
        </q-tooltip>
      </span>
      </div>
    </q-toolbar>
  
    <q-tab-panels animated v-model="activeTab" style="width:100%;" class="" keep-alive>
      
      <q-tab-panel :name="stap.titel" v-for="stap in stappen" :key="stap">
        <q-card flat>
          <q-card-section style="height:100%;">
            <component :is="stap.content" @updateEvent="updateEvent($event)"/>
          </q-card-section>
        </q-card>
      </q-tab-panel>
      
      
    </q-tab-panels>
    <q-page-sticky
      position="bottom"
      :offset="[0, 0]"
      class="flex flex-end q-pa-md rounded"
    >
    </q-page-sticky>

  <!-- preview popup -->

  <q-dialog v-model="previewMode" full-width>
    <q-card class="">
      <q-card-section>
        <enquete-preview
          :settings="enquete.settings"
          :stijl="enquete.stijl"
          :vragen="enquete.vragen"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import enqueteComp from "src/components/enquete_components/enqueteComp.vue";
import stijlComp from "src/components/enquete_components/stijlComp.vue";
import instellingenComp from "src/components/enquete_components/instellingenComp.vue";
import EnquetePreview from "src/components/enquete_components/enquetePreview.vue";

export default defineComponent({
  components: { enqueteComp, stijlComp, instellingenComp, EnquetePreview },
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
      preview:true,
      save:true,
      activeTab: "Instellingen",
      previewMode: false,
      step: 1,
      stappen: [
        {
          nr: 1,
          titel: "Instellingen",
          icon: "tune",
          content: "instellingenComp",
        },
        { nr: 2, titel: "Stijl", icon: "palette", content: "stijlComp" },
        { nr: 3, titel: "Enquête", icon: "poll", content: "enqueteComp" },
      ],
      enquete: {
        settings: null,
        stijl: null,
        vragen: null,
      },
    };
  },
  methods: {
    updateEvent(e){
      this.enquete.vragen = e;
      this.save = false;
    },
    saveEnquete(){
     
       // Opslaan in DB 
      this.save = true;
      this.$q.notify(
        {
          message:'Wijzigingen opgeslagen',
          icon:'check',
          color:'secondary'
        }
      )
      
    },
  },
  watch:{
    save(){
      if(this.save === false || this.enquete.vragen === null || !this.enquete.vragen || this.enquete.vragen.length < 1) {
        this.preview = true;
      }           
      else{
        this.preview = false;
      }
    }
  }
});
</script>
