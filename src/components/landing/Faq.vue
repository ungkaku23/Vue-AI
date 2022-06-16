<template>
  <div class="container mb-5">
    <h2 id="faq" class="center-4">FAQ</h2>
    <div class="section__intro narrow u-mb-md">
      HelloScribe is the fast and easy way to generate a quality first
      PR & Marketing copy. Here are some frequently asked questions .<span class="text-span-5"
        ><br
      /></span>
    </div>
    <div class="faq__wrapper">
      <div class="faq__item" v-for="(faq, id) in faqs" :key="id">
        <div v-b-toggle="`faq-` + id" class="faq__head-2 w-inline-block">
          <img
            src="@/assets/images/icons/down.svg"
            loading="lazy"
            alt=""
            class="faq__arrow"
          />
          <div class="faq__question">
            {{ faq.query }}
          </div>
        </div>
        <b-collapse :id="`faq-` + id">
          <div class="faq__body">
            <p class="faq__answer-2">
              {{ faq.answer }}
            </p>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Faq",
  data() {
    return {
      faqs: [
        {
          query: "What kinds of articles does HelloScribe generate",
          answer:
            "HelloScribe Guru is a general-purpose AI software that can create various articles such as blogs, essays, op-eds, speeches, and more. And we are adding new presets all the time.",
        },
        {
          query: "How factual is the AI's output?",
          answer:
            "Results vary based on the inputs you provide. Accuracy is not guaranteed, however we provide a Research Companion that gives you immediate access to verified sources of information.",
        },
        {
          query: "Is there a maximum word limit?",
          answer:
            "HelloScribe Guru can generate up to 1000 words to help you get your writing started.",
        },
        {
          query: "Do I have to worry about copyright and plagiarism?",
          answer:
            "HelloScribe Guru does not copy or plagiarize text. Rather, it predicts what words could appear next in a sentence based on your input.",
        },
        {
          query: "Is there a limit to how many drafts I can create?",
          answer:
            "You are not limited to a certain number of drafts. But the right amount of detail in your prompt yields a higher probability of a draft you will be satisfied with.",
        },
        {
          query: "Why do you collect my billing information during trial?",
          answer:
            "Due to the long-form nature of some of our outputs, we want to ensure only folks with a legitimate interest in our tool gain access. Don't worry. Your payment details are safely encrypted with Stripe. You can cancel anytime during your trial.",
        },
      ],
    };
  },
};
</script>