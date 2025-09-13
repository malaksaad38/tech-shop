// Globe_Pins.tsx
"use client"

import * as React from "react"
import {useEffect, useRef, useState} from "react"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"
import {createRoot} from "react-dom/client"

const MAX_DPR = 1.5
const FPS_CAP = 50
const MAX_FILL_POINTS = 90000

let THREE: any
let GEO_CONTAINS: ((geo: any, point: [number, number]) => boolean) | null = null

export interface Pin {
  lon: number
  lat: number
  name?: string
  address?: string
  phone?: string
}

export interface Globe_PinsProps {
  autoRotateSpeed: number
  pointSize: number
  densityDeg: number
  zoom: boolean
  pins: Pin[]
  pointColor: string
  labelColor: string
  pinDotColor: string
  pinPanelBgColor: string
  pinPanelBgOpacity: number
  pinPanelBorderColor: string
  backOpacity: number
  fillColor: string
  fillOpacity: number
  labelFont: any
  labelFontSize: number
}

const DEFAULT_PROPS: Globe_PinsProps = {
  autoRotateSpeed: 0.03,
  pointSize: 0.006,
  densityDeg: 1,
  zoom: false,
  pins: [
    {
      lon: -118.2437,
      lat: 34.0522,
      name: "USA",
      address: "Los Angeles, Beverly Hills 55a",
      phone: "+1 213-555-0173",
    },
    {
      lon: -0.1278,
      lat: 51.5074,
      name: "United Kingdom",
      address: "London, Borton str. 88",
      phone: "+44 20 7946 0958",
    },
    {
      lon: 72.8,
      lat: 34,
      name: "Pakistan",
      address: "KPK, Peshawar.str. 88",
      phone: "+924579460958",
    }
    ,
  ],
  pointColor: "#7AE1FF",
  labelColor: "#E7F8FF",
  pinDotColor: "#7AE1FF",
  pinPanelBgColor: "#0C2A33",
  pinPanelBgOpacity: 0.75,
  pinPanelBorderColor: "#7AE1FF",
  backOpacity: 0.06,
  fillColor: "#7AE1FF",
  fillOpacity: 0.6,
  labelFont: {family: "Inter", style: "Regular"},
  labelFontSize: 12,
}

type Ring = Float32Array
type Polygon = Ring[]
const layerCache = new Map<number, { edge: Float32Array; fill: Float32Array }>()
let DOT_TEX: any, HALO_TEX: any
let LAND_POLYS: Polygon[] | null = null
let LAND_GEO_POLYS: any[] | null = null

