<template>
  <div id="app" v-cloak>
    <div class="d-flex justify-content-center">
      <table>
        <thead>
          <tr>
            <th @click="sort('name')"><h2>Name</h2></th>
            <th @click="sort('city')"><h2>City</h2></th>
            <th @click="sort('state')"><h2>State</h2></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in breweries" :key="b.id">
            <td>{{ b.name }}</td>
            <td>{{ b.city }}</td>
            <td>{{ b.state }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <button @click="prevPage" class="btn btn-primary mx-3" :disabled="cantGoBack">Previous</button>
      <button @click="nextPage" class="btn btn-danger">Next</button>
    </p>

    debug: sort={{ currentSort }}, dir={{ currentSortDir }}, page={{
      currentPage
    }}, {{ sortStr }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      breweries: [],
      currentSort: "name",
      currentSortDir: "asc",
      pageSize: 20,
      currentPage: 1,
    };
  },
  created: function () {
    this.loadBreweries();
  },
  methods: {
    async loadBreweries() {
      let data = await fetch(
        `https://api.openbrewerydb.org/breweries?page=${this.currentPage}&per_page=${this.pageSize}&sort=${this.sortStr}`
      );
      this.breweries = await data.json();
    },
    sort: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      } else this.currentSortDir = "asc";
      this.currentSort = s;
      this.loadBreweries();
    },
    nextPage: function () {
      this.currentPage++;
      this.loadBreweries();
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--;
      this.loadBreweries();
    },
  },
  computed: {
    cantGoBack() {
      return this.currentPage === 1;
    },
    sortStr() {
      let s = "";
      if (this.currentSortDir === "desc") s += "-";
      return s + this.currentSort;
    },
  },
};
</script>
<style>
td,
th {
  padding: 5px;
  border-radius: 1px solid #000;
}

th {
  cursor: pointer;
}

[v-cloak] {
  display: none;
}
</style>