<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></EventCard>
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{
          name: 'EventList',
          query: { page: page - 1 }
        }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page</router-link
      >
    </div>
    <div class="pagination">
      <router-link
        id="page-next"
        :to="{
          name: 'EventList',
          query: { page: page + 1 }
        }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'EventListView',
  props: {
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0 //<--- Added this to store totalEvents
    }
  },
  created() {
    // EventService.getEvents(2, this.page)
    //   .then((response) => {
    //     this.events = response.data
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    watchEffect(() => {
      EventService.getEvents(this.perPage, this.page)
        .then((response) => {
          this.events = response.data
          this.totalEvents = response.headers['x-total-count'] //<--- Store it
          // console.log(this.totalEvents)
          // console.log(this.perPage)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  computed: {
    hasNextPage() {
      //First, calculate total pages
      let totalPages = Math.ceil(this.totalEvents / this.perPage) // 2 is events per page

      //Then check to see if the current page is less than the total pages
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
