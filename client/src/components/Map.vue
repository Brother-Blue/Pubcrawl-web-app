<template>
  <div>
    <!-- Focus user button -->
    <div id="button_over_map">
      <b-button
      variant="light"
      style="width: 40px; height: 40px; padding: 0"
      @click="focusUser">
      <b-icon
      icon="geo-alt">
      </b-icon></b-button>
    </div>

    <!-- Search adress bar-->
    <label id="search_over_map">
        <gmap-autocomplete
        placeholder="  Search Address"
        style="height: 40px; border-radius: 2px; border-width: 0px"
        v-on:keyup.enter="usePlace"
        :input="usePlace"
        @place_changed="setPlace">
        </gmap-autocomplete>
    </label>

    <!-- Search user button-->
    <div id="searchbutton_over_map">
        <b-button
        variant="light"
        style="width: 40px; height: 40px; padding: 0"
        @click="usePlace">
        <b-icon
        icon="search">
        </b-icon></b-button>
    </div>

    <!-- Google map layout -->
    <GmapMap
    ref="mapRef"
    :center="mapCoordinates"
    :zoom="zoom"
    style="width:50%; position:absolute; right:0; bottom:0; top: 63px"
    :options="{
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      minZoom: 5,
      styles: mapStyles}">

      <!-- Bar directions -->
      <DirectionsRenderer travelMode="WALKING" :origin="origin" :destination="destionation"/>

      <!-- Bar info window -->
      <GmapInfoWindow
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen = false">
      </GmapInfoWindow>

      <!-- Bar clustering -->
      <GmapCluster
      :clickable="true"
      :zoom-on-click="true"
      :maxZoom="15"
      :animation="1">

      <!-- Bar marker -->
      <GmapMarker
      v-for="(r, index) in bars"
      :key="index"
      :position="{
        lat: r.latLong[0],
        lng: r.latLong[1]}"
      :clickable="true"
      :draggable="false"
      @click="toggleInfoWindow(r,index)"
      :icon="barStyles"/>
      </GmapCluster>

      <!-- User marker -->
      <GmapMarker
      :position="userCoordinates"
      :clickable="false"
      :draggable="false"
      :icon="userStyles"/>
    </GmapMap>

  </div>
</template>

<script>
import DirectionsRenderer from '@/components/DirectionsRenderer'

export default {
  components: { DirectionsRenderer },
  props: ['bars'],

  data() {
    return {
      mapCoordinates: {
        lat: 57.708870,
        lng: 11.974560
      },
      userCoordinates: null,
      place: null,
      zoom: 12,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      start: null,
      end: null,
      barStyles: {
        url: require('./../../../images/map_icon.png'),
        scaledSize: {
          width: 50,
          height: 50,
          f: 'px',
          b: 'px'
        }
      },
      userStyles: {
        url: require('./../../../images/user_icon.jpg'),
        scaledSize: {
          width: 60,
          height: 60,
          f: 'px',
          b: 'px'
        }
      },
      mapStyles: [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#242f3e'
            }
          ]
        },
        {
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#746855'
            }
          ]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#242f3e'
            }
          ]
        },
        {
          featureType: 'administrative.country',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'administrative.land_parcel',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative.locality',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563'
            }
          ]
        },
        {
          featureType: 'administrative.neighborhood',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'administrative.province',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#263c3f'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#6b9a76'
            }
          ]
        },
        {
          featureType: 'road',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#38414e'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#212a37'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9ca5b3'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#746855'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#1f2835'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#f3d19c'
            }
          ]
        },
        {
          featureType: 'transit',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#2f3948'
            }
          ]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#17263c'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#515c6d'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#17263c'
            }
          ]
        }
      ]
    }
  },

  created() {
    // Get user's coordinates from browser request and mark it
    this.$getLocation({})
      .then(coordinates => {
        this.userCoordinates = coordinates
        this.mapCoordinates = coordinates
        this.zoom = 16
        this.start = JSON.stringify(this.userCoordinates.lat + ',' + this.userCoordinates.lng)
      })
      .catch(error => alert(error))
  },

  methods: {
    // Refocus user's coordinates from browser request and mark it
    focusUser() {
      this.$getLocation({})
        .then(coordinates => {
          this.userCoordinates = coordinates
          this.mapCoordinates = coordinates
          this.zoom = 16
          this.start = JSON.stringify(this.userCoordinates.lat + ',' + this.userCoordinates.lng)
        })
        .catch(error => alert(error))
      setTimeout(() => {
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo(this.userCoordinates)
        })
      }, 50)
    },

    // Set place from search adress bar
    setPlace(place) {
      this.place = place
    },
    //

    // Search based on input from adress bar
    usePlace(place) {
      if (this.place) {
        this.userCoordinates = this.place.geometry.location
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo(this.userCoordinates)
        })
        // I don't know why this is needed, but it is...
        this.start = JSON.parse(JSON.stringify(this.userCoordinates))
        this.start = JSON.stringify(this.start.lat + ',' + this.start.lng)
      }
      this.place = null
    },

    // Show info window based on which bar pressed
    toggleInfoWindow: function (bar, idx) {
      this.infoWindowPos = {
        lat: bar.latLong[0],
        lng: bar.latLong[1]
      }
      this.infoOptions.content = this.getInfoWindowContent(bar)
      // this.end = JSON.stringify(this.infoWindowPos.lat + ',' + this.infoWindowPos.lng)

      // If same bar is clicked, close window. Else open
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    getInfoWindowContent: function (bar) {
      return (`  <div>
  <img src="${bar.photo}" alt="bar_image" style="width:15vh">
  <div>
    <p></p>
    <h6><b>${bar.name}</b></h6>
    <p>${bar.address}</p>
    <p>${bar.avgRating}</p>
  </div>
</div>`)
    }
  },

  computed: {
    // Get map directions with start positon
    origin() {
      if (!this.start) return null
      return { query: this.start }
    },

    // Get map directions with destination positon
    destionation() {
      if (!this.end) return null
      return { query: this.end }
    }
  }
}

</script>
<style scoped>
  #button_over_map { position: absolute; bottom: 110px; right: 10px; z-index: 99; }
  #search_over_map { position: absolute; top: 73px; right: 55px; z-index: 99; }
  #searchbutton_over_map { position: absolute; top: 73px; right: 55px; z-index: 99; }
</style>
