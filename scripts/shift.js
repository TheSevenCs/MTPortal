const app = Vue.createApp({
  data() {
    return {
      currentlyWorking: false,
      OnBreak: false,
      StartTime: {
        hours: 0,
        minutes: 0,
      },
      ElapsedTime: {
        hours: 0,
        minutes: 0,
      },
      EndTime: {
        hours: 0,
        minutes: 0,
      },
      BreakTime: {
        hours: 0,
        minutes: 0,
      },
      minuteInterval: null, // Store the interval ID for cleanup
      initialTimeout: null, // Store the initial timeout ID for cleanup
      NeedsConfirmation: false,
      shiftPercent: 0,
      shiftDuration: 0, //in minutes
      unformattedEndtime: "22:00",
      shiftColor: "white",
    };
  },
  methods: {
    ToggleShift() {
      this.currentlyWorking = !this.currentlyWorking;
      this.stopMinuteWatcher();
      if (this.currentlyWorking) {
        this.restartStartTime();
        this.getCurrentTime();
        this.formatEndtime();
        this.elapsedTime();
        this.MinuteWatcher();
      } else {
        this.ToggleConfirmation();
        this.UpdateShift();
      }
      this.OnBreak = false;
    },
    ToggleConfirmation() {
      this.NeedsConfirmation = !this.NeedsConfirmation;
    },
    restartStartTime() {
      this.StartTime.hours = 0;
      this.StartTime.minutes = 0;
    },
    UpdateShift() {
      const minutesWorked =
        this.ElapsedTime.hours * 60 + this.ElapsedTime.minutes;
      console.log(minutesWorked, this.shiftDuration);
      this.shiftPercent = Math.floor(
        (minutesWorked / this.shiftDuration) * 100
      );
    },
    formatEndtime() {
      const [hoursString, minutesString] = this.unformattedEndtime.split(":");
      this.EndTime = {
        hours: parseInt(hoursString),
        minutes: parseInt(minutesString),
      };
      this.shiftDuration = this.CalculateShiftDuration;
    },
    MinuteWatcher() {
      const now = new Date();
      const secondsUntilNextMinute = 60 - now.getSeconds();
      this.initialTimeout = setTimeout(() => {
        this.elapsedTime();
        this.MinuteWatcher();
        this.UpdateShift();
        this.minuteInterval = setInterval(this.MinuteRefresh, 60000); // Set interval to 1 minute
      }, secondsUntilNextMinute * 1000);
    },
    stopMinuteWatcher() {
      if (this.initialTimeout) {
        clearTimeout(this.initialTimeout);
        this.initialTimeout = null;
      }
      if (this.minuteInterval) {
        clearInterval(this.minuteInterval);
        this.minuteInterval = null;
      }
    },
    ToggleBreak() {
      this.OnBreak = !this.OnBreak;
      this.stopMinuteWatcher();
    },
    getCurrentTime() {
      let now = new Date();
      this.StartTime.hours = now.getHours();
      this.StartTime.minutes = now.getMinutes();
    },
    elapsedTime() {
      const now = new Date();
      const startTimeInMinutes =
        this.StartTime.hours * 60 + this.StartTime.minutes;
      const nowInMinutes = now.getHours() * 60 + now.getMinutes();

      let elapsedMinutes = nowInMinutes - startTimeInMinutes;
      if (elapsedMinutes < 0) {
        elapsedMinutes += 24 * 60; // Adjust for crossing midnight
      }

      this.ElapsedTime.hours = Math.floor(elapsedMinutes / 60);
      this.ElapsedTime.minutes = elapsedMinutes % 60;
    },
  },
  computed: {
    currentTime() {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      let AMorPM = "AM";
      if (hours > 12) {
        hours = hours - 12;
        AMorPM = "PM";
      }
      return `${hours}:${minutes} ${AMorPM}`;
    },
    CalculateShiftDuration() {
      return (
        this.EndTime.hours * 60 +
        this.EndTime.minutes -
        (this.StartTime.hours * 60 + this.StartTime.minutes)
      );
    },
  },
  mounted() {
    this.endTime = this.currentTime; // Set the end time to the current time when the component is mounted
  },
});
