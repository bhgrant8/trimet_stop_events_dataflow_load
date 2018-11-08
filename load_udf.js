function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

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

function makeDate(datestring) {
  var parts = datestring.split(':');
  var dateparts = [parts[0].substring(5, 9), parts[0].substring(2, 5), parts[0].substring(0, 2)]
  var date = dateparts.join("-")
  return Date.parse(date);
}

function transform(line) {
  var values = line.split(',');

  var obj = new Object();
  obj.id = uuidv4();
  obj.service_date = makeDate(values[0]);
  obj.vehicle_number = values[1];
  obj.leave_time = convertSeconds(values[2]);
  obj.train = values[3];
  obj.route_number = values[5];
  obj.direction = values[6];
  obj.service_key = values[7];
  obj.trip_number = values[8];
  obj.stop_time = convertSeconds(values[9]);
  obj.arrive_time = convertSeconds(values[10]);
  obj.dwell = values[11];
  obj.location_id = values[12];
  obj.door = values[13]
  obj.lift = values[14]
  obj.ons = values[15]
  obj.offs = values[16]
  obj.maximum_speed = values[17];
  obj.train_mileage = values[18];
  obj.pattern_distance = values[19];
  obj.location_distance = values[20];
  obj.x_coordinate = values[22]
  obj.y_coordinate = values[23];


  var jsonString = JSON.stringify(obj);

  return jsonString;
}
