<template>
  <q-card class="q-pa-md">
    <q-card-section>
       <q-toggle v-model="item.verplicht" label="Antwoord verplicht?" dense size="sm" icon="close" checked-icon="check"/>
    </q-card-section>
    <q-card-section>
      <!-- <q-input outlined v-model="item.vraag" label="Vraag" @change="showPreview"/> -->
      <q-editor v-model="item.vraag" label="Vraag" @change="showPreview" :toolbar="toolbar"/>
    </q-card-section>
    <q-card-actions>
      <q-btn
        color="red"
        flat
        label="vraag verwijderen"
        icon="delete_forever"
        @click="deleteItem"
        size="xs"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: ["q"],
  emits: ["vraag-preview", "delete-item"],
  mounted() {
    this.showPreview();
  },
  data() {
    return {
      toolbar:this.$store.state.toolbar.toolbar,
      countq: 2,
      item: {id:this.q, vraag: "", verplicht:false },
    };
  },
  methods: {
    addAntwoord() {
      this.countq++;
      this.item.opties.push("");
    },
    removeOption(i) {
      this.item.opties.splice(i, 1);
      this.countq--;
    },
    showPreview() {
      this.$emit("vraag-preview", this.item);
    },
    deleteItem() {
      this.$emit("delete-item", this.q);
    },
  },
};
</script>
