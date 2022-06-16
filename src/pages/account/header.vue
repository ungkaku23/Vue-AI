<template>
    <div>
        <p class="alert-profile-tag pt-5 pb-5" v-if="!subscribed" >
            Your free trial has expired. Need more?
            <a @click="onUpgrade" style="color: #E91E63;text-decoration: underline;cursor:pointer;">Upgrade now!</a>
        </p>
        <p class="alert-profile-tag pt-5 pb-5" v-else>
            
        </p>
    </div>
</template>
<script>
export default {
    name: "Header",
    data() {
        return {
            subscribed: this.$store.state.subscribed,
        }
    },
    methods: {
        onUpgrade() {
            this.$router.push({
                name: this.$routerItems.UPGRADE,
            });
        },
    }
};
</script>