function Preloader({progress}: { progress: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.35)",
        color: "#fff",
        zIndex: 10,
        fontSize: 10,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.2)",
          borderTopColor: "#fff",
          animation: "spin .8s linear infinite",
        }}
      />
      <div style={{marginTop: 8}}>Loading: {Math.round(progress)}%</div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export default function Globe(props: Partial<Globe_PinsProps>) {
  const cfg = {...DEFAULT_PROPS, ...props} as Globe_PinsProps
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const runningRef = useRef(false)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let disposed = false
    let cleanup: (() => void) | undefined
    const run = async () => {
      setLoading(true)
      setProgress(0)
      const container = containerRef.current
      if (!container) return
      while (container.firstChild)
        container.removeChild(container.firstChild)

      const width = container.clientWidth || 800,
        height = container.clientHeight || 600
      setProgress(10)
      if (!THREE) {
        const mod = await import("three")
        // three exports are named; assign the module namespace to THREE
        THREE = mod
      }
      const orbitMod = await import("three/examples/jsm/controls/OrbitControls")
      const {OrbitControls} = orbitMod

      setProgress(20)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        55,
        width / height,
        0.1,
        100
      )
      camera.position.set(0, 0, 3)

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
        premultipliedAlpha: true,
      })
      renderer.setPixelRatio(
        Math.min((window as any).devicePixelRatio || 1, MAX_DPR)
      )
      renderer.setSize(width, height)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.enablePan = false
      controls.enableZoom = !!cfg.zoom

      const globeGroup = new THREE.Group()
      scene.add(globeGroup)
      if (!DOT_TEX) DOT_TEX = makeCircleDotTexture(64)
      if (!HALO_TEX) HALO_TEX = makeHaloTexture()

      cfg.pins.forEach((p) =>
        addPin(
          globeGroup,
          p,
          HALO_TEX,
          null,
          cfg.labelColor,
          cfg.pinDotColor,
          cfg.pinPanelBgColor,
          cfg.pinPanelBgOpacity,
          cfg.pinPanelBorderColor,
          cfg.labelFont,
          cfg.labelFontSize
        )
      )

      setProgress(35)
      const {polys, geoPolys} = await getLand().catch(
        () => ({polys: null, geoPolys: null}) as any
      )
      if (!polys || !polys.length || !geoPolys)
        throw new Error("No land polygons")

      const edgeMat = makePointsMat(
        cfg.pointColor,
        cfg.pointSize,
        cfg.backOpacity,
        DOT_TEX
      )
      const fillMat = makePointsMat(
        cfg.fillColor,
        Math.max(0.75 * cfg.pointSize, 0.003),
        cfg.backOpacity,
        DOT_TEX,
        cfg.fillOpacity
      )

      let edgePos: Float32Array, fillPos: Float32Array
      const cached = layerCache.get(cfg.densityDeg)
      if (cached) {
        edgePos = cached.edge
        fillPos = cached.fill
        setProgress(65)
      } else {
        try {
          const edge = await buildEdgesInWorker(polys, cfg.densityDeg) // keep polys intact
          const fill = await buildFillWithD3(
            polys,
            geoPolys,
            cfg.densityDeg,
            (p) => setProgress(65 + Math.round(p * 0.3))
          )
          edgePos = edge
          fillPos = limitPoints(fill, MAX_FILL_POINTS)
          layerCache.set(cfg.densityDeg, {
            edge: edgePos,
            fill: fillPos,
          })
        } catch (e) {
          const {edge} = buildEdgesSync(polys, cfg.densityDeg)
          edgePos = edge
          fillPos = new Float32Array(0)
        }
      }

      const edgeGeo = new THREE.BufferGeometry()
      edgeGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(edgePos, 3)
      )
      const edgePts = new THREE.Points(edgeGeo, edgeMat)
      globeGroup.add(edgePts)

      const fillGeo = new THREE.BufferGeometry()
      fillGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(fillPos, 3)
      )
      const fillPts = new THREE.Points(fillGeo, fillMat)
      globeGroup.add(fillPts)

      const hasLabels = cfg.pins.some(
        (p) => p.name || p.address || p.phone
      )
      let labelRenderer: any = null
      if (hasLabels) {
        const css2d = await import("three/examples/jsm/renderers/CSS2DRenderer")
        const {CSS2DRenderer, CSS2DObject} = css2d as any
        labelRenderer = new (CSS2DRenderer as any)()
        labelRenderer.setSize(width, height)
        Object.assign(labelRenderer.domElement.style, {
          position: "absolute",
          top: "0",
          left: "0",
          pointerEvents: "none",
          background: "transparent",
        })
        container.appendChild(labelRenderer.domElement)
        globeGroup.traverse((o: any) => {
          if (o.isCSS2DObject) o.parent?.remove(o)
        })
        cfg.pins.forEach((p) =>
          addPin(
            globeGroup,
            p,
            HALO_TEX,
            CSS2DObject,
            cfg.labelColor,
            cfg.pinDotColor,
            cfg.pinPanelBgColor,
            cfg.pinPanelBgOpacity,
            cfg.pinPanelBorderColor,
            cfg.labelFont,
            cfg.labelFontSize
          )
        )
      }

      setProgress(100)
      setLoading(false)

      const clock = new THREE.Clock()
      const FRAME = 1 / FPS_CAP
      let acc = FRAME
      const renderOnce = () => {
        ;[edgePts.material, fillPts.material].forEach((mat: any) => {
          const shader = mat?.userData?.shader
          if (shader) {
            shader.uniforms.uCamPos.value.copy(camera.position)
            shader.uniforms.uBackOpacity.value = cfg.backOpacity
          }
        })
        controls.update()
        renderer.render(scene, camera)
        if (labelRenderer) labelRenderer.render(scene, camera)
      }
      const loop = () => {
        if (disposed || !runningRef.current) return
        const dt = clock.getDelta()
        acc += dt
        if (cfg.autoRotateSpeed > 0)
          globeGroup.rotation.y += cfg.autoRotateSpeed * dt
        if (!document.hidden && acc >= FRAME) {
          renderOnce()
          acc = 0
        }
        rafRef.current = requestAnimationFrame(loop)
      }
      const start = () => {
        if (runningRef.current) return
        runningRef.current = true
        acc = FRAME
        loop()
      }
      const stop = () => {
        runningRef.current = false
        cancelAnimationFrame(rafRef.current)
      }

      const onVis = () => (document.hidden ? stop() : start())
      document.addEventListener("visibilitychange", onVis)
      const io = new IntersectionObserver(
        (entries) => {
          const vis = entries[0]?.isIntersecting
          vis ? start() : stop()
        },
        {root: null, threshold: 0}
      )
      io.observe(container)

      renderOnce()
      start()

      const onResize = () => {
        const w = container.clientWidth || 800,
          h = container.clientHeight || 800
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setPixelRatio(
          Math.min((window as any).devicePixelRatio || 1, MAX_DPR)
        )
        renderer.setSize(w, h)
        if (labelRenderer) labelRenderer.setSize(w, h)
        acc = FRAME
        renderOnce()
      }
      window.addEventListener("resize", onResize)

      cleanup = () => {
        stop()
        window.removeEventListener("resize", onResize)
        document.removeEventListener("visibilitychange", onVis)
        io.disconnect()
        controls.dispose()
        disposeScene(scene)
        renderer.dispose()
        if (renderer.domElement.parentNode)
          renderer.domElement.parentNode.removeChild(
            renderer.domElement
          )
        if (labelRenderer?.domElement?.parentNode)
          labelRenderer.domElement.parentNode.removeChild(
            labelRenderer.domElement
          )
      }
    }

    run().catch((e) => {
      console.error(e)
      setLoading(false)
    })
    return () => {
      try {
        cleanup?.()
      } catch {
      }
    }
  }, [
    props.autoRotateSpeed,
    props.pointSize,
    props.densityDeg,
    props.zoom,
    props.pointColor,
    props.labelColor,
    props.pinDotColor,
    props.pinPanelBgColor,
    props.pinPanelBgOpacity,
    props.pinPanelBorderColor,
    props.backOpacity,
    props.fillColor,
    props.fillOpacity,
    JSON.stringify(props.pins),
    JSON.stringify(props.labelFont),
    props.labelFontSize,
  ])

  return (
    <div style={{width: "100%", height: "100%", position: "relative"}}>
      {loading && <Preloader progress={progress}/>}
      <div
        ref={containerRef}
        style={{width: "100%", height: "100%", position: "relative"}}
      />
    </div>
  )
}

