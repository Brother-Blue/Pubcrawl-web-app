<template>
  <b-card
    class="event-card border border-secondary"
    bg-variant="dark"
    text-variant="warning"
    :header="eventTitle"
    footer-tag="footer"
  >
    <b-card-text>
      <b-row class="text-info">
        <b-col
          ><u
            >Starting {{ startDateDay }} @
            {{ startDateTime }}</u
          ></b-col
        >
        <b-col
          ><u
            >Ends {{ endDateDay }} @
            {{ endDateTime }}</u
          ></b-col
        >
      </b-row>
      <p class="text-light">For these bars:</p>
      <hr class="bg-secondary" />
      <ul class="bar-list text-warning" v-for="(name, index) in names" :key="index">
        <li>{{ name }}</li>
      </ul>
      <hr class="bg-secondary" />
      <b-button class="btn btn-warning float left" v-b-modal="'id' + eventID"
        >Update Event</b-button
      >
      <b-modal
        :id="'id' + eventID"
        header-bg-variant="dark"
        header-text-variant="warning"
        body-bg-variant="dark"
        body-text-variant="white"
        footer-bg-variant="dark"
        footer-text-variant="muted"
        centered
        ok-variant="warning"
        ok-title="Save & Exit"
        cancel-variant="danger"
        cancel-title="Delete this event"
        :ok-disabled="this.startDateValue > this.endDateValue"
        @cancel="deleteEvent(eventID)"
        @ok="updateEvent(eventID)"
        title="Update Event"
      >
        <p>Current Start Date: {{ startDateDay }}</p>
        <b-form-datepicker
          v-model="startDateValue"
          :placeholder="startDateDay"
          :min="minStartDate"
          :max="maxStartDate"
          :state="validDate"
        ></b-form-datepicker
        ><br />
        <p>Current Start Time: {{ startDateTime }}</p>
        <b-form-timepicker
          v-model="startTimeValue"
          :placeholder="startDateTime"
        ></b-form-timepicker
        ><br />
        <p>Current End Date: {{ endDateDay }}</p>
        <b-form-datepicker
          v-model="endDateValue"
          :placeholder="endDateDay"
          :min="minEndDate"
          :max="maxEndDate"
          :state="validDate"
        ></b-form-datepicker
        ><br />
        <p>Current End Time: {{ endDateTime }}</p>
        <b-form-timepicker
          v-model="endTimeValue"
          :placeholder="endDateTime"
        ></b-form-timepicker
        ><br />
        <hr class="bg-secondary" />
      </b-modal>
    </b-card-text>
    <template v-slot:footer>
      <em class="text-muted">Event ID: {{ eventID }}</em>
    </template>
  </b-card>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'user-event',
  props: [
    'eventID', 'startDateDay', 'startDateTime', 'endDateDay', 'endDateTime', 'eventTitle'
  ],
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minEndDate = new Date(today)
    minEndDate.setMonth(today.getMonth())
    minEndDate.setDate(today.getDate())
    const maxEndDate = new Date(today)
    maxEndDate.setMonth(today.getMonth() + 2)
    maxEndDate.setDate(today.getDate())
    const minStartDate = new Date(today)
    minStartDate.setMonth(today.getMonth())
    minStartDate.setDate(today.getDate())
    const maxStartDate = new Date(maxEndDate)
    maxStartDate.setMonth(maxEndDate.getMonth())
    maxStartDate.setDate(maxEndDate.getDate())
    return {
      startDateValue: this.startDateDay,
      startTimeValue: this.startDateTime,
      endDateValue: this.endDateDay,
      endTimeValue: this.endDateTime,
      minStartDate: minStartDate,
      maxStartDate: maxStartDate,
      minEndDate: minEndDate,
      maxEndDate: maxEndDate,
      names: [],
      eID: this.eventID
    }
  },
  mounted: function () {
    this.getBars(this.eID)
  },
  computed: {
    validDate() {
      return this.startDateValue <= this.endDateValue
    }
  },
  methods: {
    getBars(eventID) {
      if (eventID) {
        Api.get(`events/${eventID}/bars`)
          .then(response => {
            response.data.forEach(bar => this.names.push(bar.name))
          }).catch(error => {
            console.error(error)
          })
      }
    },
    deleteEvent(id) {
      this.$emit('yeetTheEvent', id)
    },
    updateEvent(id) {
      const payload = {
        startDate: this.startDateValue + 'T' + this.startTimeValue + '.000Z',
        endDate: this.endDateValue + 'T' + this.endTimeValue + '.000Z'
      }
      this.$emit('updateEventByID', id, payload)
    }
  }
}
</script>

<style scoped>
em {
  font-size: 1rem;
}

p {
  font-size: 1rem;
}

.bar-list {
  list-style-type: none;
  padding: 0px;
  text-align: center;
}
</style>
