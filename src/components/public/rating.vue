<template>
  <div class="text-center">
    <span v-html="vraag" class="text-h6"></span>
  </div>

  <div class="iconAnswers q-mt-md" v-if="ratingStijl != 'tekst'">
    <q-list separator>
      <q-item v-for="(subvraag, i) in answers" :key="subvraag">
        <q-item-section>
          <q-item-label>{{ subvraag }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-rating
            size="sm"
            :icon="icon"
            v-model="answers[i].antwoord"
            class="q-py-md"
            color="primary"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <div class="tekstAnswers q-mt-md" v-else>
    <div class="subvraag q-mb-md" v-for="(subvraag, i) in answers" :key="subvraag.vraag">
    <q-select :options="ratingOpties" :label="answers[i].vraag" v-model="answers[i].antwoord" clearable outlined>
      <template v-slot:label>
        <span v-html="subvraag.vraag"></span>
      </template>
    </q-select>
    </div>    

  </div>
  {{answers}}
</template>

<script>
export default {
  props: ["question", "stijl"],
  emits:['answered-question'],
  computed: {
    answers(){
      var answers = []
      for(var sv =0; sv < this.question.options[0].subvraag.length; sv++){
        answers.push({vraag:this.question.options[0].subvraag[sv], antwoord:null})
      }
      return answers
    },
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
      ratingOpties:this.question.options[0].ratingOpties
    };
  },
  watch:{
    antwoorden(){
      this.$emit('answered-question', this.antwoorden)
    }
  }
};
</script>

<style scoped></style>
