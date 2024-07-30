import * as Cesium from "cesium";
export const traceDroneOnMap = (viewer, json, positionNumber, color) => {
  const flightRecords = json.flight_records;
  const dates = Object.keys(flightRecords);
  const events: any[] = [];
  dates.forEach((date) => {
    const records = flightRecords[date];
    events.push({ date, records });
  });
  const event = events[positionNumber];
  const dataSource = new Cesium.CustomDataSource();
  const position = Cesium.Cartesian3.fromDegrees(
    event.records.longitude,
    event.records.latitude,
    event.records.height
  );
  viewer.dataSources.add(dataSource);
  dataSource.entities.add({
    position: position,
    point: {
      pixelSize: 10,
      color: color,
    },
  });

  const heading = Cesium.Math.toRadians(event.records.attitude_head);
  const pitch = Cesium.Math.toRadians(event.records.attitude_pitch);
  const roll = Cesium.Math.toRadians(event.records.attitude_roll);
  const distance = 1;
  const endPosition = Cesium.Cartesian3.fromDegrees(
    event.records.longitude +
      Cesium.Math.toDegrees(Math.cos(heading)) * (distance / 111319.9),
    event.records.latitude +
      Cesium.Math.toDegrees(Math.sin(heading)) *
        (distance / 111319.9) *
        Math.cos(pitch),
    event.records.height + distance * Math.sin(pitch)
  );

  dataSource.entities.add({
    polyline: {
      positions: [position, endPosition],
      width: 2,
      material: new Cesium.PolylineArrowMaterialProperty(color),
    },
  });
};

export const traceAllSequences = (viewer, json) => {
  const flightRecords = json.flight_records;
  const dates = Object.keys(flightRecords);
  const events: any[] = [];
  dates.forEach((date) => {
    const records = flightRecords[date];
    events.push({ date, records });
  });
  const positions = events.map((event) => {
    return Cesium.Cartesian3.fromDegrees(
      event.records.longitude,
      event.records.latitude,
      event.records.height
    );
  });
  const dataSource = new Cesium.CustomDataSource();
  viewer.dataSources.add(dataSource);
  dataSource.entities.add({
    polyline: {
      positions: positions,
      width: 2,
      material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.GREY),
    },
  });
};
