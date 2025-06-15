import { Component } from '@angular/core';

declare let L: any; // Déclarez les bibliothèques externes comme Leaflet
declare let Autolinker: any;
declare let json_Repertoire_test_CICC_1: any;
@Component({
  selector: 'app-home-si',
  standalone: true,
  imports: [],
  templateUrl: './home-si.component.html',
  styleUrl: './home-si.component.scss'
})
export class HomeSiComponent {
  map: any;
  boundsGroup: any;

  constructor(){}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    
    this.map = L.map('map', {
      zoomControl: false,
      maxZoom: 28,
      minZoom: 1
    }).fitBounds([[4.257275312329097, 10.363337889640487], [6.311304280975231, 12.833868399589218]]);

    // const hash = new L.Hash(this.map);
    this.map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');

    const autolinker = new Autolinker({ truncate: { length: 30, location: 'smart' } });

    // Ajouter les couches et les contrôles
    this.addBaseLayers();
    this.addControls();
    this.addGeoJsonLayer(autolinker);
  }

  addBaseLayers(): void {
    const googleHybridLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      opacity: 1.0,
      attribution: '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
      minZoom: 1,
      maxZoom: 28
    });
    this.map.addLayer(googleHybridLayer);
  }

  addControls(): void {
    L.control.zoom({ position: 'topleft' }).addTo(this.map);
    L.control.locate({ locateOptions: { maxZoom: 19 } }).addTo(this.map);

    const measureControl = new L.Control.Measure({
      position: 'topleft',
      primaryLengthUnit: 'meters',
      secondaryLengthUnit: 'kilometers',
      primaryAreaUnit: 'sqmeters',
      secondaryAreaUnit: 'hectares'
    });
    measureControl.addTo(this.map);

    document.getElementsByClassName('leaflet-control-measure-toggle')[0].innerHTML = '';
    document.getElementsByClassName('leaflet-control-measure-toggle')[0].className += ' fas fa-ruler';
  }

  addGeoJsonLayer(autolinker: any): void {
    const style = {
      pane: 'pane_Repertoire_test_CICC_1',
      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      weight: 1.0,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(227,26,28,1.0)',
      interactive: true
    };

    const layer = L.geoJson(json_Repertoire_test_CICC_1, {
      style,
      onEachFeature: (feature: any, layer: any) => {
        const popupContent = this.generatePopupContent(feature, autolinker);
        layer.bindPopup(popupContent, { maxHeight: 400 });
      }
    });

    this.boundsGroup = new L.featureGroup([layer]);
    this.map.addLayer(layer);
  }

  generatePopupContent(feature: any, autolinker: any): string {
    return `
      <table>
        <tr><th scope="row">village</th><td>${feature.properties['village'] || ''}</td></tr>
        <tr><th scope="row">lieu_dit</th><td>${feature.properties['lieu_dit'] || ''}</td></tr>
        <tr><th scope="row">surface</th><td>${feature.properties['surface'] || ''}</td></tr>
      </table>
    `;
  }
}
