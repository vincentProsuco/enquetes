<template>
  <q-card class="q-pa-md">
    <q-card-section>
       <q-toggle v-model="item.verplicht" label="Antwoord verplicht?" dense size="sm" icon="close" checked-icon="check"/>
    </q-card-section>
    <q-card-section>
      <!-- <q-input outlined  v-model="item.titel" label="Titel"/> -->
      <q-editor v-model="item.vraag" label="Titel" :toolbar="toolbar"/>
    </q-card-section>
    <q-card-section v-for="(vr, ii) in item.subvraag" :key="ii">
      <q-input
        outlined
        v-model="item.subvraag[ii]"
        :label="'Optie ' + (ii + 1)"
        dense
        @change="showPreview"
      >
        <template v-slot:after v-if="ii > 0"
          ><q-btn
            flat
            color="red"
            size="sm"
            round
            icon="remove_circle_outline"
            @click="removeQuestion(ii)"
        /></template>
      </q-input>
    </q-card-section>
    <q-card-section class="flex justify-center">
      <q-btn round color="secondary" icon="add" @click="addVraag" />
    </q-card-section>
    <q-card-section>
      <q-select
        :options="options"
        label="Rating Stijl"
        outlined
        v-model="item.ratingStijl"
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
    <q-card-section v-if="item.ratingStijl.value === 'tekst'">
      <q-input
        v-for="(q, i) in item.ratingOpties"
        :key="i"
        dense
        v-model="item.ratingOpties[i].label"
        :label="item.ratingOpties[i].label"
        class="q-mb-sm"
        @change="showPreview"/>
    
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
  watch: {
    item: {
      deep: true,
      handler(v) {
        var ic = v.ratingStijl.value;

        if (ic === "sterren") {
          this.rating_icon = [
            "star_rate",
            "star_rate",
            "star_rate",
            "star_rate",
            "star_rate",
          ];
        }
        if (ic === "emoticons") {
          this.rating_icon = [
            "sentiment_very_dissatisfied",
            "sentiment_dissatisfied",
            "sentiment_neutral",
            "sentiment_satisfied_alt",
            "sentiment_very_satisfied",
          ];
        }
        if (ic === "cijfers") {
          this.rating_icon = [
            "looks_one",
            "looks_two",
            "looks_3",
            "looks_4",
            "looks_5",
          ];
        }
      },
    },
  },
  computed: {
    item() {
      
      var item;
      if (this.edit) {
        
        item = this.edit;
      } else {
        // item={id:this.q, vraag: "", soort: "", opties: ["", ""], verplicht:false }
        item= {
        id:this.q,
        vraag: "",
        type:"",
        subvraag: [""],
        ratingStijl: "",
        ratingOpties: [
          { label: "Verschrikkelijk" },
          { label: "slecht" },
          { label: "Redelijk" },
          { label: "Goed" },
          { label: "Fantastisch" },
        ],
        verplicht:false,
      }
      }
      
      
      return item;
      
    },
  },
  data() {
    return {
      toolbar:this.$store.state.toolbar.toolbar,
      rating_icon: ["circle", "circle", "circle", "circle", "circle"],
      countq: 2,
      countv: 1,
     
      options: [
        {
          label: "Tekst",
          value: "tekst",
          icon: "text_fields",
        },
        {
          label: "Sterren",
          value: "sterren",
          icon: "star_rate",
        },
        {
          label: "Emoticons",
          value: "emoticons",
          icon: "mood",
        },
        {
          label: "Cijfers",
          value: "cijfers",
          icon: "looks_3",
        },
      ],
    };
  },
  methods: {
    addAntwoord() {
      this.countq++;
      this.item.opties.push({ label: "", icon: "" });
    },
    addVraag() {
      this.countv++;
      this.item.subvraag.push("");
    },
    removeOption(i) {
      this.item.opties.splice(i, 1);
      this.countq--;
    },
    removeQuestion(i) {
      this.item.subvraag.splice(i, 1);
      this.countv--;
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
