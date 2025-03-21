import Vue from 'vue'
import moment from 'moment'

const formatForDate = 'DD/MM/YYYY'

function dateFormat (value, format = formatForDate) {
    return moment(value).format(format)
}

Vue.filter('dateFormat', function (value) {
  return dateFormat(value)
})

export { dateFormat }
