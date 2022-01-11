<template>
  <q-page class="q-pa-md">
    <q-card>
      {{ titel }}
    </q-card>
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
      titel: "Jouw titel!",
    };
  },
});
</script>
