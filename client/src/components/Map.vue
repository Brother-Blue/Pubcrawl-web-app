<template>
  <div>

    <GmapMap
        :center="{lat:myCoordinates.lat, lng:myCoordinates.lng}"
        :zoom="zoom"
        map-type-id="roadmap"
        style="width: 50%; height: 75%; position: absolute; right:0; bottom:0"
        :options="{
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: true,
            styles: styles}">

    <GmapMarker
        v-for="(r, index) in bars"
        :key="index"
        :position="{
            lat:r.latLong[0],
            lng:r.latLong[1]
            }"
        :clickable="true"
        :draggable="false"
        :icon="{
            url: require('./../../../images/toppng.com-aw-root-beer-beer-glasses-beer-stein-free-svg-vector-beer-875x925.png'),
            size: {width: 60, height: 90, f: 'px', b: 'px'},
            scaledSize: {width: 30, height: 45, f: 'px', b: 'px'}}"
        @click="center=r.position"/>
    </GmapMap>

  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'map-function',
  data() {
    return {
      myCoordinates: {
        lat: 57.708870,
        lng: 11.974560
      },
      bars: [],
      zoom: 13,
      styles: [
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
    // populate map with bars
    Api.get('/bars')
      .then(response => {
        this.bars = response.data.bars
      })
      .catch(error => {
        this.bars = error
      })
    // get user's coordinates from browser request
    this.$getLocation({})
      .then(coordinates => {
        this.myCoordinates = coordinates
        this.zoom = 16
      })
      .catch(error => alert(error))
  }
}
</script>
