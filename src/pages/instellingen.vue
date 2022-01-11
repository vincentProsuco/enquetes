<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-7">
        <q-card>
          <q-card-section>
            <q-input outlined label="Account naam" dense/> 
          </q-card-section>
          <q-card-actions>
            <q-btn label="Opslaan" icon="save" color="secondary" />
            <q-btn flat label="Terugzetten" icon="restore" color="secondary" />
          </q-card-actions>
        </q-card>
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
    };
  },
});
</script>
