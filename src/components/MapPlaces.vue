<template>
  <div class="map-container">
    <div class="left">
      <h2>What's in between...</h2>
      <hr>
      <b-input-group>
        <b-form-input id="loc1-input"
                    v-model="loc1"
                    type="text"
                    placeholder="Location 1"></b-form-input>
        <b-input-group-append>
          <b-button @click="getLocation();recenter();">Find me!</b-button>
        </b-input-group-append>
      </b-input-group>
      <br>
      <b-form-input id="loc2-input"
                    v-model="loc2"
                    type="text"
                    placeholder="Location 2"></b-form-input>
      <br>
      <b-button variant="success" @click="getPlaces()">Go!</b-button>
      <p class="error">{{ errorMsg }}</p> <!-- Error Message! -->
      <!-- <b-button @click="recenter()">Recenter</b-button> -->
      <hr>
      <h4>Location Options</h4>
      <div>
        <b-form-checkbox-group
          v-model="selected"
          :options="locTypeOptions"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="not-enabled"
          ></b-form-checkbox-group>
      </div>
      <hr>
      <!-- <h4>Dev stuff:</h4>
      <p>Map Center: {{ mapCenter }}</p>
      <p>Location 1: {{ pos1 }}</p>
      <p>Location 2: {{ pos2 }}</p>
      <p>Selected: {{ selected }}</p>
      <p>Places Found: {{ places }}</p> -->
      <div class="bottom">
        <p>Made with &lt;3 by <a href="https://kevinzqiu.com/">Kevin Qiu</a></p>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MapPlaces',
  data() {
    return {
      loc1: '', // Can try get cur position?
      loc2: '', // Enable autocomplete maybe? I'll do it later
      pos1: { lat: 0, lng: 0 },
      pos2: { lat: 0, lng: 0 },
      dist: 0,
      places: [],
      errorMsg: '',
      map: null,
      // eslint-disable-next-line
      mapCenter: new google.maps.LatLng(45.50, -122.69),
      markers: [],
      locTypeOptions: [
        { item: 'food', name: 'Restaurants' },
        { item: 'museums', name: 'Museums' },
        { item: 'attractions', name: 'Attractions' },
      ],
      selected: ['food', 'museums', 'attractions'],
    };
  },
  created() {
    this.getLocation();
  },
  mounted() {
    this.initMap();
  },
  methods: {
    getPlaces() { // Evaluate places on enter
      if (this.selected.length === 0) {
        this.errorMsg = 'Select at least one location type.';
      } else if (this.loc2.length === 0 || this.loc1.length === 0) {
        this.errorMsg = 'Enter addresses for both location 1 and 2 fields.';
      } else {
        const payload = {
          loc1: this.loc1,
          loc2: this.loc2,
          types: this.selected,
        };
        const path = 'http://127.0.0.1:5000/places';

        axios.post(path, payload)
          .then((res) => {
            this.places = JSON.parse(res.data.places);
            this.pos1 = res.data.geocodes.pos1;
            this.pos2 = res.data.geocodes.pos2;
            this.dist = res.data.dist;
            this.errorMsg = '';

            for (let i = 0; i < this.markers.length; i += 1) {
              this.markers[i].setMap(null);
            }
            this.markers = [];

            this.createMarker(this.pos1);
            this.createMarker(this.pos2);

            this.createPlacesMarkers();
          }).catch((error) => {
            // eslint-disable-next-line
            console.log(error);
            this.errorMsg = 'Enter valid addresses.';
          });
      }
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getLocationSuccess);
      }
    },
    getLocationSuccess(pos) {
      this.pos1 = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.mapCenter = this.pos1;
      this.loc1 = `${this.pos1.lat}, ${this.pos1.lng}`;
    },
    initMap() {
      // eslint-disable-next-line
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.mapCenter,
        zoom: 12,
        maxZoom: '20',
        minZoom: '3',
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
      });
    },
    createMarker(coords, lbl = '') {
      // eslint-disable-next-line
      const marker = new google.maps.Marker({
        position: coords,
        label: lbl,
        map: this.map,
      });
      this.markers.push(marker);
    },
    createPlacesMarkers() {
      for (let i = 0; i < this.places.length; i += 1) {
        this.createMarker(this.places[i].geometry.location, this.places[i].name);
      }
    },
    recenter() {
      // eslint-disable-next-line
      // const center = new google.maps.LatLng(this.mapCenter.lat, this.mapCenter.lng);
      this.map.panTo(this.mapCenter);
      this.map.setZoom(12);
    },
  },
};
</script>
