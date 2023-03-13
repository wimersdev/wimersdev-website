export const portfolioSlider = function portfolioSlider(slideWidth: number, slideHeight: number, slidesQuantity: number) {
    //Add a new scene
    const scene = new THREE.Scene();
    const canvas = document.querySelector('canvas.webgl');
  
    //Add material
    const material = new THREE.MeshBasicMaterial({
      color: 0xfff000,
      side: THREE.DoubleSide,
      map: null,
    }); //Add default material
  
    //Sizes (canvas sizing)
    const canvasHolder = document.getElementById('portfolio');
  
    //Sizes (canvas sizing)
    const sizes = {
      width: canvasHolder.offsetWidth,
      height: canvasHolder.offsetHeight,
    };
  
    const scaleValue = 0.1;
    const scaleSlider = (sizes.width / 100) * scaleValue;
    console.log(scaleSlider);
    let planeNum = 0;
  
    //Textures collection
    const textures = [
      'https://uploads-ssl.webflow.com/638c5c270787c73ff9df319f/63f7100a99fcabdaac351fbf_image17.jpeg',
      'https://uploads-ssl.webflow.com/63f7161399fcab2247359159/63f7163599fcab90403592d3_image5.jpeg',
      'https://uploads-ssl.webflow.com/63f54f92f7104f41b5892a2e/63f7117899fcab74ce35396c_image15.jpeg',
      'https://uploads-ssl.webflow.com/63f7161399fcab2247359159/63f7163599fcab56d13592d4_image17.jpeg',
      'https://uploads-ssl.webflow.com/63bd9ed296c312580728234d/63f710c099fcab33b1352c90_image2.jpeg',
      'https://uploads-ssl.webflow.com/63f7161399fcab2247359159/63f7163599fcab73233592d2_image14.jpeg',
      'https://uploads-ssl.webflow.com/63f7161399fcab2247359159/63f7163599fcab554a3592d0_image7.jpeg',
      'https://uploads-ssl.webflow.com/63f7161399fcab2247359159/63f7163599fcab983b3592d1_image19.jpeg',
      'https://uploads-ssl.webflow.com/638c5c270787c73ff9df319f/63f7100a99fcab59be351fc0_image7.jpeg',
      'https://uploads-ssl.webflow.com/638c5c270787c73ff9df319f/63f7100a99fcab8eeb351fc2_image3.jpeg',
      'https://uploads-ssl.webflow.com/638c5c270787c73ff9df319f/63f7100a99fcab4d94351fbe_image9.jpeg',
      'https://uploads-ssl.webflow.com/63f7161399fcab2247359159/63f7163599fcab56d13592d4_image17.jpeg',
    ];
  
    //Add a 4-sided slide
    let slidePosition = (slidesQuantity * slideWidth * -1 + slideWidth) / 2;
    const portfolioSlide = new THREE.Group();
    const porfolioHolder = new THREE.Group();
    porfolioHolder.scale.x = scaleSlider; //Set the scale values for meshGroup
    porfolioHolder.scale.y = scaleSlider;
    porfolioHolder.scale.z = scaleSlider;
    scene.add(porfolioHolder);
    for (let i = 0; i < slidesQuantity; i++) {
      portfolioSlide[i] = new THREE.Group();
      console.log(portfolioSlide[i]);
      portfolioSlide[i].position.x = slidePosition;
      add4slide(slideWidth, slideHeight, slidePosition, [i]);
      slidePosition = slidePosition + slideWidth;
      porfolioHolder.add(portfolioSlide[i]);
    }
  
    function add4slide(
      slideWidth: number,
      slideHeight: number,
      slidePosition: number,
      slideNumber: number
    ) {
      const slidePlane = new THREE.PlaneGeometry(slideWidth, slideHeight);
      const planeMesh = new THREE.Mesh(slidePlane, material);
      scene.add(portfolioSlide[slideNumber]);
      let planeRotation = 0;
      const texture = new THREE.TextureLoader().load();
      const planesArrayZ = [slideHeight / 2, 0, (slideHeight / 2) * -1, 0];
      const planesArrayY = [0, slideHeight / 2, 0, (slideHeight / 2) * -1];
      const planesRotationZ = [0, Math.PI, 0, Math.PI];
      for (let i = 0; i < 4; i++) {
        texture[planeNum] = new THREE.TextureLoader().load(textures[planeNum]);
        material[planeNum] = new THREE.MeshBasicMaterial({
          map: texture[planeNum],
          side: THREE.DoubleSide,
        });
        slidePlane[i] = new THREE.PlaneGeometry(slideWidth, slideHeight);
        planeMesh[i] = new THREE.Mesh(slidePlane[i], material[planeNum]);
        planeMesh[i].position.set(0, planesArrayY[i], planesArrayZ[i]);
        planeMesh[i].rotation.x = planeRotation;
        planeMesh[i].rotation.z = planesRotationZ[i];
        planeRotation = planeRotation + Math.PI / 2;
        portfolioSlide[slideNumber].add(planeMesh[i]);
        planeNum = planeNum + 1;
      }
    }
  
    //Camera
    const camera = new THREE.PerspectiveCamera(32, sizes.width / sizes.height); //Add a new camera with canvas sized field of view
    camera.position.z = 5; //Make camera not centered in axis 0
    scene.add(camera); //Add Camera to Scene
  
    //Renderer
    const renderer = new THREE.WebGLRenderer({
      //Create renderer
      canvas: canvas,
      alpha: true,
    });
  
    renderer.setSize(sizes.width, sizes.height); //Set size for renderer
  
    const controls = new OrbitControls(camera, canvas); //Add Orbit Camera
    controls.enabled = false;
  
    //When window resizing
    window.addEventListener('resize', () => {
      // Update sizes
      //Sizes (canvas sizing)
      const sizes = {
        width: canvasHolder.offsetWidth,
        height: canvasHolder.offsetHeight,
      };
  
      porfolioHolder.scale.x = scaleSlider; //Set the scale values for meshGroup
      porfolioHolder.scale.y = scaleSlider;
      porfolioHolder.scale.z = scaleSlider;
  
      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
  
      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
    });
  
    //Slides change
    //Animate
  
    const animAngle = Math.PI / 2;
    let currentSlide = 0;
  
    function slideNext() {
      currentSlide = currentSlide + 1;
      for (let i = 0; i < slidesQuantity; i++) {
        console.log(currentSlide);
        gsap.to(portfolioSlide[i].rotation, {
          duration: 1,
          delay: [i] / 10,
          x: animAngle * currentSlide,
        });
      }
    }
  
    function slidePrev() {
      currentSlide = currentSlide - 1;
      for (let i = 0; i < slidesQuantity; i++) {
        console.log(currentSlide);
        gsap.to(portfolioSlide[i].rotation, {
          duration: 1,
          delay: [i] / 10,
          x: animAngle * currentSlide,
        });
      }
    }
  
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
  
    nextButton.addEventListener('click', slideNext);
    prevButton.addEventListener('click', slidePrev);
  
    const tick = () =>
      //Function allows to refresh screen every frame
      {
        // Render
        renderer.render(scene, camera);
  
        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };
  
    tick();
  }