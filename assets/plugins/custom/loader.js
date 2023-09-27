class loader {
    constructor(manifest) {
        this.lib = createjs;
        this.loader = document.querySelector('app loader');
        this.manifest = manifest;
        this.handlers = [
            {
                event: "loadstart",
                handle: (event) => {
                    console.log("load start")
                    console.log(event)
                }
            },
            {
                event: "filestart",
                handle: (event) => {
                    console.log("file start")
                    console.log(event)
                }
            },
            {
                event: "fileprogress",
                handle: (event) => {
                    console.log(`file progress: ${event.progress}`)
                    console.log(event)
                }
            },
            {
                event: "fileload",
                handle: (event) => {
                    console.log("file loaded")
                    console.log(event)
                    let item = event.item // A reference to the item that was passed in to the LoadQueue
                    let type = item.type

                    // Add any images to the page body.
                    if (type == this.lib.Types.CSS) {
                        document.body.appendChild(event.result)
                    }
                    if (item.id === 'jqueryScript') {
                        $.holdReady( true )
                    }
                }
            },
            {
                event: "fileerror",
                handle: (event) => {
                    console.log("error loading file");
                    console.log(event);
                }
            },
            {
                event: "progress",
                handle: (event) => {
                    document.getElementsByTagName("progress")[0].value = event.loaded
                    console.log(`progress: ${event.progress}`)
                    console.log(event)
                }
            },
            {
                event: "error",
                handle: (event) => {
                    console.log("error loading")
                    console.log(event)
                }
            },
            {
                event: "complete",
                handle: (event) => {
                    console.info(`Components Loaded!`)
                    console.log("queue complete")
                    console.log(event)
                    $.holdReady( false )
                    $(this.loader).fadeOut(1000)
                    setTimeout(()=>{this.pageLoader(false);},1000)
                },
            }
        ];
    }
    show() {
        this.loader.style.display = ''
    }
    hide() {
        this.loader.style.display = 'none'
    }
    loadQueue() {
        if (window.queue) return
        this.queue = window.queue = new this.lib.LoadQueue(true, null, true)

        this.queue.loadManifest(this.manifest, true)
        this.loadHandlers()
        this.queue.load()

        return this.queue
    }
    loadManifest(manifest) {
        this.lib.loadManifest(manifest)
    }
    loadHandlers() {
        this.handlers.forEach((handler) => {
            this.handle(handler.event, handler.handle)
        })
    }
    handle(name, event) {
        this.queue.on(name, event)
    }
    pageLoader(render = true) {
        if (render) {
            this.loadQueue()
            this.show()
            this.loader.innerHTML = `<progress value="0" max="1"></progress>`
            console.info('Loading plugins...')
        } else {
            this.loader.innerHTML = ''
            console.info('Loading finished!')
        }
    }
}
(async () => {
    try {
        const response = await fetch('json/manifest.json');
        const manifest = await response.json();

        new loader(manifest).pageLoader();
    } catch (error) {
        console.error(error);
    }
})()