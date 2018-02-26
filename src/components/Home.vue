<template>
  <div>
    <full-calendar ref="calendar" timezone="Europe/Amsterdam" :event-sources="eventSources" @event-drop="eventDrop" @event-click="eventClick" @event-selected="eventSelected" :defaultView="defaultView" @event-created="eventCreated" :config="config"></full-calendar>
    <modal name="detail" :draggable="true" :resizable="true" height="auto">
      <form class="detail">
        <div class="form-group">
          <label for="chauffeurNaam">Chauffeur</label>
          <select class="form-control" v-model="model.taxi_id">
            <option v-for="option in chauffeurs" v-bind:key="option.taxi_id" v-bind:value="option.taxi_id">
              {{ option.chauffeurNaam }}
            </option>
          </select>
          <small id="chauffeurHelp" class="form-text text-muted">Naam van de chauffeur</small>
        </div>
        <div class="form-group">
          <label for="ritDatum">Rit datum</label>
          <input type="datetime-local" v-model="model.start" class="form-control" id="start" aria-describedby="startHelp" placeholder="Start tijd">
          <small id="startHelp" class="form-text text-muted">Wanneer begint de rit?</small>
        </div>
        <div class="form-group">
          <label for="ritBestemming">Rit bestemming</label>
          <input type="text" v-model="model.plaats" class="form-control" id="bestemming" aria-describedby="bestemmingHelp" placeholder="Bestemming">
          <small id="bestemmingHelp" class="form-text text-muted">Wat is de bestemming?</small>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="handleEvent">Versturen</button> 
        <button type="submit" v-if="model.id != null" v-on:click="deleteEvent" class="btn btn-danger">Verwijderen</button>
        <button type="submit" class="btn" v-on:click="hide">Sluiten</button>
      </form>
    </modal>
    <!-- <modal name="driver" :draggable="true" :resizable="true" height="auto">
      <form class="detail">
        <div class="form-group">
          <label for="chauffeurNaam">Chauffeur</label>
          <select class="form-control" v-model="model.taxi_id">
            <option v-for="option in chauffeurs" v-bind:key="option.taxi_id" v-bind:value="option.taxi_id">
              {{ option.chauffeurNaam }}
            </option>
          </select>
          <input v-if="model.taxi_id == null" type="text" v-model="model.chauffeurNaam" class="form-control" id="chauffeurNaam" aria-describedby="chauffeurNaamHelp" placeholder="Chauffeur naam">
          <small id="chauffeurNaamHelp" class="form-text text-muted">Naam van de chauffeur</small>
        </div>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="text" v-model="model.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="E-mail">
          <small id="emailHelp" class="form-text text-muted">Wat is het e-mailadres?</small>
        </div>
        <div class="form-group">
          <label for="typeAuto">Type auto</label>
          <input type="email" v-model="model.typeAuto" class="form-control" id="typeAuto" aria-describedby="typeAutoHelp" placeholder="Type auto">
          <small id="typeAutoHelp" class="form-text text-muted">Wat is het voor type auto?</small>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="handleEvent">Versturen</button> 
        <button type="submit" v-if="model.id != null" v-on:click="deleteEvent" class="btn btn-danger">Verwijderen</button>
        <button type="submit" class="btn" v-on:click="hideDriver">Sluiten</button>
      </form>
    </modal> -->
  </div>
</template>

<script>
import moment from 'moment'
import TaxiService from '../services/TaxiService'
moment.locale('nl')
export default {
  name: 'Calendar',
  data () {
    return {
      model: {
        chauffeurNaam: null,
        start: null,
        old_taxi_id: null,
        id: null,
        plaats: null,
        taxi_id: null
      },

      chauffeurs : [],
      eventSources: [
        {
          events (start, end, timezone, callback) {
            TaxiService.getTaxis().then(taxis => {
              let events = []
              taxis.forEach(element => {
                if (element.ritten && element.ritten.length > 0) {
                  element.ritten.forEach(rit => {
                    events.push({id:rit.id, taxi_id: element.id, old_taxi_id: element.id, plaats: rit.plaats, chauffeurNaam: element.chauffeurNaam, title: element.chauffeurNaam + ' - ' + rit.plaats, start: rit.date})
                  })
                }
              })
              callback(events)
            })
          },
          editable: true,
          resourceEditable: true
        }
      ],
      config: {
        locale: 'nl',
        timezone: 'local',
        header: {
          left: 'prev,next today myCustomButton',
          right: "month,agendaWeek,agendaDay,listMonth"
        },
        customButtons: {
          myCustomButton: {
              text: 'chauffeurs',
              click: this.showDriver
          }
        }
      },
      defaultView: 'month',
      selected: {}
    }
  },
  methods: {
    refreshEvents () {
      this.$refs.calendar.$emit('refetch-events')
    },
    removeEvent () {
      this.$refs.calendar.$emit('remove-event', this.selected)
      this.selected = {}
    },
    eventSelected (event) {
      this.show(event)
      this.selected = event
    },
    eventCreated (event) {
      this.selected = event
      this.resetModel()
      this.setModel(event)
      this.show()
    },
    eventClick: (...event) => {
      this.selected = event
    },
    resetModel () {
      for (var prop in this.model) {
        this.model[prop] = null
      }
    },
    showDriver () {
      this.$modal.show('driver')
    },
    hideDriver () {
      this.$modal.hide('driver')
    },
    setModel (newProps) {
      this.resetModel()
      for (var prop in newProps) {
        if (this.model.hasOwnProperty(prop)) {
          if (prop !== "start")
            this.model[prop] = newProps[prop]
          else
            this.model[prop] = moment(newProps[prop]).format('YYYY-MM-DD[T]HH:mm')
        }
      }
    },
    eventDrop (event) {
      this.setModel(event)
      this.updateRit()
    },
    show (rit) {
      this.setModel(rit)
      this.$modal.show('detail')
    },
    hide () {
      this.$modal.hide('detail')
    },
    handleEvent () {
      if (this.model.id !== null)
        if (this.model.old_taxi_id == this.model.taxi_id) {
          this.updateRit();
        } else {
          this.updateTaxi()
        }
      else
        this.createEvent()
    },
    updateTaxi () {
      TaxiService.updateTaxi(this.model).then(result => {
        this.refreshEvents()
        this.hide()
      }).catch(console.log("Could not update entity"))
    },
    updateRit () {
      TaxiService.updateRit(this.model).then(result => {
        this.refreshEvents()
        this.hide()
      }).catch(console.log("Could not update 'Rit'"))
    },
    createEvent () {
      TaxiService.createTaxiDrive(this.model).then(result => {
        this.refreshEvents()
        this.hide()
      }).catch(console.log("Could not create entity"))
    },
    deleteEvent () {
      TaxiService.deleteRit(this.model.id).then(result => {
        this.refreshEvents()
        this.hide()
      }).catch(console.log("Could not delete entity"))
    },
    getDriversList () {
      TaxiService.getTaxis().then(taxis => {
        let drivers = []
        taxis.forEach(driver => {
          drivers.push({taxi_id: driver.id, chauffeurNaam: driver.chauffeurNaam})
        })
        this.chauffeurs = drivers
      })
    }
  },
  mounted: function() {
    this.getDriversList()
  }
}
</script>
<style>
@import 'fullcalendar/dist/fullcalendar.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.detail {
  padding: 10px;
}
</style>