/* ---------------- Geo ---------------- */

async function getLand(): Promise<{ polys: Polygon[]; geoPolys: any[] }> {
  if (LAND_POLYS && LAND_GEO_POLYS)
    return {polys: LAND_POLYS, geoPolys: LAND_GEO_POLYS}
  const urls = [
    "https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json",
    "https://unpkg.com/world-atlas@2/land-110m.json",
  ]
  let topo: any = null
  for (const u of urls) {
    try {
      const r = await fetch(u, {cache: "force-cache"})
      if (r.ok) {
        topo = await r.json()
        break
      }
    } catch {
    }
  }
  if (!topo) throw new Error("land-110m.json unavailable")
  const topoMod = await import("topojson-client")
  const {feature} = topoMod

  const land = feature(topo, topo.objects.land)

  const polys: Polygon[] = []
  const geoPolys: any[] = []
  ;(land.features || []).forEach((f: any) => {
    const g = f.geometry
    if (!g) return
    if (g.type === "Polygon") {
      polys.push(
        g.coordinates.map((ring: number[][], idx: number) =>
          toRing(ring, idx)
        )
      )
      geoPolys.push({type: "Polygon", coordinates: g.coordinates})
    } else if (g.type === "MultiPolygon") {
      g.coordinates.forEach((poly: number[][][]) => {
        polys.push(
          poly.map((ring: number[][], idx: number) =>
            toRing(ring, idx)
          )
        )
        geoPolys.push({type: "Polygon", coordinates: poly})
      })
    }
  })
  LAND_POLYS = polys
  LAND_GEO_POLYS = geoPolys
  return {polys, geoPolys}
}

