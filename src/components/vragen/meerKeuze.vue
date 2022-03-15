<template>
  <q-card class="q-pa-md">
    <q-card-section>
       <q-toggle v-model="item.verplicht" label="Antwoord verplicht?" dense size="sm" icon="close" checked-icon="check"/>
    </q-card-section>
    <q-card-section>
      <q-editor v-model="item.vraag" label="Vraag" @change="showPreview" :toolbar="toolbar"/>
    </q-card-section>
    <q-card-section>
      <q-input
        v-for="(q, i) in item.opties"
        :key="i"
        dense
        v-model="item.opties[i]"
        :label="item.opties[i]"
        class="q-mb-sm"
        @change="showPreview"
      >
        <template v-slot:before><q-icon name="check_box" /></template>
        <template v-slot:after v-if="i > 1"
          ><q-btn
            flat
            color="red"
            size="sm"
            round
            icon="remove_circle_outline"
            @click="removeOption(i)"
        /></template>
      </q-input>
    </q-card-section>
    <q-card-section class="flex justify-center">
      <q-btn round color="secondary" icon="add" @click="addAntwoord" />
    </q-card-section>
    <q-card-actions class="flex justify-between">
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
  mounted() {
    this.showPreview();
  },
  computed: {
    item() {
      var item;
      if (this.edit) {
        item = this.edit;
      } else {
        item = {id:this.q, vraag:"", opties: ["", ""], verplicht:false }
      }
      return item;
    },
  },
  data() {
    return {
      toolbar:this.$store.state.toolbar.toolbar, 
      countq: 2,
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
