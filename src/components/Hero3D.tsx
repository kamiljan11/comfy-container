import { useEffect, useRef } from 'react'

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!canvasRef.current) return
    if (window.matchMedia('(max-width: 820px)').matches) return

    const canvas = canvasRef.current
    let animId = 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null
    let mouseX = 0
    let mouseY = 0
    let resizeCleanup: (() => void) | null = null
    let mounted = true

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    import('three').then((THREE) => {
      if (!mounted || !canvasRef.current) return

      const w = canvas.parentElement?.clientWidth || window.innerWidth
      const h = canvas.parentElement?.clientHeight || window.innerHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 1000)
      camera.position.set(0, 0, 30)

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      // ── Nodes ──
      const NODE_COUNT = 68
      const HUB_INDICES = new Set([3, 8, 14, 21, 29, 38, 47, 55])
      const CONNECT_DIST = 9
      const MAX_LINES = 500

      const positions: THREE.Vector3[] = []
      const velocities: THREE.Vector3[] = []

      for (let i = 0; i < NODE_COUNT; i++) {
        positions.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 46,
            (Math.random() - 0.5) * 28,
            (Math.random() - 0.5) * 20
          )
        )
        velocities.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.007,
            (Math.random() - 0.5) * 0.005,
            (Math.random() - 0.5) * 0.003
          )
        )
      }

      const nodeMeshes: THREE.Mesh[] = []
      for (let i = 0; i < NODE_COUNT; i++) {
        const isHub = HUB_INDICES.has(i)
        const geo = new THREE.SphereGeometry(isHub ? 0.24 : 0.1, 8, 8)
        const mat = new THREE.MeshBasicMaterial({
          color: isHub ? 0x1fc9aa : 0x1a9b84,
          transparent: true,
          opacity: isHub ? 0.88 : 0.5,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.copy(positions[i])
        scene.add(mesh)
        nodeMeshes.push(mesh)
      }

      // ── LineSegments with pre-allocated buffer ──
      const lineBuf = new Float32Array(MAX_LINES * 6)
      const lineGeo = new THREE.BufferGeometry()
      const posAttr = new THREE.BufferAttribute(lineBuf, 3)
      posAttr.setUsage(THREE.DynamicDrawUsage)
      lineGeo.setAttribute('position', posAttr)
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x1a9b84,
        transparent: true,
        opacity: 0.13,
      })
      const lineSegs = new THREE.LineSegments(lineGeo, lineMat)
      scene.add(lineSegs)

      let t = 0

      const tick = () => {
        if (!mounted) return
        animId = requestAnimationFrame(tick)
        t += 0.013

        // Update positions
        for (let i = 0; i < NODE_COUNT; i++) {
          positions[i].add(velocities[i])
          if (Math.abs(positions[i].x) > 23) velocities[i].x *= -1
          if (Math.abs(positions[i].y) > 14) velocities[i].y *= -1
          if (Math.abs(positions[i].z) > 10) velocities[i].z *= -1
          nodeMeshes[i].position.copy(positions[i])
          if (HUB_INDICES.has(i)) {
            const m = nodeMeshes[i].material as THREE.MeshBasicMaterial
            m.opacity = 0.6 + Math.sin(t + i * 0.7) * 0.28
          }
        }

        // Build connections
        let li = 0
        for (let a = 0; a < NODE_COUNT && li < MAX_LINES; a++) {
          for (let b = a + 1; b < NODE_COUNT && li < MAX_LINES; b++) {
            if (positions[a].distanceTo(positions[b]) < CONNECT_DIST) {
              lineBuf[li * 6 + 0] = positions[a].x
              lineBuf[li * 6 + 1] = positions[a].y
              lineBuf[li * 6 + 2] = positions[a].z
              lineBuf[li * 6 + 3] = positions[b].x
              lineBuf[li * 6 + 4] = positions[b].y
              lineBuf[li * 6 + 5] = positions[b].z
              li++
            }
          }
        }
        for (let k = li * 6; k < MAX_LINES * 6; k++) lineBuf[k] = 0
        posAttr.needsUpdate = true
        lineGeo.setDrawRange(0, li * 2)

        // Camera parallax
        camera.position.x += (mouseX * 6 - camera.position.x) * 0.03
        camera.position.y += (-mouseY * 3 - camera.position.y) * 0.03

        renderer.render(scene, camera)
      }

      tick()

      const onResize = () => {
        if (!canvasRef.current) return
        const cw = canvas.parentElement?.clientWidth || window.innerWidth
        const ch = canvas.parentElement?.clientHeight || window.innerHeight
        camera.aspect = cw / ch
        camera.updateProjectionMatrix()
        renderer.setSize(cw, ch)
      }
      window.addEventListener('resize', onResize)
      resizeCleanup = () => window.removeEventListener('resize', onResize)
    })

    return () => {
      mounted = false
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      resizeCleanup?.()
      if (renderer) {
        renderer.dispose()
        renderer = null
      }
    }
  }, [])

  return <canvas ref={canvasRef} id="hero-canvas" />
}
