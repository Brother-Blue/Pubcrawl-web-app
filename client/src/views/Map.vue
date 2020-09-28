<template>
  <div>
    <b-button variant="outline-primary" @click="focusUser()"><b-icon icon="geo-alt"></b-icon></b-button>

    <label>
      <gmap-autocomplete
        placeholder="Skriv in din adress"
        @place_changed="setPlace">
      </gmap-autocomplete>
      <button @click="usePlace">Välj</button>
    </label>

    <!-- Google map layout -->
    <GmapMap
    ref="mapRef"
    :center="mapCoordinates"
    :zoom="zoom"
    style="width: 50%; height: 87%; position: absolute; right:0; bottom:0"
    :options="{
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      minZoom: 5,
      styles: mapStyles}">

      <GmapInfoWindow
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=false">
      </GmapInfoWindow>

      <!-- Bar clustering -->
      <GmapCluster
      :clickable="true"
      :animation="2">

      <!-- Bar marker -->
      <GmapMarker
      v-for="(r, index) in bars"
      :key="index"
      :position="{
        lat:r.latLong[0],
        lng:r.latLong[1]}"
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
import { Api } from '@/Api'
export default {

  data() {
    return {
      mapCoordinates: {
        lat: 57.708870,
        lng: 11.974560
      },
      userCoordinates: null,
      bars: [],
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
      barStyles: {
        url: require('./../../../images/map_icon.svg'),
        scaledSize: {
          width: 40,
          height: 40,
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
    // get user's coordinates from browser request
    this.$getLocation({})
      .then(coordinates => {
        this.userCoordinates = coordinates
        this.mapCoordinates = coordinates
        this.zoom = 16
      })
      .catch(error => alert(error))

    // populate map with bars
    Api.get('/bars')
      .then(response => {
        var e = response.data.bars
        for (var i = 0; i < e.length; i++) {
          this.bars.push(e[i])
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    focusUser() {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo(this.userCoordinates)
      })
    },
    setPlace(place) {
      this.place = place
    },
    usePlace(place) {
      if (this.place) {
        this.userCoordinates = this.place.geometry.location
        this.focusUser()
      }
      this.place = null
    },
    toggleInfoWindow: function (bar, idx) {
      this.infoWindowPos = {
        lat: bar.latLong[0],
        lng: bar.latLong[1]
      }
      this.infoOptions.content = bar.name

      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  }
}

</script>
