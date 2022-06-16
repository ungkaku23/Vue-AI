<template>
  <div class="collaborators">
    <div
      class="collaborator-item"
      v-for="(item, idx) in collaborators"
      :key="idx"
    >
      <img src="@/assets/images/faces/user1.png" :alt="item.name" />
      <div class="name">{{ getFirstName(item.name) }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Collaborators",
  props: {
    collaborators: {
      require: false,
      default: [],
    },
  },
  methods: {
    getFirstName(fullName) {
      if(!fullName)return ''
      return fullName.split(" ")[0];
    },
  },
};
</script>
<style lang="scss" scoped>
.collaborators {
  display: flex;
  .collaborator-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    img {
      width: 32px;
      margin-bottom: 4px;
    }
    .name {
      font-size: 12px;
    }
  }
}
</style>
