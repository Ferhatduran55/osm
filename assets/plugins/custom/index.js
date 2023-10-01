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
        }
    }
    

    const toolsButtonOnClick = function (e) {
        let tools = $('#tools .btn[data-tool]');
        const isSelected = e.target.dataset.selected === 'true';
        tools.attr('data-selected', 'false');
        $(`[id$="Radius"],[for$="Radius"]`).hide();
        if (!isSelected) {
            if (e.target.dataset.controls) {
                $(`#${e.target.dataset.controls},[for=${e.target.dataset.controls}]`).show();
            }
        }
        e.target.dataset.selected = isSelected ? 'false' : 'true';
    }

    const dom = {
        options: {
            tagname: 'div',
            class: 'custom-leaflet-control',
            id: 'options',
            children: [
                {
                    tagname: 'a',
                    class: 'custom-leaflet-control-toggle',
                    href: '#',
                    title: 'Options',
                    role: 'button',
                },
                {
                    tagname: 'section',
                    class: 'custom-leaflet-control-list',
                    children: [
                        {
                            tagname: 'div',
                            class: 'custom-leaflet-control-base rules',
                            children: [
                                {
                                    tagname: 'label',
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
                                    tagname: 'label',
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
                                    tagname: 'label',
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
                }
            ],
            ariaHasPopup: 'true'
        },
        actions: {
            tagname: 'div', 
            class: 'custom-leaflet-control',
            id: 'actions',
            children: [
                {
                    tagname: 'a',
                    class: 'custom-leaflet-control-toggle',
                    href: '#',
                    title: 'Actions',
                    role: 'button',
                },
                {
                    tagname: 'section',
                    class: 'custom-leaflet-control-list',
                    children: [
                        {
                            tagname: 'div',
                            class: 'custom-leaflet-control-base',
                            id: 'tools',
                            children: [
                                {
                                    tagname: 'label',
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
                                    tagname: 'label',
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
                                    tagname: 'label',
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
                                    tagname: 'label',
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
                                    tagname: 'label',
                                    class: 'btn-group',
                                    children: [
                                        {
                                            tagname: 'button',
                                            class: 'btn', 
                                            dataset: {
                                                tool: 'circle', 
                                                selected: 'false',
                                                controls: 'circleRadius'
                                            },
                                            text: 'Circle',
                                            onclick: toolsButtonOnClick
                                        },
                                        {
                                            tagname: 'label',
                                            for: 'circleRadius',
                                            text: 'Circle Radius',
                                            style: 'display:none;'
                                        },
                                        {
                                            tagname: 'input',
                                            type: 'number',
                                            id: 'circleRadius',
                                            name: 'circleRadius',
                                            value: '200',
                                            min: '0',
                                            step: '50',
                                            style: 'display:none;'
                                        }
                                    ]
                                },
                                {
                                    tagname: 'label',
                                    class: 'btn-group',
                                    children: [
                                        {
                                            tagname: 'button',
                                            class: 'btn',
                                            dataset: {
                                                tool: 'circleMarker',
                                                selected: 'false',
                                                controls: 'circleMarkerRadius'
                                            },
                                            text: 'Circle Marker',
                                            onclick: toolsButtonOnClick
                                        },
                                        {
                                            tagname: 'label',
                                            for: 'circleMarkerRadius',
                                            text: 'Circle Marker Radius',
                                            style: 'display:none;'
                                        },
                                        {
                                            tagname: 'input',
                                            type: 'number',
                                            id: 'circleMarkerRadius',
                                            name: 'circleMarkerRadius',
                                            value: '10',
                                            min: '0',
                                            step: '10',
                                            style: 'display:none;'
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ],
            ariaHasPopup: 'true'
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
                if (attr === 'ariaHasPopup') {
                    element.setAttribute('aria-haspopup', attributes[attr]);
                    continue;
                }
                if (attr === 'ariaExpanded') {
                    element.setAttribute('aria-expanded', attributes[attr]);
                    continue;
                }
                if (attr === 'ariaControls') {
                    element.setAttribute('aria-controls', attributes[attr]);
                    continue;
                }
                if (attr === 'ariaLabel') {
                    element.setAttribute('aria-label', attributes[attr]);
                    continue;
                }
                if (attr === 'ariaDescribedBy') {
                    element.setAttribute('aria-describedby', attributes[attr]);
                    continue;
                }
                if (attr === 'ariaLabelledBy') {
                    element.setAttribute('aria-labelledby', attributes[attr]);
                    continue;
                }
                if (attr === 'ariaHidden') {
                    element.setAttribute('aria-hidden', attributes[attr]);
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
                baseLayers[(layer.name || key)] = tile;
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
    const domUtil = L.DomUtil;

    const layerControl = control.layers(baseLayers).addTo(map);
    const scaleControl = control.scale().addTo(map);
    renderLayer();

    const controls = {};
    controls.options = domUtil.get('options');
    controls.actions = domUtil.get('actions');

    for (let key in controls) {
        let custom = controls[key];
        custom = control({ position: 'topright' });
        custom.onAdd = function(map) {
            this._div = controls[key];
            return this._div;
        }
        custom.addTo(map);
    }

    let drawing = false;
    let data = {
        polyline: [],
        polygon: [],
        rectangle: [],
    };

    const onMapClick = function (e) {
        if (e.originalEvent.target.id !== 'map') return; 
        let item = $('#tools .btn[data-selected="true"]');
        if (item.length === 0) return;
        if (!drawing) drawing = true;
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
                    obj = L.marker(e.latlng).addTo(map);
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

    $('.custom-leaflet-control').on('mouseenter', function (e) {
        $(this).addClass('custom-leaflet-control-expanded');
    }).on('mouseleave', function (e) {
        $(this).removeClass('custom-leaflet-control-expanded');
    });

    map.on('click', onMapClick);

    const exports = {}
    exports.controls = {}
    exports.controls.custom = controls
    exports.controls.layer = layerControl
    exports.controls.scale = scaleControl
    exports.map = map
    exports.layers = layers
    exports.baseLayers = baseLayers
    exports.data = data

    window.app = exports;
});

