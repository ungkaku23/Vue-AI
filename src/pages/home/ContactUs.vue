<template>
  <div>
    <div
      data-w-id="a3b6d44d-22be-c5f5-429f-f48c8fd0db18"
      class="section top-section"
    >
      <div class="wrapper">
        <div class="page-intro">
          <h1 class="page-heading">Contact Us</h1>
          <div style="width: 0px" class="divider page-intro-divider"></div>
          <div class="breadcrumbs">
            <a href="#" class="breadcrumbs-link">Home</a>
            <div class="breadcrumbs-arrow"></div>
            <div>Contact</div>
          </div>
        </div>
      </div>
      <div class="bg-elements">
        <div class="bg-element-1"></div>
        <div class="bg-element-2"></div>
        <div class="bg-element-3"></div>
        <div class="bg-element-4"></div>
      </div>
      <img
        src="@/assets/images/icons/decor-v1-haze.svg"
        alt=""
        class="decor-bottom"
      />
    </div>

    <div class="section-3 haze">
      <div class="wrapper side-paddings">
        <div class="w-layout-grid main-grid-3">
          <div
            id="w-node-be0aaf3d-3048-20c0-8e5b-97ccde90128b-b6f2d5f8"
            class="contact-v1-2"
          >
            <img
              src="@/assets/images/home/Webp.net-resizeimage-1.png"
              alt=""
              class="icon-4"
            />
            <h3 class="heading-32">
              Shoot us a message and we&#x27;ll respond for sure :)
            </h3>
            <div class="full-width w-form">
              <form
                id="Contact-Form-1"
                name="email-form"
                data-name="Email Form"
                class="contact-form"
              >
                <div id="w-node-be0aaf3d-3048-20c0-8e5b-97ccde901291-b6f2d5f8">
                  <label for="name" class="field-label-3">Your Name</label
                  ><input
                    type="text"
                    class="input-2 w-input"
                    maxlength="256"
                    name="Contact-Name"
                    data-name="Contact Name"
                    placeholder="Jane Smith"
                    id="Contact-Name"
                  />
                </div>
                <div id="w-node-be0aaf3d-3048-20c0-8e5b-97ccde901295-b6f2d5f8">
                  <label for="email" class="field-label-3">Email Address</label
                  ><input
                    type="email"
                    class="input-2 w-input"
                    maxlength="256"
                    name="Contact-Email"
                    data-name="Contact Email"
                    placeholder="jane@example.com"
                    id="Contact-Email"
                    required=""
                  />
                </div>
                <div id="w-node-be0aaf3d-3048-20c0-8e5b-97ccde901299-b6f2d5f8">
                  <label for="Contact-Subject" class="field-label-3"
                    >Subject</label
                  ><input
                    type="text"
                    class="input-2 w-input"
                    maxlength="256"
                    name="Contact-Subject"
                    data-name="Contact Subject"
                    placeholder="What can we help you with?"
                    id="Contact-Subject"
                  />
                </div>
                <div id="w-node-be0aaf3d-3048-20c0-8e5b-97ccde90129d-b6f2d5f8">
                  <label for="email" class="field-label-3">Message</label
                  ><textarea
                    id="field"
                    name="field"
                    placeholder="Give us some details"
                    maxlength="5000"
                    required=""
                    data-name="Field"
                    class="input-2 text-area w-input"
                  ></textarea>
                </div>
                <input
                  type="submit"
                  value="Send Message"
                  data-wait="Please wait..."
                  id="w-node-be0aaf3d-3048-20c0-8e5b-97ccde9012a1-b6f2d5f8"
                  class="button-6 w-button"
                />
              </form>
              <div class="form-success-2 w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div class="form-error-2 w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-layout-grid main-grid-3">
          <div
            id="w-node-be0aaf3d-3048-20c0-8e5b-97ccde9012a9-b6f2d5f8"
            class="mini-blocks-2 contact-blocks"
          >
            <div class="mini-block-2">
              <img
                src="@/assets/images/icons/phone.svg"
                alt=""
                class="icon-4"
              />
              <h3 class="mini-block-heading">Call</h3>
              <div class="mini-block-description-2">
                +1 (813) 397-8839<br />
              </div>
            </div>
            <div class="mini-block-2">
              <img
                src="@/assets/images/icons/yellow-icon-02.svg"
                alt=""
                class="icon-4"
              />
              <h3 class="mini-block-heading">Connect</h3>
              <div class="mini-block-description-2">
                DM Us on Twitter @HelloScribeAI
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
};
</script>