function toRing(ring: number[][], idx: number): Ring {
  if (idx > 0) {
    // holes: no decimation
    const out = new Float32Array((ring.length + 1) * 2)
    let k = 0
    for (let i = 0; i < ring.length; i++) {
      const p = ring[i]
      out[k++] = p[0]
      out[k++] = p[1]
    }
    const last = ring[ring.length - 1]
    out[k++] = last[0]
    out[k++] = last[1]
    return out.subarray(0, k)
  }
  const L = ring.length,
    target = 3000,
    step = L > target ? Math.floor(L / target) : 1
  const out = new Float32Array(((Math.ceil(L / step) + 1) | 0) * 2)
  let k = 0
  for (let i = 0; i < L; i += step) {
    const p = ring[i]
    out[k++] = p[0]
    out[k++] = p[1]
  }
  const last = ring[L - 1]
  out[k++] = last[0]
  out[k++] = last[1]
  return out.subarray(0, k)
}

/* ---------------- Worker: EDGES only, no input transfer ---------------- */

function buildEdgesInWorker(
  polys: Polygon[],
  densityDeg: number
): Promise<Float32Array> {
  return new Promise((resolve, reject) => {
    // structured clone: copy inputs, preserve originals
    const payload = polys.map((poly) =>
      poly.map((ring) => new Float32Array(ring))
    ) // clone

    const src = `
            function wrapLon(lon){ return ((lon + 540) % 360) - 180; }
            function sampleEdgeFlat(ring, maxDegStep){
                var out = [];
                for (var i=0;i<ring.length-2;i+=2){
                    var lon1 = ring[i],   lat1 = ring[i+1];
                    var lon2 = ring[i+2], lat2 = ring[i+3];
                    var dLon = lon2 - lon1, lon2n = lon2;
                    if (Math.abs(dLon)>180){ lon2n += dLon>0?-360:360; dLon = lon2n - lon1; }
                    var dLat = lat2 - lat1;
                    var maxSpan = Math.max(Math.abs(dLon), Math.abs(dLat));
                    var steps = Math.max(1, Math.ceil(maxSpan / maxDegStep));
                    for (var s=0;s<=steps;s++){
                        var t = s/steps;
                        var lon = lon1 + dLon*t;
                        var lat = lat1 + dLat*t;
                        out.push(wrapLon(lon), lat);
                    }
                }
                return new Float32Array(out);
            }
            function lonLatToVec3(lon,lat,r){
                if (r === void 0) r = 1;
                var phi = (90 - lat) * Math.PI/180;
                var theta = (lon + 180) * Math.PI/180;
                return [
                    -r * Math.sin(phi) * Math.cos(theta),
                    r * Math.cos(phi),
                    r * Math.sin(phi) * Math.sin(theta)
                ];
            }
            onmessage = function(e){
                var densityDeg = e.data.densityDeg, polysIn = e.data.polysIn;
                var edgeOut = [];
                for (var p=0;p<polysIn.length;p++){
                    var poly = polysIn[p];
                    for (var r=0;r<poly.length;r++){
                        var ring = poly[r];
                        var sampled = sampleEdgeFlat(ring, Math.max(0.2, densityDeg));
                        for (var i=0;i<sampled.length;i+=2){
                            var v = lonLatToVec3(sampled[i], sampled[i+1], 1);
                            edgeOut.push(v[0],v[1],v[2]);
                        }
                    }
                }
                var arr = new Float32Array(edgeOut);
                postMessage({ ok:true, edge:arr }, [arr.buffer]);
            };
        `
    const blob = new Blob([src], {type: "application/javascript"})
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)

    worker.onmessage = (e: MessageEvent) => {
      URL.revokeObjectURL(url)
      worker.terminate()
      const msg = e.data as any
      if (msg && msg.ok) resolve(msg.edge as Float32Array)
      else reject(new Error("worker failed"))
    }
    worker.onerror = (err) => {
      URL.revokeObjectURL(url)
      worker.terminate()
      reject(err)
    }
    worker.postMessage({densityDeg, polysIn: payload})
  })
}

