## creates a random uuid for operation
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

## converts seconds of day to time
function convertSeconds(sec) {
  var hrs = Math.floor(sec / 3600);
  var min = Math.floor((sec - (hrs * 3600)) / 60);
  var seconds = sec - (hrs * 3600) - (min * 60);
  seconds = Math.round(seconds * 100) / 100

  var result = (hrs < 10 ? "0" + hrs : hrs);
  result += ":" + (min < 10 ? "0" + min : min);
  result += ":" + (seconds < 10 ? "0" + seconds : seconds);
  return result;
}

## converts the date string to date format recognized by bigquery
function makeDate(datestring) {
  var parts = datestring.split(':');
  var dateparts = [parts[0].substring(5, 9), parts[0].substring(2, 5), parts[0].substring(0, 2)]
  var date = dateparts.join("-")
  return Date.parse(date);
}

## takes the inported csv line, splits values on commas, performs transforms then returns json object
function transform(line) {
  var values = line.split(','); ## splits comma separated text into an array

  var stopEvent = new Object(); ## creates the stopEvent object

  stopeEvent.id = uuidv4(); ## random uuid
  stopeEvent.service_date = makeDate(values[0]);
  stopeEvent.vehicle_number = values[1];
  stopeEvent.leave_time = convertSeconds(values[2]);
  stopeEvent.train = values[3];
  stopeEvent.route_number = values[5];
  stopeEvent.direction = values[6];
  stopeEvent.service_key = values[7];
  stopeEvent.trip_number = values[8];
  stopeEvent.stop_time = convertSeconds(values[9]);
  stopeEvent.arrive_time = convertSeconds(values[10]);
  stopeEvent.dwell = values[11];
  stopeEvent.location_id = values[12];
  stopeEvent.door = values[13]
  stopeEvent.lift = values[14]
  stopeEvent.ons = values[15]
  stopeEvent.offs = values[16]
  stopeEvent.maximum_speed = values[17];
  stopeEvent.train_mileage = values[18];
  stopeEvent.pattern_distance = values[19];
  stopeEvent.location_distance = values[20];
  stopeEvent.x_coordinate = values[22]
  stopeEvent.y_coordinate = values[23];


  var jsonStopEvent = JSON.stringify(stopEvent);

  return jsonStopEvent;
}
