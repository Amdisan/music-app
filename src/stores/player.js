import { defineStore } from 'pinia'
import { Howl } from 'howler'
import helper from '../includes/helper'

export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%'
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload()
      }

      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })
      this.sound.play()

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress) //same as setInterval but is called before next frame renders
      })
    },
    async toggleAudio() {
      if (!this.sound.playing) {
        return
      }
      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },
    async progress() {
      this.seek = helper.formatTime(this.sound.seek())
      this.duration = helper.formatTime(this.sound.duration())

      this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress) //makes recursion to do updates
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return
      }

      const { x, width } = event.currentTarget.getBoundingClientRect()

      //document = 2000px, timeline = 1000px => clientX = 1000px when user clicks in the middle
      //because clientX uses document width, not timeline width. need to extract dictance between
      //document and timeline
      const clickX = event.clientX - x
      const percentage = clickX / width
      const seconds = this.sound.duration() * percentage

      this.sound.seek(seconds)
      this.sound.once('seek', this.progress)
    }
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }
      return false
    }
  }
})