/* ---------------- Fill with d3-geo on main thread ---------------- */

async function buildFillWithD3(
  polys: Polygon[],
  geoPolys: any[],
  densityDeg: number,
  onProgress: (p: number) => void
): Promise<Float32Array> {
  if (!GEO_CONTAINS) {
    const d3 = await import("d3-geo")
    GEO_CONTAINS = (d3 as any).geoContains

  }
  const fillOut: number[] = []
  const baseCellBase = Math.max(0.6, densityDeg * 1.9)
  const total = polys.length
  for (let p = 0; p < polys.length; p++) {
    const poly = polys[p],
      geo = geoPolys[p]
    const outer = poly[0]
    if (!outer) continue
    const bbox = boundsOfRing(outer)
    const w = Math.max(0.001, bbox.maxLon - bbox.minLon),
      h = Math.max(0.001, bbox.maxLat - bbox.minLat)
    if (w < 0.05 || h < 0.05) {
      onProgress(Math.round(((p + 1) / total) * 100))
      continue
    }
    const rng = makeRNG(131 * p + 7)
    for (let lat = bbox.minLat; lat <= bbox.maxLat; lat += baseCellBase) {
      const latWeight =
        0.6 + 0.4 * Math.cos((Math.abs(lat) * Math.PI) / 180)
      const stepLon = (baseCellBase / latWeight) * (0.85 + 0.3 * rng())
      const startLon = bbox.minLon + (rng() - 0.5) * baseCellBase
      for (let lon = startLon; lon <= bbox.maxLon; lon += stepLon) {
        let jlon = ((lon + (rng() - 0.5) * stepLon + 540) % 360) - 180
        let jlat = lat + (rng() - 0.5) * baseCellBase
        if (jlat > 90) jlat = 180 - jlat
        if (jlat < -90) jlat = -180 - jlat
        if (GEO_CONTAINS!(geo, [jlon, jlat])) {
          const v = lonLatToVec3(jlon, jlat, 1)
          fillOut.push(v.x, v.y, v.z)
        }
      }
    }
    await new Promise((r) => requestAnimationFrame(() => r(null)))
    onProgress(Math.round(((p + 1) / total) * 100))
  }
  return new Float32Array(fillOut)
}

/* ---------------- Helpers ---------------- */

function wrapLon(lon: number) {
  return ((lon + 540) % 360) - 180
}

