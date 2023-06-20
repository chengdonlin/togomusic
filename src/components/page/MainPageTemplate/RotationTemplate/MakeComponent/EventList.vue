<template>
    <li class="event_list__item">
        <a class="event_list__link">
            <img class="event_list__pic" :src="data.cover">
        </a>
    </li>
</template>

<script>
export default {
  name: 'EventList',
  props: ['data']
}
</script>

<style scoped>
    .event_list__item {
        display: inline-block;
        width: 4%;
        box-sizing: border-box;
        padding-right: 20px;
    }
    .event_list__link {
        position: relative;
        display: block;
        width: 100%;
        padding-top: 40%;
    }
    .event_list__pic {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    img {
        border: 0;
    }
</style>
