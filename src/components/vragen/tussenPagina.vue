<template>
  <q-card class="q-pa-md" flat>
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
  props: ["q", "edit"],
  emits: ["vraag-preview", "delete-item"],
  computed: {
    item() {
      var item;
      if (this.edit) {
        item = this.edit;
      } else {
        item = { id: this.q, vraag: "", type:"Tussen" };
      }
      return item;
    },
  },
  data() {
    return {
      toolbar:this.$store.state.toolbar.toolbar,
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
