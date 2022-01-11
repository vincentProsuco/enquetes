<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <!-- <q-input outlined  v-model="item.titel" label="Titel"/> -->
      <q-editor v-model="item.titel" label="Titel"/>
    </q-card-section>
    <q-card-section v-for="(vr, ii) in item.vraag" :key="ii">
      <q-input
        outlined
        v-model="item.vraag[ii]"
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
        v-model="item.type"
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
    <q-card-section v-if="item.type.value === 'tekst'">
      <q-input
        v-for="(q, i) in item.opties"
        :key="i"
        dense
        v-model="item.opties[i].label"
        :label="item.opties[i].label"
        class="q-mb-sm"
        @change="showPreview"
      >
        <!-- <template v-slot:before><q-icon :name="rating_icon[i]" /></template> -->
      </q-input>
    </q-card-section>
    <q-card-section class="flex justify-center" v-if="item.opties.length < 5">
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
  props: ["q"],
  emits: ["vraag-preview", "delete-item"],
  watch: {
    item: {
      deep: true,
      handler(v) {
        var ic = v.type.value;

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
  data() {
    return {
      rating_icon: ["circle", "circle", "circle", "circle", "circle"],
      countq: 2,
      countv: 1,
      item: {
        id:this.q,
        titel: "",
        vraag: [""],
        type: "",
        opties: [
          { label: "Verschrikkelijk" },
          { label: "slecht" },
          { label: "Redelijk" },
          { label: "Goed" },
          { label: "Fantastisch" },
        ],
      },
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
      this.item.vraag.push("");
    },
    removeOption(i) {
      this.item.opties.splice(i, 1);
      this.countq--;
    },
    removeQuestion(i) {
      this.item.vraag.splice(i, 1);
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
