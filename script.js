  /* ============ Anime.js — hero text stagger reveal ============ */
  try {
    const heroTitle = document.getElementById("heroTitle")
    const originalHTML = heroTitle.innerHTML
    heroTitle.innerHTML = originalHTML.replace(/(\S+)/g, "<span class='word'>$1</span> ")
    anime({
      targets: "#heroTitle .word",
      opacity: [0, 1],
      translateY: [24, 0],
      easing: "easeOutExpo",
      duration: 900,
      delay: anime.stagger(60)
    })
  } catch(e) { console.warn("Hero stagger skipped:", e) }

  /* ============ Anime.js — pricing card entrance ============ */
  try {
    anime({
      targets: ".price-card",
      opacity: [0, 1],
      translateY: [40, 0],
      easing: "easeOutCubic",
      duration: 700,
      delay: anime.stagger(140, { start: 500 })
    })
  } catch(e) { console.warn("Pricing animation skipped:", e) }

  /* ============ Anime.js — process timeline stagger (on scroll) ============ */
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        try {
          anime({
            targets: "#process .process-step",
            opacity: [0, 1],
            translateX: [-30, 0],
            easing: "easeOutCubic",
            duration: 600,
            delay: anime.stagger(120)
          })
        } catch(e) { console.warn("Process stagger skipped:", e) }
        processObserver.disconnect()
      }
    })
  }, { threshold: 0.3 })
  const processSection = document.getElementById("process")
  if (processSection) processObserver.observe(processSection)

  /* ============ Reveal-on-scroll (non-anime sections) ============ */
  const revealEls = document.querySelectorAll(".reveal")
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in")
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  revealEls.forEach(el => revealObserver.observe(el))

  /* ============ Anime.js — animated stat counters ============ */
  const counters = document.querySelectorAll("[data-count]")
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const target = parseInt(el.dataset.count)
        try {
          anime({
            targets: el,
            innerHTML: [0, target],
            round: 1,
            easing: "easeOutExpo",
            duration: 1400
          })
        } catch(e) {
          el.textContent = target
        }
        counterObserver.unobserve(el)
      }
    })
  }, { threshold: 0.5 })
  counters.forEach(el => counterObserver.observe(el))

  /* ============ Three.js — gold particle field in hero, mouse parallax ============ */
  try {
    const canvas = document.getElementById("particleCanvas")
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 1, 1500)
    camera.position.z = 240

    function resizeCanvas() {
      const w = canvas.clientWidth, h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particleCount = 8000
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1400
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800
      positions[i * 3 + 2] = (Math.random() - 0.5) * 700
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({ color: 0xffd166, size: 1.6, transparent: true, opacity: 0.8 })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let mouseX = 0, mouseY = 0
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5)
      mouseY = (e.clientY / window.innerHeight - 0.5)
    })

    function animateParticles() {
      points.rotation.y += 0.0009
      points.rotation.x += 0.0002
      camera.position.x += (mouseX * 40 - camera.position.x) * 0.03
      camera.position.y += (-mouseY * 40 - camera.position.y) * 0.03
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
      requestAnimationFrame(animateParticles)
    }
    animateParticles()
  } catch(e) { console.warn("Three.js particle field skipped:", e) }

  /* ============ Vanta.js — NET effect, lazy-init on contact section visible ============ */
  try {
    let vantaLoaded = false
    const vantaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !vantaLoaded) {
          vantaLoaded = true
          VANTA.NET({
            el: "#vantaBg",
            THREE: THREE,
            color: 0xff5470,
            backgroundColor: 0x17161f,
            points: 9,
            maxDistance: 22,
            spacing: 18,
            showDots: false
          })
          vantaObserver.disconnect()
        }
      })
    }, { threshold: 0.2 })
    const vantaTarget = document.getElementById("vantaBg")
    if (vantaTarget) vantaObserver.observe(vantaTarget)
  } catch(e) { console.warn("Vanta.js skipped:", e) }

  /* ============ Vanilla-Tilt — parallax tilt + glare on cards ============ */
  try {
    VanillaTilt.init(document.querySelectorAll(".service-card, .price-card, .portfolio-card"), {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
      scale: 1.02
    })
  } catch(e) { console.warn("Vanilla-Tilt skipped:", e) }









  

  /* ============ Zdog — 4 spinning decorative icons ============ */
  try {
    function makeZdogIllustration(canvasId, buildFn) {
      const illo = new Zdog.Illustration({ element: "#" + canvasId, zoom: 1.3 })
      buildFn(illo)
      function animateZdog() {
        illo.rotate.y += 0.014
        illo.rotate.x += 0.006
        illo.updateRenderGraph()
        requestAnimationFrame(animateZdog)
      }
      animateZdog()
    }

    makeZdogIllustration("zdogDiamond", (illo) => {
      new Zdog.Shape({ addTo: illo, path: [{x:0,y:-30},{x:26,y:0},{x:0,y:30},{x:-26,y:0}], stroke: 12, color: "#ff5470", fill: true, closed: true })
    })
    makeZdogIllustration("zdogCube", (illo) => {
      new Zdog.Box({ addTo: illo, width: 40, height: 40, depth: 40, stroke: 2, color: "#ffd166", leftFace: "#e0ad3f", rightFace: "#c9962c", topFace: "#ffe08a", bottomFace: "#b8862a" })
    })
    makeZdogIllustration("zdogStar", (illo) => {
      const points = []
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? 30 : 13
        const angle = (Math.PI * i) / 5
        points.push({ x: r * Math.sin(angle), y: -r * Math.cos(angle) })
      }
      new Zdog.Shape({ addTo: illo, path: points, stroke: 8, color: "#a78bfa", fill: true, closed: true })
    })
    makeZdogIllustration("zdogRing", (illo) => {
      new Zdog.Ellipse({ addTo: illo, diameter: 46, stroke: 10, color: "#ff5470" })
    })
  } catch(e) { console.warn("Zdog icons skipped:", e) }

  

  /* ============ Contact form — placeholder submit handling ============ */
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault()
    document.getElementById("contactForm").style.display = "none"
    document.getElementById("thanksMsg").classList.add("show")
  })

document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const submitBtn = form.querySelector(".submit-btn")

    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    try {
        const response = await fetch("https://formspree.io/f/mbgrnqej", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        })

        if (response.ok) {
            form.style.display = "none"
            document.getElementById("thanksMsg").classList.add("show")
        } else {
            alert("Something went wrong. Please try again or contact me on WhatsApp.")
            submitBtn.textContent = "Send Project Brief →"
            submitBtn.disabled = false
        }
    } catch (error) {
        alert("Something went wrong. Please try again or contact me on WhatsApp.")
        submitBtn.textContent = "Send Project Brief →"
        submitBtn.disabled = false
    }
})