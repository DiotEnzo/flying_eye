import * as Cesium from "cesium";
import positiveX from "@/assets/images/skybox/00h+00.jpg";
import negativeX from "@/assets/images/skybox/12h+00.jpg";
import positiveY from "@/assets/images/skybox/06h+00.jpg";
import negativeY from "@/assets/images/skybox/18h+00.jpg";
import positiveZ from "@/assets/images/skybox/06h+90.jpg";
import negativeZ from "@/assets/images/skybox/06h-90.jpg";
import mapboxDark from "@/assets/images/mapbox/mapboxDark.jpg";
import mapBoxSatellite from "@/assets/images/mapbox/mapboxSatellite.png";
import openStreetMap from "@/assets/images/mapbox/openStreetMap.png";

export const createCesiumViewer = (container: HTMLElement): Cesium.Viewer => {
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    -35,
    11,
    40,
    86
  );
  Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
  const viewer = new Cesium.Viewer(
    container,
    createCesiumViewerConstructorOptions()
  );
  viewer.fullscreenButton.viewModel.fullscreenElement = container;
  const creditLogoContainer = container.querySelector(
    ".cesium-credit-logoContainer"
  );
  if (creditLogoContainer)
    (creditLogoContainer as HTMLElement).style.display = "none";
  return viewer;
};

export const createCesiumViewerConstructorOptions =
  (): Cesium.Viewer.ConstructorOptions => {
    return {
      animation: false,
      baseLayerPicker: true, // we will use our base layer
      terrainProviderViewModels: [],
      terrainProvider: undefined,
      fullscreenButton: true,
      vrButton: false, //no need of VR
      homeButton: true, // We'll make a custom button
      infoBox: false, //we'll make custom
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      scene3DOnly: true,
      imageryProviderViewModels: createProviderViewModels(),
      geocoder: false,

      skyBox: createSkyBox(),
    };
  };

export const createProviderViewModels = (): Cesium.ProviderViewModel[] => {
  const ellipsoid = Cesium.Ellipsoid.WGS84;
  const mapboxToken =
    "pk.eyJ1IjoiZXhvdHJhaWwiLCJhIjoiY2szcTNnZmFkMDkzbzNtcDhzMm0ydmJ5YyJ9.5so1MY_ou6yoPmLAzLchUg";

  return [
    new Cesium.ProviderViewModel({
      name: "Mapbox Dark",
      tooltip: "Mapbox Dark",
      iconUrl: mapboxDark,
      creationFunction: () => {
        return new Cesium.MapboxStyleImageryProvider({
          styleId: "dark-v10",
          accessToken: mapboxToken,
          ellipsoid: ellipsoid,
        });
      },
    }),

    new Cesium.ProviderViewModel({
      name: "Mapbox Satellite",
      tooltip: "Mapbox Satellite",
      iconUrl: mapBoxSatellite,
      creationFunction: () => {
        return new Cesium.MapboxImageryProvider({
          mapId: "mapbox.satellite",
          accessToken: mapboxToken,
          ellipsoid: ellipsoid,
        });
      },
    }),

    new Cesium.ProviderViewModel({
      name: "OSM Streets",
      tooltip: "OSM streets",
      iconUrl: openStreetMap,
      creationFunction: () =>
        new Cesium.OpenStreetMapImageryProvider({
          url: "https://a.tile.openstreetmap.org/",
          ellipsoid: ellipsoid,
          credit: "© OpenStreetMap contributors",
        }),
    }),
  ];
};

export const createSkyBox = (): Cesium.SkyBox => {
  return new Cesium.SkyBox({
    sources: {
      positiveX: positiveX,
      negativeX: negativeX,
      positiveY: positiveY,
      negativeY: negativeY,
      positiveZ: positiveZ,
      negativeZ: negativeZ,
    },
  });
};
