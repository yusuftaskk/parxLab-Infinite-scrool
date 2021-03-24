<template>
  <div id="app">
    <div class="list-group-container">
      <ul class="list-group" @scroll="loadMore">
        <!-- use @scroll.native when using a drag&drop library (like Vuedraggable) if you need to move the items to another column -->
        <li class="list-group-item" v-for="(item, index) in items" :key="index">
          <p>Item {{ index }}</p>
        </li>
      </ul>
      <transition name="fade">
        <p v-if="loading" class="loading">Loading</p>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 20,
      loading: false,
    };
  },
  computed: {
    map() {
      mapGetters(["dataInfinite"]);
    },
    items() {
      return this.page * this.itemsPerPage;
    },
  },
  mounted() {
    this.$store.dispatch("getData");
  },
  methods: {
    loadMore(e) {
      let { scrollTop, clientHeight, scrollHeight } = e.target;
      if (!this.loading && scrollTop + clientHeight >= (scrollHeight * 4) / 5) {
        this.loading = true;
        setTimeout(() => {
          this.page++;
          this.loading = false;
        }, 1000);
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.list-group-container {
  position: relative;
}

.list-group {
  width: 500px;
  max-height: 50vh;
  overflow-y: scroll;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.2), 0 0 0 1px rgba(10, 10, 10, 0.2);
}

.list-group .list-group-item {
  padding: 10px 20px;
  border-bottom: 1px solid rgba(44, 62, 80, 0.25);
  cursor: pointer;
}

.list-group .list-group-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.list-group .list-group-item:hover {
  background: rgba(44, 62, 80, 0.07);
}

.loading {
  position: absolute;
  bottom: 15%;
  left: 0;
  right: 0;
  width: 100px;
  margin: auto;
  padding: 10px 0;
  color: #fff;
  text-align: center;
  background: #2c3e50;
  border-radius: 4px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