function boundsOfRing(ring: Ring) {
  let minLon = 180,
    maxLon = -180,
    minLat = 90,
    maxLat = -90
  for (let i = 0; i < ring.length; i += 2) {
    const x = ring[i],
      y = ring[i + 1]
    if (x < minLon) minLon = x
    if (x > maxLon) maxLon = x
    if (y < minLat) minLat = y
    if (y > maxLat) maxLat = y
  }
  return {minLon, maxLon, minLat, maxLat}
}

function makeRNG(seed: number) {
  let s = (seed | 0) >>> 0 || 1
  return () => {
    s = (1664525 * s + 1013904223) >>> 0
    return s / 4294967296
  }
}

function lonLatToVec3(lon: number, lat: number, r = 1) {
  const phi = (THREE as any).MathUtils.degToRad(90 - lat)
  const theta = (THREE as any).MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

function fontFamilyFromControl(
  font: any,
  fallback = "system-ui,-apple-system,Segoe UI,Roboto,sans-serif"
) {
  if (!font) return fallback
  if (typeof font === "string") return font
  return font.family || font.fontFamily || fallback
}

// ...

function addPin(
  group: any,
  pin: Pin,
  tex: any,
  CSS2DObject: any | null,
  labelColor: string,
  pinDotColor: string,
  panelBgColor: string,
  panelBgOpacity: number,
  panelBorderColor: string,
  labelFont: any,
  labelFontSize: number
) {
  const pos = lonLatToVec3(pin.lon, pin.lat, 1)
  const g = new THREE.Group()
  ;(g as any).__pin = pin
  g.position.copy(pos)

  // --- Pin Dot ---
  g.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(0.012, 16, 16),
      new THREE.MeshBasicMaterial({color: new THREE.Color(pinDotColor)})
    )
  )

  // --- Halo Effect ---
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      color: new THREE.Color(pinDotColor),
      map: tex,
      transparent: true,
      blending: (THREE as any).AdditiveBlending,
      depthWrite: false,
    })
  )
  halo.scale.set(0.12, 0.12, 0.12)
  g.add(halo)

  // --- ShadCN Popover Label ---
  if ((pin.name || pin.address || pin.phone) && CSS2DObject) {
    const el = document.createElement("div")
    el.style.pointerEvents = "auto"
    el.style.cursor = "pointer"

    // React Component with hover+click support
    function Label() {
      const [open, setOpen] = useState(false)

      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              style={{
                color: labelColor,
                fontFamily: fontFamilyFromControl(labelFont),
                fontSize: labelFontSize,
              }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              {pin.name}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 w-64" side="top">
            {pin.address && <p className="mb-1 text-sm">{pin.address}</p>}
            {pin.phone && <p className="text-sm">{pin.phone}</p>}
          </PopoverContent>
        </Popover>
      )
    }

    const root = createRoot(el)
    root.render(<Label/>)

    const labelObj = new CSS2DObject(el)
    labelObj.position.set(0, 0.08, 0)
    g.add(labelObj)
  }

  group.add(g)
}

function makeHaloTexture(size = 128) {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const x = c.getContext("2d")!
  const g = x.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  )
  g.addColorStop(0, "rgba(255,255,255,0.25)")
  g.addColorStop(0.35, "rgba(255,255,255,0.1)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  x.fillStyle = g
  x.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  tex.minFilter = (THREE as any).LinearFilter
  tex.magFilter = (THREE as any).LinearFilter
  return tex
}

function makeCircleDotTexture(size = 64) {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const x = c.getContext("2d")!
  x.clearRect(0, 0, size, size)
  const r = size / 2
  const g = x.createRadialGradient(r, r, r * 0.82, r, r, r)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  x.fillStyle = g
  x.beginPath()
  x.arc(r, r, r - 0.5, 0, Math.PI * 2)
  x.closePath()
  x.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.minFilter = (THREE as any).LinearFilter
  tex.magFilter = (THREE as any).LinearFilter
  tex.anisotropy = 1
  tex.generateMipmaps = false
  return tex
}

