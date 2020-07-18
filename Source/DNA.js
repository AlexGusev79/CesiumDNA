
import { elevation, azimuth, range } from './iters.js';


var DNA = DNA || {};

var viewer = new Cesium.Viewer('cesiumContainer', {
	sceneModePicker : false,
	terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels()
});

//Add basic drag and drop functionality
viewer.extend(Cesium.viewerDragDropMixin);

// Get a reference to the ellipsoid, with terrain on it.  (This API may change soon)
const ellipsoid = viewer.scene.globe.ellipsoid;
const longitude = Cesium.Math.toRadians(34.0);
const latitude = Cesium.Math.toRadians(57.0);
const altitude = 0.;
const numVertex = 8;

DNA.longitude = longitude;
DNA.latitude  = latitude;
DNA.altitude  = altitude;
DNA.ellipsoid = ellipsoid;


// [OPTIONAL] Fly the camera there, to see if we got the right point.
DNA.pointOfInterest = Cesium.Cartographic.fromDegrees(
    34, 57, 200000.0, new Cesium.Cartographic());
viewer.camera.flyTo({
    destination: ellipsoid.cartographicToCartesian(DNA.pointOfInterest,
        new Cesium.Cartesian3())
});

function getModelMatrix(_elevation, _azimuth) {

	let location = ellipsoid.cartographicToCartesian(new Cesium.Cartographic(longitude, latitude, altitude));
	let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(location);
	let orientation = Cesium.Matrix3.multiply(
						Cesium.Matrix3.multiply(
							Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(_azimuth)),
					        Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(_elevation)), new Cesium.Matrix3()),
						    Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(0.)), new Cesium.Matrix3()
					  );

	return Cesium.Matrix4.multiply(modelMatrix, Cesium.Matrix4.fromRotationTranslation(orientation, Cesium.Cartesian3.ZERO), new Cesium.Matrix4());
}

function addSensor(_elevation, _azimuth, _radius) {
	viewer.scene.primitives.removeAll();
	var customSensor = new CesiumSensors.CustomSensorVolume();
	var directions = [];

	for (var i = 0; i < numVertex; ++i) {
		let azimuth = Cesium.Math.toRadians(i * 45.);
		let elevation = Cesium.Math.toRadians(_elevation);
		directions.push(new Cesium.Spherical(azimuth, elevation));
	}

	customSensor.modelMatrix = getModelMatrix(_elevation, _azimuth);
	customSensor.radius = _radius;
	customSensor.directions = directions;
	viewer.scene.primitives.add(customSensor);
}


let iterRange = range[Symbol.iterator]();
let iterElevation = elevation[Symbol.iterator]();
let iterAzimuth = azimuth[Symbol.iterator]();


let secondsOfDay = 0;
viewer.clock.onTick.addEventListener(function(clock){
	  (secondsOfDay % 10 == 0) ?
		    addSensor(iterElevation.next().value, iterAzimuth.next().value, iterRange.next().value) : null;
		secondsOfDay++;
});
