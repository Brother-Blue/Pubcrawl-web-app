<template>
    <div>
        <b-button variant="outline-warning" @click="modalShow = !modalShow">
            <b-icon icon="plus-circle"></b-icon> New event
        </b-button>
        <b-modal
        header-bg-variant="dark"
        header-text-variant="warning"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
        footer-text-variant="info"
        v-model="modalShow"
        size="lg"
        centered
        scrollable
        title="Add a new event"
        ok-title="Save & Exit"
        ok-variant="warning"
        :ok-disabled="!invalidEvent"
        @ok="saveEvent"
        >
        <b-form-group
        label="Event title"
        label-for="event-title"
        description="Max length 30 characters"
        :state="validTitle"
        >
          <b-input
          id="event-title"
          v-model="eventTitle"
          :state="validTitle"
          placeholder="Example event"
          >
          </b-input>
        </b-form-group>
        <b-row>
          <b-col>
            <b-form-group
            label="Start Date"
            label-for="start-date"
            >
              <b-form-datepicker
                id="start-date"
                v-model="startDateValue"
                :min="minStartDate"
                :max="maxStartDate"
                :state="validDate"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
            label="End Date"
            label-for="end-date"
            >
            <b-form-datepicker
              id="end-date"
              v-model="endDateValue"
              :min="minEndDate"
              :max="maxEndDate"
              :state="validDate"
            ></b-form-datepicker>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
            label="Start Time"
            label-for="start-time"
            >
              <b-form-timepicker
                id="start-time"
                v-model="startTimeValue"
                :state="validDate"
              ></b-form-timepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
            label="End Time"
            label-for="end-time"
            >
              <b-form-timepicker
                id="end-time"
                v-model="endTimeValue"
                :state="validDate"
              ></b-form-timepicker>
            </b-form-group>
          </b-col>
        </b-row>
        <br>
        <b-form-group
        label="Event Description"
        label-for="event-description"
        description="Max length 280 characters"
        >
          <b-textarea
          id="event-description"
          v-model="description"
          :state="validDescription"
          ></b-textarea>
        </b-form-group>
        <b-dropdown
        class="bar-dropdown"
        text="Select Bars"
        variant="outline-warning"
        dropright
        offset="40"
        >
          <b-dropdown-form
          class="bg-dark text-warning text-justify"
          >
            <b-form-invalid-feedback text-variant="warning" :state="validBars">At least one bar must be selected. <hr class="bg-secondary"> </b-form-invalid-feedback>
            <b-checkbox-group
            class="p-1"
            v-model="selectedBars"
            :options="bars"
            value-field="bar"
            text-field="name"
            :state="validBars"
            switches
            stacked
            >
            </b-checkbox-group>
          </b-dropdown-form>
        </b-dropdown><br><br>
        <p class="text-warning" v-if="selectedBars.length > 0"> Selected Bars: {{selectedBars.length}}</p>
        </b-modal>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'add-event-btn',
  props: [
    'startDateVal',
    'uID'
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
      modalShow: false,
      startDateValue: this.startDateVal,
      startTimeValue: '',
      endDateValue: '',
      endTimeValue: '',
      minStartDate: '',
      maxStartDate: '',
      minEndDate: '',
      maxEndDate: '',
      eventTitle: '',
      description: '',
      uid: this.uID,
      bars: [],
      selectedBars: []
    }
  },
  mounted: function () {
    this.getAllBars()
  },
  computed: {
    validDate() {
      return this.startDateValue <= this.endDateValue && this.startDateValue !== '' && this.endDateValue !== '' && this.startTimeValue !== '' && this.endTimeValue !== ''
    },
    validTitle() {
      return this.eventTitle.length > 0 && this.eventTitle.length <= 30
    },
    validDescription() {
      return this.description.length <= 280
    },
    validBars() {
      return this.selectedBars.length > 0
    },
    invalidEvent() {
      return this.startDateValue <= this.endDateValue &&
      this.startDateValue !== '' && this.endDateValue !== '' &&
      this.startTimeValue !== '' && this.endTimeValue !== '' &&
      this.eventTitle.length > 0 && this.eventTitle.length <= 30 &&
      this.description.length <= 280 && this.selectedBars.length > 0 && this.uid
    }
  },
  methods: {
    saveEvent() {
      const payload = {
        title: this.eventTitle,
        description: this.description,
        startDate: this.startDateValue + 'T' + this.startTimeValue + '.000Z',
        endDate: this.endDateValue + 'T' + this.endTimeValue + '.000Z',
        users: this.$props.uID,
        bars: this.selectedBars
      }
      this.$emit('sendingPayload', payload)
    },
    formatter(value) {
      return value.toLowerCase()
    },
    getAllBars() {
      Api.get('/bars?sortByName=asc')
        .then(response => {
          response.data.forEach(bar => {
            this.bars.push({ bar: bar._id, name: bar.name })
          })
        }).catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
.btn {
    margin: 20px 15px;
    float: right;
}

.bar-dropdown /deep/ .dropdown-menu {
  max-height: 40vh;
  min-width: 50vh;
  margin-left: 35px;
  padding: 0;
  overflow-y: auto;
}

.selected-list {
  list-style: none;
  margin-top: 2px;
  margin-bottom: 5px;
}
</style>
