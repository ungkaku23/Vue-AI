<template>
  <div class="d-flex">
    <b-button
      :disabled="saving"
      variant="outline-primary"
      @click="save"
      class="d-flex align-items-center mr-4 py-2"
      v-if="!hideSave"
    >
      <span class="material-icons-outlined mr-1">
        save
      </span>
      Save
    </b-button>
    <b-button
      @click="copy"
      variant="outline-primary"
      class="d-flex align-items-center mr-4 py-2"
    >
      <!-- <span class="material-icons-outlined mr-1">
        content_copy
      </span> -->
      <img src="~@/assets/images/icons/copysimple.png">
      {{ copied ? 'Copied' : 'Copy' }}
      <span class="material-icons-outlined ml-1 text-success" v-if="copied">
        done
      </span>
    </b-button>
    <b-button
      :disabled="adding"
      @click="add"
      v-if="!hideNote"
      variant="outline-primary"
      class="d-flex align-items-center mr-4 py-2"
    >
      <!-- <span class="material-icons-outlined mr-1">
        note_add
      </span> -->
      <img src="~@/assets/images/icons/bookmarksimple.png">
      {{ added ? 'Saved' : 'Save to Notes' }}
      <span class="material-icons-outlined ml-1 text-success" v-if="added">
        done
      </span>
    </b-button>
    <b-button
      @click="generate_similar"
      variant="outline-primary"
      class="d-flex align-items-center mr-4 py-2"
    >
      <b-spinner
          small
          class="mr-2"
          label="Spinning"
          v-if="loading"
      ></b-spinner>
      <img v-else src="~@/assets/images/icons/similarbutton.png" style="margin-right: 8px;">
      Similar
    </b-button>
    <b-button
      :disabled="deleting"
      @click="remove"
      variant="outline-primary"
      class="d-flex align-items-center mr-2 py-2"
    >
      <!-- <span class="material-icons-outlined mr-1">
        delete_outline
      </span> -->
      <img src="~@/assets/images/icons/trash.png">
      Remove
    </b-button>
  </div>
</template>
<script>
export default {
  name: 'GeneratorTools',
  props: {
    adding: {
      type: Boolean,
      default: false,
    },
    added: {
      type: Boolean,
      default: false,
    },
    copied: {
      type: Boolean,
      default: false,
    },
    hideSave: {
      type: Boolean,
      default: true,
    },
    hideNote: {
      type: Boolean,
      default: false,
    },
    saving: {
      type: Boolean,
      default: false,
    },
    deleting: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    add() {
      this.$emit('add');
    },
    save() {
      this.$emit('save');
    },
    copy() {
      this.$emit('copy');
    },
    remove() {
      this.$bvModal
        .msgBoxConfirm('Do you want to delete this item?', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          cancelVariant: 'primary',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$emit('remove');
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          // An error occurred
        });
    },
    generate_similar() {
      console.log(this.loading)
      this.$emit('generate_similar');
    },
  },
};
</script>
<style lang="scss" scoped>
.material-icons-outlined {
  font-size: 18px;
}
</style>
