$(() => {
    const maxBounds = L.latLngBounds(
        L.latLng(-90, -180),
        L.latLng(90, 180)
    );

    const layers = {
        osm: {
            name: 'OpenStreetMap',
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            options: {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            },
            rendered: false
        },
        satellite: {
            name: 'Google Satellite',
            url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            options: {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                attribution: '© <a href="https://maps.google.com">Google Maps</a>',
            },
            rendered: false
        },
        topographic: {
            name: 'OpenTopoMap',
            url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            options: {
                maxZoom: 17,
                attribution: '© <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
            },
            rendered: false
        },
        terrain: {///11/357/799@2x.png
            name: 'Stamen Terrain',
            url: 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r},{ext}',
            options: {
                attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors',
                maxZoom: 20,
                ext: 'png'
            },
            rendered: false
        },
        watercolor: {
            name: 'Stamen Watercolor',
            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}',
            options: {
                attribution: '© <a href="https://maps.stamen.com/#watercolor/12/37.7706/-122.3782">Stamen Maps</a>',
                subdomains: 'abcd',
                minZoom: 1,
                maxZoom: 16,
                ext: 'jpg'
            },
            rendered: false
        },
        toner: {
            name: 'Stamen Toner',
            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}',
            options: {
                attribution: '© <a href="https://maps.stamen.com/#toner/12/37.7706/-122.3782">Stamen Maps</a>',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 20,
                ext: 'png'
            },
            rendered: false
        },
        tonerBackground: {
            name: 'Stamen Toner Background',
            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}',
            options: {
                attribution: '© <a href="https://maps.stamen.com/#toner/12/37.7706/-122.3782">Stamen Maps</a>',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 20,
                ext: 'png'
            },
            rendered: false
        },
        tonerHybrid: {
            name: 'Stamen Toner Hybrid',
            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.{ext}',
            options: {
                attribution: '© <a href="https://maps.stamen.com/#toner/12/37.7706/-122.3782">Stamen Maps</a>',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 20,
                ext: 'png'
            },
            rendered: false
        },
        tonerLines: {
            name: 'Stamen Toner Lines',
            url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}',
            options: {
                attribution: '© <a href="https://maps.stamen.com/#toner/12/37.7706/-122.3782">Stamen Maps</a>', subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 20,
                ext: 'png'
            },
            rendered: false
        },
        tonerLabels: {
            name: 'Stamen Toner Labels',
            url:'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}',
            options: {
                attribution: '© <a href="https://maps.stamen.com/#toner/12/37.7706/-122.3782">Stamen Maps</a>',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 20,
                ext: 'png'
            },
            rendered: false
        },
    }
    

    const toolsButtonOnClick = function (e) {
        let tools = $('#tools .btn[data-tool]');
        const isSelected = e.target.dataset.selected === 'true';
        tools.attr('data-selected', 'false');
        e.target.dataset.selected = isSelected ? 'false' : 'true';
    }

    const dom = {
        options: {
            tagname: 'div',
            id: 'options',
            class: 'options',
            children: [
                {
                    tagname: 'div',
                    class: 'rules',
                    children: [
                        {
                            tagname: 'div',
                            class: 'rule-group',
                            children: [
                                {
                                    tagname: 'label',
                                    for: 'onClickOpenPopup',
                                    text: 'Open Popup on click'
                                },
                                {
                                    tagname: 'input',
                                    type: 'checkbox',
                                    id: 'onClickOpenPopup',
                                    name: 'rules',
                                    checked: 'checked'
                                }
                            ]
                        },
                        {
                            tagname: 'div',
                            class: 'rule-group',
                            children: [
                                {
                                    tagname: 'label',
                                    for: 'onClickOpenTooltip',
                                    text: 'Open Tooltip on click'
                                },
                                {
                                    tagname: 'input',
                                    type: 'checkbox',
                                    id: 'onClickOpenTooltip',
                                    name: 'rules',
                                    checked: 'checked'
                                }
                            ]
                        },
                        {
                            tagname: 'div',
                            class: 'rule-group',
                            children: [
                                {
                                    tagname: 'label',
                                    for: 'fitToScreen',
                                    text: 'Fit to screen'
                                },
                                {
                                    tagname: 'input',
                                    type: 'checkbox',
                                    id: 'fitToScreen',
                                    name: 'rules',
                                    checked: 'checked'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        actions: {
            tagname: 'div', 
            id: 'actions', 
            class: 'actions',
            children: [
                {
                    tagname: 'div',
                    id: 'tools',
                    children: [
                        {
                            tagname: 'div',
                            class: 'btn-group',
                            children: [
                                {
                                    tagname: 'button',
                                    class: 'btn', 
                                    dataset: {
                                        tool: 'polyline', 
                                        selected: 'false'
                                    },
                                    text: 'Polyline',
                                    onclick: toolsButtonOnClick
                                }
                            ]
                        },
                        {
                            tagname: 'div',
                            class: 'btn-group',
                            children: [
                                {
                                    tagname: 'button',
                                    class: 'btn', 
                                    dataset: {
                                        tool: 'polygon', 
                                        selected: 'false'
                                    },
                                    text: 'Polygon',
                                    onclick: toolsButtonOnClick
                                }
                            ]
                        },
                        {
                            tagname: 'div',
                            class: 'btn-group',
                            children: [
                                {
                                    tagname: 'button',
                                    class: 'btn', 
                                    dataset: {
                                        tool: 'rectangle', 
                                        selected: 'false'
                                    },
                                    text: 'Rectangle',
                                    onclick: toolsButtonOnClick
                                }
                            ]
                        },
                        {
                            tagname: 'div',
                            class: 'btn-group',
                            children: [
                                {
                                    tagname: 'button',
                                    class: 'btn', 
                                    dataset: {
                                        tool: 'marker', 
                                        selected: 'false'
                                    },
                                    text: 'Marker',
                                    onclick: toolsButtonOnClick
                                }
                            ]
                        },
                        {
                            tagname: 'div',
                            class: 'btn-group',
                            children: [
                                {
                                    tagname: 'button',
                                    class: 'btn', 
                                    dataset: {
                                        tool: 'circle', 
                                        selected: 'false'
                                    },
                                    text: 'Circle',
                                    onclick: toolsButtonOnClick
                                },
                                {
                                    tagname: 'label',
                                    for: 'circleRadius',
                                    text: 'Circle Radius'
                                },
                                {
                                    tagname: 'input',
                                    type: 'number',
                                    id: 'circleRadius',
                                    name: 'circleRadius',
                                    value: '200',
                                    min: '0',
                                    step: '50'
                                }
                            ]
                        },
                        {
                            tagname: 'div',
                            class: 'btn-group',
                            children: [
                                {
                                    tagname: 'button',
                                    class: 'btn',
                                    dataset: {
                                        tool: 'circleMarker',
                                        selected: 'false'
                                    },
                                    text: 'Circle Marker',
                                    onclick: toolsButtonOnClick
                                },
                                {
                                    tagname: 'label',
                                    for: 'circleMarkerRadius',
                                    text: 'Circle Marker Radius'
                                },
                                {
                                    tagname: 'input',
                                    type: 'number',
                                    id: 'circleMarkerRadius',
                                    name: 'circleMarkerRadius',
                                    value: '10',
                                    min: '0',
                                    step: '10'
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    }

    

    function createElements(parent, elements) {
        function applyAttributes(element, attributes) {
          for (let attr in attributes) {
            if (attr === 'tagname') continue;
            if (attr === 'children') {
              createElements(element, attributes[attr]);
              continue;
            }
            if (attr === 'dataset') {
              for (let data in attributes[attr]) {
                element.dataset[data] = attributes[attr][data];
              }
              continue;
            }
            if (attr === 'text') {
              element.innerHTML = attributes[attr];
              continue;
            }
            if (attr === 'class') {
              element.className = attributes[attr];
              continue;
            }
            if (attr === 'style') {
              element.style = attributes[attr];
              continue;
            }
            if (attr === 'for') {
              element.htmlFor = attributes[attr];
              continue;
            }
            if (attr === 'onclick') {
              element.onclick = attributes[attr];
              continue;
            }
            if (attr === 'checked') {
              element.checked = attributes[attr];
              continue;
            }
            element[attr] = attributes[attr];
          }
        }
      
        if (elements.tagname) {
          let el = document.createElement(elements.tagname);
          applyAttributes(el, elements);
          parent.appendChild(el);
        } else {
          for (let key in elements) {
            let element = elements[key];
            let el = document.createElement(element.tagname);
            applyAttributes(el, element);
            parent.appendChild(el);
          }
        }
      }

    createElements(document.querySelector('app interface'), dom);

    const baseLayers = {};

    function renderLayer(render = null) {
        if (render !== null) {
            if (!layers[render].rendered) {
                let layer = layers[render];
                let tile = L.tileLayer(layer.url, layer.options);
                baseLayers[(layer.name || key)] = tile;
                console.log(`Auto-Rendered layer: ${layer.name || key}`);
                layer.rendered = true;
            }
            return;
        }
        console.info('Rendering layers...');
        for (let key in layers) {
            if (!layers[key].rendered) {
                let layer = layers[key];
                let tile = L.tileLayer(layer.url, layer.options);
                layerControl.addBaseLayer(tile, (layer.name || key));
                console.log(`Rendered layer: ${layer.name || key}`);
                layer.rendered = true;
            }
        }
        console.info('Rendering finished!');
    }

    renderLayer('osm');

    const map = L.map('map', {
        maxBounds: maxBounds,
        maxBoundsViscosity: 1.0,
        layers: [baseLayers['OpenStreetMap']]
    }).setView([33.72434, 11.923562],3);

    const popup = L.popup();
    const tooltip = L.tooltip();
    const control = L.control;

    const layerControl = control.layers(baseLayers).addTo(map);
    const scaleControl = control.scale().addTo(map);
    renderLayer();

    let drawing = false;
    let data = {
        polyline: [],
        polygon: [],
        rectangle: [],
    };

    const onMapClick = function (e) {
        let item = $('#tools .btn[data-selected="true"]');
        if (item.length === 0) {
            popup.setLatLng(e.latlng)
                .setContent(`Please select any tool button for editing the map.`)
                .openOn(map);
            return;
        }
        if (!drawing) {
            drawing = true;
        }
        if (drawing) {
            let obj = null;
            switch (item.attr('data-tool')) {
                case 'polyline':
                    data.polyline.push(e.latlng);
                    break;
                case 'polygon':
                    data.polygon.push(e.latlng);
                    break;
                case 'rectangle':
                    data.rectangle.push(e.latlng);
                    break;
                case 'marker':
                    obj = L.marker(e.latlng).addTo(map).getBounds();
                    break;
                case 'circle':
                    obj = L.circle(e.latlng, {radius: $('#circleRadius').val()}).addTo(map).bindPopup(`Hello world`);
                    break;
                case 'circleMarker':
                    obj = L.circleMarker(e.latlng, {radius: $('#circleMarkerRadius').val()}).addTo(map).bindPopup(`Hello world`);
                    break;
            }
            if(obj !== null) {
                if ($('#fitToScreen').prop('checked')) {
                    map.fitBounds(obj.getBounds());
                }
            }
            if ($('#onClickOpenPopup').prop('checked')) {
                popup.setLatLng(e.latlng)
                    .setContent(`${e.latlng.toString()}.`)
                    .openOn(map);
            }
            if ($('#onClickOpenTooltip').prop('checked')) {
                tooltip.setLatLng(e.latlng)
                    .setContent(`Hello world!<br />This is a nice tooltip.`)
                    .addTo(map);
            }
            return;
        }
    }

    $(document).keydown(function (event) {
        if (event.code === 'Enter') {
            let item = $('.btn[data-selected="true"]');
            if (item.length === 0) {
                alert(`Please select any tool button for editing the map.`);
                return;
            }
            if (drawing) {
                let obj = null;
                switch (item.attr('data-tool')) {
                    case 'polyline':
                        obj = L.polyline(data.polyline).addTo(map);
                        data.polyline = [];
                        break;
                    case 'polygon':
                        obj = L.polygon(data.polygon).addTo(map);
                        data.polygon = [];
                        break;
                    case 'rectangle':
                        obj = L.rectangle(data.rectangle).addTo(map);
                        data.rectangle = [];
                        break;
                }
                if (obj !== null) {
                    obj.addTo(map);
                    if ($('#fitToScreen').prop('checked')) {
                        map.fitBounds(obj.getBounds());
                    }
                }
            }
        }
    });

    map.on('click', onMapClick);
});

