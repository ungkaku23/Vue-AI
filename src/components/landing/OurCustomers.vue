
<template>
  <div class="container wrapper-4">
    <div class="intro w-100 margin-bottom">
      <h2 class="heading-18 mb-5">What our customers are saying</h2>
      <div class="row">
        <div class="col-12 col-md-4 px-4">
          <div class="card outline">
            <h4>
              <strong>
                &quot;HelloScribe is the perfect tool for bloggers,
                entrepreneurs, and professionals who are looking for a little
                bit of assistance.&quot;</strong
              >
            </h4>
            <div class="customer-name">Gayle Dubois</div>
            <div class="customer-job">Agency Owner</div>
          </div>
        </div>
        <div class="col-12 col-md-4 px-4">
          <div class="card fill">
            <h4>
              <strong>
                &quot;HelloScribe has made my work life so much easier. I
                literally could not function without it.&quot;</strong
              >
            </h4>
            <div class="customer-name">Jake Feraggamo</div>
            <div class="customer-job">Press Release Writer</div>
          </div>
        </div>
        <div class="col-12 col-md-4 px-4">
          <div class="card light">
            <h4>
              <strong
                >&quot;HelloScribe is a great app for any content writer - it
                really helps with brainstorming and drafting especially when
                you&#x27;re pressed for time.&quot;</strong
              >
            </h4>
            <div class="customer-name">Candy Goodman</div>
            <div class="customer-job">Freelance Content Writer</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OurCustomers",
};
</script>

<style lang="scss" scoped>
.card {
  padding: 40px;
  border-radius: 12px;
  color: black;
  h4 {
    font-size: 21px;
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 30px;
    text-align: left;
  }
  .customer-name {
    font-weight: 700;
    margin-bottom: 8px;
    text-align: left;
  }
  .customer-job {
    color: #80878d;
    font-size: 13px;
    line-height: 1.5em;
    font-weight: 300;
    text-align: left;
  }
  &.outline {
    border: solid 2px #4d1f4d;
  }
  &.fill {
    color: white;
    background-color: #4d1f4d;
    .customer-job {
      color: white;
    }
  }
  &.light {
    background-color: #f4f8fa;
  }
}
</style>