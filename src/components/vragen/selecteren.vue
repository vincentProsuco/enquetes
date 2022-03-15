<template>
  <q-card class="q-pa-md" flat>
    <q-card-section>
       <q-toggle v-model="item.verplicht" label="Antwoord verplicht?" dense size="sm" icon="close" checked-icon="check"/>
    </q-card-section>
    <q-card-section>
      <!-- <q-input outlined v-model="item.vraag" label="Vraag" @change="showPreview"/> -->
      <q-editor v-model="item.vraag" label="Vraag" @change="showPreview" :toolbar="toolbar"/>
    </q-card-section>
    <q-card-section>
      <q-select
        :options="options"
        label="Keuze stijl"
        outlined
        v-model="item.soort"
        @change="showPreview"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
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
        <template v-slot:before><q-icon name="circle" /></template>
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
        item={id:this.q, vraag: "", soort: "", opties: ["", ""], verplicht:false }
      }
      
      return item;
    },
  },
  data() {
    return {
      toolbar:this.$store.state.toolbar.toolbar,
      countq: 2,
      options: [
        {
          label: "Dropdown",
          value: "dropdown",
          description: "Dropdown keuze menu",
          icon: "playlist_add_check",
        },
        {
          label: "Radio Buttons",
          value: "radio",
          description: "Radio buttons",
          icon: "radio_button_checked",
        },
      ],
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
