<template>
  <div>

    <GmapMap
    :center="userCoordinates"
    :zoom="zoom"
    style="width: 50%; height: 87%; position: absolute; right:0; bottom:0"
    :options="{
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      minZoom: 5,
      gestureHandling: greedy,
      styles: mapStyles}">

    <GmapCircle
    :center="userCoordinates"
    :radius="10"
    :options="circleStyles">
    </GmapCircle>

      <GmapCluster
      :position="center"
      :clickable="true"
      :animation="2">

      <GmapMarker
      v-for="(r, index) in bars"
      :key="index"
      :position="{
        lat:r.latLong[0],
        lng:r.latLong[1]}"
      :clickable="false"
      :draggable="false"
      :label="{'text': r.name, 'color': 'white', 'fontWeight': 'bold', 'fontSize': '12px'}"
      :icon="iconStyles"/>
      </GmapCluster>
    </GmapMap>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {

  data() {
    return {
      userCoordinates: {
        lat: 57.708870,
        lng: 11.974560
      },
      bars: [],
      zoom: 13,
      circleStyles: {
        fillColor: 'blue',
        fillOpacity: 0.7,
        visible: false,
        strokeColor: '#FFFFFF',
        strokeWeight: 3,
        strokeOpacity: 0.7
      },
      iconStyles: {
        url: require('./../../../images/map_icon.svg'),
        labelOrigin: {
          x: 10,
          y: -10
        },
        scaledSize: {
          width: 40,
          height: 40,
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
        this.userCoordinates = coordinates
        this.zoom = 16
        this.circleStyles.visible = true
      })
      .catch(error => alert(error))
  }
}
</script>
