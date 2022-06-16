<template>
  <div class="footer-2">
    <div class="container">
      <div class="footer__grid">
        <div
          id="w-node-_592b3d14-1ac5-5d04-f6d1-0cecf0024215-f0024212"
          class="footer-column-large"
        >
          <img
            src="@/assets/images/home/brandmark-design-26.png"
            width="130"
            alt="logo"
            sizes="(max-width: 479px) 160px, (max-width: 767px) 33vw, (max-width: 991px) 18vw, 160px"
            srcset="
              @/assets/images/home/brandmark-design-26-p-500.png   500w,
              @/assets/images/home/brandmark-design-26-p-800.png   800w,
              @/assets/images/home/brandmark-design-26-p-1080.png 1080w,
              @/assets/images/home/brandmark-design-26-p-1600.png 1600w,
              @/assets/images/home/brandmark-design-26-p-2000.png 2000w,
              @/assets/images/home/brandmark-design-26-p-2600.png 2600w,
              @/assets/images/home/brandmark-design-26.png        3821w
            "
            class="footer-logo"
          />
          <p class="footer-text">
            HelloScribe Guru is an AI-powered writing assistant that generates
            articles, headlines, and summaries of all kinds.
          </p>
          <p class="footer-text">If you have any questions please email:</p>
          <router-link
            :to="{ name: $routerItems.LOGIN }"
            class="footer-link-wrap w-inline-block"
            ><img
              src="https://uploads-ssl.webflow.com/5d01778cda7c6cc8a63e0b64/5d1324fd4b05c818c6fbecc1_mail.svg"
              width="19"
              alt=""
              class="footer-icon"
            />
            <p class="footer-text-02">support@helloscribe.ai</p>
          </router-link>
        </div>
        <div class="footer-column">
          <div class="footer-title">Company</div>
          <router-link
            :to="{ name: $routerItems.TERMS_OF_USE }"
            class="footer-link-2"
            >Terms of Use</router-link
          >
          <router-link
            :to="{ name: $routerItems.PRIVACY }"
            class="footer-link-2"
            >Privacy Notice</router-link
          >
          <router-link to="#faq" v-scroll-to="'#faq'" class="footer-link-2"
            >Frequently Asked</router-link
          >
        </div>
        <div class="footer-column">
          <div class="footer-title">Support</div>
          <router-link
            :to="{ name: $routerItems.HELP_TUTORIALS }"
            class="footer-link-2"
            > Tutorials</router-link
          >
          <a href="https://forms.gle/N8XSoYco43HuVM9v6" class="footer-link-2"
            >Request New Feature</a
          >
          <a href="https://forms.gle/ZeaS6ztjFZQJHWZg8" class="footer-link-2"
            >Report a Bug</a
          >
          <a to="https://forms.gle/1S1LD2N53r77prwB7" class="footer-link-2"
            >Report Outage</a
          >
        </div>
      </div>
      <div class="legal-wrap">
        <div class="legal-text">© Copyright 2022 HelloScribe</div>
        <div class="social-link-wrap">
          <a
            href="https://twitter.com/helloscribeai"
            target="_blank"
            class="social-link w-inline-block"
            ><img
              src="https://uploads-ssl.webflow.com/5d6f91252fd62f03bd2330e7/5d6f91252fd62f3d9d233139_twitter%20(4).svg"
              alt=""
          /></a>
          <a
            href="https://www.instagram.com/helloscribe/"
            target="_blank"
            class="social-link w-inline-block"
            ><img
              src="https://uploads-ssl.webflow.com/5d6f91252fd62f03bd2330e7/5d6f91252fd62f9df7233138_instagram%20(6).svg"
              alt=""
          /></a>
          <a
            href="https://facebook.com/helloscribeguru"
            target="_blank"
            class="social-link w-inline-block"
            ><img
              src="https://uploads-ssl.webflow.com/5d6f91252fd62f03bd2330e7/5d81e9e6e7908e56bf587612_Gumroad.svg"
              alt=""
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LandingFooter",
};
</script>
