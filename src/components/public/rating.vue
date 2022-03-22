<template>
  <div class="text-center">
    <span v-html="vraag" class="text-h6"></span>
  </div>

  <div class="iconAnswers" v-if="ratingStijl != 'tekst'">
    <q-list class="q-mt-md" separator>
      <q-item v-for="(subvraag, i) in subVragen" :key="subvraag">
        <q-item-section>
          <q-item-label>{{ subvraag }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-rating
            size="sm"
            :icon="icon"
            v-model="antwoorden[i]"
            class="q-py-md"
            color="primary"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: ["question"],
  computed: {
    icon() {
      if (this.question.options[0].ratingStijl.value === "sterren") {
        return "star";
      }
      if (this.question.options[0].ratingStijl.value === "emoticons") {
        return [
          "o_sentiment_very_dissatisfied",
          "o_sentiment_dissatisfied",
          "o_sentiment_neutral",
          "o_sentiment_satisfied",
          "o_sentiment_very_satisfied",
        ];
      }
      if (this.question.options[0].ratingStijl.value === "cijfers") {
        return [
          "o_looks_one",
          "o_looks_two",
          "o_looks_3",
          "o_looks_4",
          "o_looks_5",
        ];
      }
      return "star";
    },
  },
  data() {
    return {
      vraag: this.question.options[0].vraag,
      subVragen: this.question.options[0].subvraag,
      ratingOptions: this.question.options[0].ratingOpties,
      ratingStijl: this.question.options[0].ratingStijl.value,
      antwoorden: [0],
    };
  },
};
</script>

<style scoped></style>
