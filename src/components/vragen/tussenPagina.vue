<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <q-editor v-model="item.vraag" @keyup="showPreview" :toolbar="toolbar"/>
    </q-card-section>
    <q-card-section>
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
  data() {
    return {
      toolbar:this.$store.state.toolbar.toolbar,
      item: {id:this.q, vraag:""},
    }
  },
  methods: {    
    showPreview() {
      this.$emit("vraag-preview", this.item);
    },
    deleteItem() {
      this.$emit("delete-item", this.q);
    },
  },
};
</script>