function hexToRgba(input: string, a = 1) {
  try {
    if (/^rgba?\(/i.test(input))
      return input.replace(
        /rgba?\(([^)]+)\)/i,
        (_: any, body: string) => {
          const p = body.split(",").map((s) => parseFloat(s.trim()))
          const [r, g, b] = p
          return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`
        }
      )
    const m = input.replace("#", "")
    const s =
      m.length === 3
        ? m
          .split("")
          .map((x) => x + x)
          .join("")
        : m
    const n = parseInt(s, 16)
    const r = (n >> 16) & 255,
      g = (n >> 8) & 255,
      b = n & 255
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`
  } catch {
    return `rgba(255,255,255,${a})`
  }
}

function disposeScene(scene: any) {
  scene.traverse((o: any) => {
    if (o.geometry) o.geometry.dispose()
    if (o.material) {
      if (Array.isArray(o.material))
        o.material.forEach((m: any) => m.dispose())
      else o.material.dispose()
    }
  })
}

function makePointsMat(
  color: string,
  size: number,
  backOpacity: number,
  dotTexture: any,
  overrideOpacity?: number
) {
  const material = new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size,
    sizeAttenuation: true,
    depthWrite: false,
    transparent: true,
    map: dotTexture,
    alphaTest: 0.0,
    opacity: overrideOpacity ?? 1,
  })
  material.toneMapped = false
  ;(material as any).precision = "mediump"
  material.onBeforeCompile = (shader: any) => {
    shader.uniforms.uCamPos = {value: new THREE.Vector3()}
    shader.uniforms.uBackOpacity = {value: backOpacity}
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\n varying vec3 vWorldPos;\n uniform vec3 uCamPos;"
      )
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\n vWorldPos = (modelMatrix * vec4(transformed,1.0)).xyz;"
      )
      .replace(
        "#include <project_vertex>",
        `#include <project_vertex>
        float ndv = dot(normalize(uCamPos - vWorldPos), normalize(vWorldPos));
        float tv  = smoothstep(-0.5, 0.15, ndv);
        gl_PointSize *= mix(0.7, 1.0, tv);`
      )
    let fs = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\n varying vec3 vWorldPos; uniform vec3 uCamPos; uniform float uBackOpacity;"
      )
      .replace(
        "#include <output_fragment>",
        `{
        vec3 viewDir = normalize(uCamPos - vWorldPos);
        vec3 normalDir = normalize(vWorldPos);
        float nd = dot(viewDir, normalDir);
        float t  = smoothstep(-0.5, 0.15, nd);
        diffuseColor.a *= mix(uBackOpacity, 1.0, t);
      }
      #include <output_fragment>`
      )
      .replace(
        "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
        `
         vec3 viewDir = normalize(uCamPos - vWorldPos);
         vec3 normalDir = normalize(vWorldPos);
         float nd = dot(viewDir, normalDir);
         float t  = smoothstep(-0.5, 0.15, nd);
         diffuseColor.a *= mix(uBackOpacity, 1.0, t);
         gl_FragColor = vec4( outgoingLight, diffuseColor.a );`
      )
    shader.fragmentShader = fs
    ;(material as any).userData.shader = shader
  }
  return material
}

function limitPoints(src: Float32Array, cap: number) {
  const n = src.length / 3
  if (n <= cap) return src
  const idxs = new Uint32Array(n)
  for (let i = 0; i < n; i++) idxs[i] = i
  for (let i = n - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0
    const t = idxs[i]
    idxs[i] = idxs[j]
    idxs[j] = t
  }
  const out = new Float32Array(cap * 3)
  for (let k = 0; k < cap; k++) {
    const i = idxs[k] * 3
    out[k * 3 + 0] = src[i + 0]
    out[k * 3 + 1] = src[i + 1]
    out[k * 3 + 2] = src[i + 2]
  }
  return out
}