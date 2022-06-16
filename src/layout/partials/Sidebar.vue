<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <sidebar-writing />
    </nav>
  </section>
</template>

<script>
import SidebarWriting from './SidebarWriting.vue';

export default {
  name: 'Sidebar',
  components: {
    SidebarWriting,
  },
  data() {
    return {
      collapses: [{ show: false }, { show: false }, { show: false }],
      imgProfile: this.$store.state.imgProfile,
      isWritingDashboard: false,
    };
  },

  methods: {
    sidebarInlineButtonClick() {
      document.querySelector('#sidebar').classList.toggle('active');
    },
    collapseAll() {
      var exp_element = document.getElementsByClassName('show');
      if (exp_element.length > 0) {
        var elm_id = exp_element[0].id;
        this.$root.$emit('bv::toggle::collapse', elm_id);
      }
    },
    profileImgPath: function() {
      if (this.imgProfile) {
        return this.imgProfile;
      } else {
        return require('@/assets/images/faces/placeholder-avatar.jpg');
      }
    },
  },
};
</script>
