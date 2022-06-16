<template>
  <b-modal
    ref="NewDocumentModal"
    id="NewDocumentModal"
    hide-footer
    title="Quick Menu"
  >
    <b-form>
      <div class="row quick-menu-body">
        <div
          v-for="(item, index) in quickMenuItems"
          :key="index"
          class="col-4 quick-menu-item"
        >
          <div
            :style="getBackColor(item.color)"
            @click="hideModal(item.router)"
          >
            <img
              :src="require(`@/assets/images/popup-icons/${item.img_src}`)"
              :alt="item.name"
              class="quick-menu-icon"
            />
          </div>
          <p @click="hideModal(item.router)">{{ item.name }}</p>
        </div>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import quickStartMenuItems from '../../constants/quickStartData';

export default {
  name: 'NewDocumentModal',
  data() {
    return {
      quickMenuItems: quickStartMenuItems,
    };
  },
  methods: {
    hideModal(router) {
      this.$refs['NewDocumentModal'].hide();
      this.$router.push({ name: router });
    },
    getBackColor(col) {
      return `background: ${col}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.quick-menu-icon {
  max-width: 20px;
}
.form-control:focus {
color: #495057;
    background-color: #fff;
    border-color: #574B8A;
    // -webkit-box-shadow: 0 0 0 0.2rem #574b8a57;
    // box-shadow: 0 0 0 0.2rem #574b8a57;
}
</style>
