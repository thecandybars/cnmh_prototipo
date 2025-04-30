// endContentTop y endContentBottom permiten agregar contenido al final del videoScroll.
// Puede ser un video o una foto.
// type:video recibe un src de video y lo muestra
// type:photo recibe un src de una carpeta que contenga fotos en formato jpg o png y las muestra en un carrusel

export const siloeVideoscrollData = {
  A01: {
    src: "/lugares/siloe/video/A01.mp4",
    title: "Monumento a los Diablitos de Siloé",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Hacia el cementerio San Jose De Siloé",
            href: "/A02",
          },
        ],
      },
    ],
    map: {
      //https://www.google.com/maps/dir/Museo+POPULAR+DE+SILO%C3%89/Monumento+a+los+Diablitos+de+Silo%C3%A9/@3.4156506,-76.5598752,19.68z/data=!4m14!4m13!1m5!1m1!1s0x8e30a41a97fb7c93:0xd581f9cebc92d5ff!2m2!1d-76.5595526!2d3.4156271!1m5!1m1!1s0x8e30a500264a0f7b:0x33054b5fe7589258!2m2!1d-76.5595672!2d3.4158412!3e2?authuser=1&entry=tts&g_ep=EgoyMDI0MTIwOS4wKgBIAVAD
      points: [
        [3.415639782444439, -76.5595491937936],
        [3.4158092385595995, -76.5596076496516],
        [3.4159210218325806, -76.55956272265072],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A01.mp3",
    },
  },
  A02: {
    src: "/lugares/siloe/video/A02.mp4",
    title: "Hacia el cementerio San Jose De Siloé",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Cementerio San Jose De Siloé",
            href: "/A03",
          },
        ],
      },
    ],
    map: {
      //https://www.google.com/maps/dir/Monumento+a+los+Diablitos+de+Silo%C3%A9/3.4154692,-76.559442/3.4154793,-76.558937/@3.4154461,-76.5590266,21z/data=!4m10!4m9!1m5!1m1!1s0x8e30a500264a0f7b:0x33054b5fe7589258!2m2!1d-76.5595672!2d3.4158412!1m0!1m0!3e2?authuser=1&entry=tts&g_ep=EgoyMDI0MTIwOS4wKgBIAVAD
      points: [
        [3.415808, -76.55959],
        [3.4154692, -76.559442],
        [3.4154793, -76.558937],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A02.mp3",
    },
  },
  A03: {
    src: "/lugares/siloe/video/A03.mp4",
    title: "Cementerio San Jose De Siloé",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Mural del cementerio San Jose De Siloé",
            href: "/A04",
          },
        ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/3.4154672,-76.5588983/3.4151644,-76.5585132/@3.4154339,-76.5588865,280m/data=!3m1!1e3!4m2!4m1!3e2?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.4154606744482896, -76.55889320552254],
        [3.415002831279694, -76.55885565459644],
        [3.415018895955968, -76.55854988276963],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A03.mp3",
    },
  },
  A04: {
    src: "/lugares/siloe/video/A04.mp4",
    title: "Mural del cementerio San Jose De Siloé",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Por la Diagonal 51 hacia La Sorpresa",
            href: "/A05",
          },
        ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/3.4154524,-76.5588594/3.4157523,-76.5575424/@3.4157777,-76.5576269,19z/data=!4m2!4m1!3e2?authuser=1&entry=tts&g_ep=EgoyMDI0MTIwOS4wKgBIAVAD
      points: [
        [3.4154524, -76.5588594],
        [3.41555814957217, -76.55814322523632],
        [3.4157777, -76.5576269],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A04.mp3",
    },
  },
  A05: {
    src: "/lugares/siloe/video/A05.mp4",
    title: "Por la Diagonal 51 hacia La Sorpresa",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Puente de la glorieta Siloé visible",
            href: "/A07",
          },
        ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/3.415777,-76.5575073/3.416423,-76.5556297/@3.416228,-76.5568792,292m/data=!3m1!1e3!4m2!4m1!3e2?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.4158448353714355, -76.5574256668608],
        [3.416470887114691, -76.555983184628],
        [3.416444056334062, -76.5556024051566],
        [3.416444056334062, -76.5556024051566],
        [3.4163173881221165, -76.55503914044168],
        [3.4164700023269217, -76.55540392086664],
        [3.416836811807613, -76.5553502766865],
        [3.416933199677094, -76.55517861531004],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A05.mp3",
    },
  },
  A07: {
    src: "/lugares/siloe/video/A07.mp4",
    title: "Puente de la glorieta Siloé visible",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Galería de Siloé",
            href: "/A08",
          },
        ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/3.4164637,-76.5553434/3.416295,-76.5549455/3.4164839,-76.5547773/3.4169031,-76.5546863/3.4168763,-76.554462/@3.416754,-76.5545664,20.55z/data=!4m2!4m1!3e2?authuser=1&entry=tts&g_ep=EgoyMDI0MTIwOS4wKgBIAVAD
      points: [
        [3.4164637, -76.5553434],
        [3.416295, -76.5549455],
        [3.4164839, -76.5547773],
        [3.4169031, -76.5546863],
        [3.4168763, -76.554462],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A07.mp3",
    },
  },
  A08: {
    src: "/lugares/siloe/video/A08.mp4",
    title: "Galería de Siloé",
    speed: 800,
    type: "scroll",
    endContentTop: {
      type: "video",
      src: "/lugares/siloe/video/paradaA08.mp4",
      // title: "Titulo del video",
      description: "Descripcion del video",
    },
    endContentBottom: {
      type: "photo",
      src: "/lugares/siloe/fotos/paradaA08",
      images: [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg",
        "05.jpg",
        "06.jpg",
        "07.jpg",
        "08.jpg",
      ],
      title: "Titulo del video",
      description: "Descripcion del video",
    },
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Galeria de Siloé",
            href: "/A09",
          },
        ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/3.4168257,-76.5544677/3.4164865,-76.5544977/Galer%C3%ADa+siloe/@3.4161529,-76.5542247,140m/data=!3m1!1e3!4m10!4m9!1m0!1m0!1m5!1m1!1s0x8e30a58a792d876d:0x38cea09cac50c5f9!2m2!1d-76.5538715!2d3.4162586!3e2?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.4168257, -76.5544677],
        [3.4164865, -76.5544977],
        [3.4159200210709106, -76.55402135030211],
      ],
      zoom: 17,
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A08.mp3",
    },
  },
  A09: {
    src: "/lugares/siloe/video/A09.mp4",
    title: "Glorieta de Siloé resiste",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Incendio del Dollar City",
            href: "/A10",
          },
        ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/3.4161711,-76.5533613/3.4157655,-76.5534761/3.4159657,-76.5541933/3.416044,-76.5545/@3.4159585,-76.5544534,140m/data=!3m1!1e3!4m2!4m1!3e2?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.4161711, -76.5533613],
        [3.4157655, -76.5534761],
        [3.4159657, -76.5541933],
        [3.416044, -76.5545],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A09.mp3",
    },
  },
  A10: {
    src: "/lugares/siloe/video/A10.mp4",
    title: "Incendio del Dollar City",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Camino hacia el parque de la Horqueta",
            href: "/A11",
          },
        ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/3.4164956,-76.5544829/3.4174133,-76.5543538/3.4174791,-76.5541363/@3.417481,-76.5542113,140m/data=!3m1!1e3!4m2!4m1!3e2?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.4164956, -76.5544829],
        [3.4174133, -76.5543538],
        [3.4174791, -76.5541363],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A10.mp3",
    },
  },
  A11: {
    src: "/lugares/siloe/video/A11.mp4",
    title: "Camino hacia el parque de la Horqueta",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Hacia el parque de la Mina",
            href: "/B01",
          },
        ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/3.4174229,-76.5543406/3.4179701,-76.5541428/3.4180963,-76.5543439/Parque+Recreativo+La+Horqueta/3.4192981,-76.5541009/@3.4185472,-76.5542881,382m/data=!3m1!1e3!4m12!4m11!1m0!1m0!1m0!1m5!1m1!1s0x8e30a41c023b1e9f:0xa9b489265bcf5f1d!2m2!1d-76.5541897!2d3.4192766!1m0!3e2?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.4174229, -76.5543406],
        [3.4179701, -76.5541428],
        [3.4180963, -76.5543439],
        [3.4192786772282293, -76.5541873342125],
        [3.4192981, -76.5541009],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/A11.mp3",
    },
  },
  B01: {
    src: "/lugares/siloe/video/B01.mp4",
    title: "Hacia el parque de la Mina",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Hacia el mural Yo amo a Siloé",
            href: "/B02",
          },
        ],
      },
    ],
    map: {
      //https://www.google.com/maps/dir/Parque+Recreativo+La+Horqueta/3.418929,-76.5553576/3.4192175,-76.5557616/3.4194441,-76.5558886/3.4199297,-76.5562838/3.4202773,-76.5559768/@3.4201775,-76.5569152,453m/data=!3m1!1e3!4m13!4m12!1m5!1m1!1s0x8e30a41c023b1e9f:0xa9b489265bcf5f1d!2m2!1d-76.5541897!2d3.4192766!1m0!1m0!1m0!1m0!1m0!3e2?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.4192453751795866, -76.55426174247235],
        [3.4189401476287005, -76.55513077816491],
        [3.418929, -76.5553576],
        [3.4192175, -76.5557616],
        [3.4194441, -76.5558886],
        [3.4199297, -76.5562838],
        [3.4202773, -76.5559768],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B1.mp3",
    },
  },
  B02: {
    src: "/lugares/siloe/video/B02.mp4",
    title: "Hacia el mural Yo amo a Siloé",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Hacia la tienda de doña Ana",
            href: "/B03",
          },
        ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/3.4204338,-76.5562334/3.4199352,-76.5567635/3.4199919,-76.5568772/3.4200704,-76.5569256/3.4202373,-76.5569407/3.420314,-76.5566665/3.4205995,-76.5567919/Parque+mirador+%22YO+AMO+A+SILO%C3%89%22/@3.4204284,-76.5568747,19z/data=!4m15!4m14!1m0!1m0!1m0!1m0!1m0!1m0!1m0!1m5!1m1!1s0x8e30a5004a02f1cd:0xf9a73675a5689fd0!2m2!1d-76.5569575!2d3.4204548!3e2!5m1!1e4?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.420409657983336, -76.5562698618868],
        [3.4201981409126025, -76.55657026928671],
        [3.4199277202858624, -76.55676607053843],
        [3.4200696241886113, -76.55692432086516],
        [3.420219560364924, -76.55694577853659],
        [3.420326657619369, -76.5566560999724],
        [3.420615820146588, -76.55678752820984],
        [3.4205140777858465, -76.55695918958122],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B2.mp3",
    },
  },
  B03: {
    src: "/lugares/siloe/video/B03.mp4",
    title: "Hacia la tienda de doña Ana",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Mirador 'Yo amo a Siloé'",
            href: "/B04",
          },
        ],
      },
      // {
      //   id: 1,
      //   timeIn: 0.99,
      //   timeOut: 1,
      //   isBlocking: true,
      //   links: [
      //     {
      //       direction: "left",
      //       title: "B4_V1",
      //       href: "/B04_V1",
      //     },
      //     {
      //       direction: "forward",
      //       title: "B4_V2",
      //       href: "/B04_V2",
      //     },
      //     {
      //       direction: "right",
      //       title: "B4_V3",
      //       href: "/B04_V3",
      //     },
      //   ],
      // },
    ],
    map: {
      //https://www.google.com/maps/@3.4205056,-76.5569105,21z/data=!5m1!1e4?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.4204881967002203, -76.55694302178325],
        [3.4204600836768217, -76.55698526657386],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B3.mp3",
    },
  },
  B04_V1: {
    src: "/lugares/siloe/video/B04_V1.mp4",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        // links: [
        //   {
        //     direction: "forward",
        //     title: "B6",
        //     href: "/B06",
        //   },
        // ],
      },
    ],
    map: {
      // https://www.google.com/maps/dir/Parque+mirador+%22YO+AMO+A+SILO%C3%89%22/3.4202917,-76.5572761/3.4202526,-76.5574417/3.4201299,-76.5575503/3.4195362,-76.5579296/3.4195593,-76.5580863/3.4198579,-76.5579207/3.4201246,-76.5578905/3.4199202,-76.5581665/@3.4198802,-76.5580285,19z/data=!4m16!4m15!1m5!1m1!1s0x8e30a5004a02f1cd:0xf9a73675a5689fd0!2m2!1d-76.5569575!2d3.4204548!1m0!1m0!1m0!1m0!1m0!1m0!1m0!1m0!3e2!5m1!1e4?authuser=1&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D
      points: [
        [3.4204478, -76.5569489],
        [3.4202917, -76.5572761],
        [3.4202526, -76.5574417],
        [3.4201299, -76.5575503],
        [3.4195362, -76.5579296],
        [3.4195593, -76.5580863],
        [3.4198579, -76.5579207],
        [3.4201246, -76.5578905],
        [3.4199202, -76.5581665],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B4v1.mp3",
    },
  },
  B04_V2: {
    src: "/lugares/siloe/video/B04_V2.mp4",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Al campamento del M19",
            href: "/B06",
          },
        ],
      },
    ],
    map: {
      points: [
        [3.4211184676474855, -76.5571323414373],
        [3.421430388081101, -76.55712027149669],
        [3.4219587012054893, -76.55688655321875],
        [3.422019679675398, -76.55731620853562],
        [3.4224451463734793, -76.55781312657474],
        [3.4228955182232066, -76.55814579136961],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B4v2.mp3",
    },
  },
  B04_V3: {
    src: "/lugares/siloe/video/B04_V3.mp4",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Al campamento del M19",
            href: "/B06",
          },
        ],
      },
    ],
    map: {
      points: [
        [3.420578531647029, -76.55690856430014],
        [3.42028800444612, -76.55725167851202],
        [3.4202793922719814, -76.55731309214752],
        [3.4199140577641214, -76.55767829437247],
        [3.4200050904601635, -76.5578231336588],
        [3.420222297756154, -76.55776304766867],
        [3.4209763678613085, -76.55721912583597],
        [3.4214416284775178, -76.5570964032804],
        [3.4219517836332125, -76.55686323984813],
        [3.4221229450666693, -76.55743345077592],
        [3.4224145542378808, -76.55778380331749],
        [3.423015543065912, -76.55820903646618],
        [3.422800321640074, -76.55833918064005],
        [3.42348812466229, -76.55832586240449],
        [3.4230427362887745, -76.55906270553848],
        [3.4228874730702015, -76.5593075287779],
        [3.4219129162849105, -76.56004242663272],
        [3.4216620187286937, -76.56090531592817],
        [3.4216088446617774, -76.56109175752323],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B4v3.mp3",
    },
  },
  B06: {
    src: "/lugares/siloe/video/B06.mp4",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Campamento del M19",
            href: "/B07",
          },
        ],
      },
    ],
    map: {
      points: [
        [3.422903188529879, -76.55821574555468],
        [3.4232889909035946, -76.55807139314396],
        [3.4234980733810128, -76.55826303779749],
        [3.4233250776423865, -76.55839832646002],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B6.mp3",
    },
  },
  B07: {
    src: "/lugares/siloe/video/B07.mp4",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Monumento contra la opresión",
            href: "/B08",
          },
        ],
      },
    ],
    map: {
      points: [
        [3.4233348302956754, -76.55839142979907],
        [3.4226821841947235, -76.55860210273168],
        [3.4223142051926767, -76.55863213323332],
        [3.421961059633387, -76.55892663641406],
        [3.4219131458545613, -76.55870721076758],
        [3.4214374505543725, -76.55856852472881],
        [3.4206398913174842, -76.55896426360421],
        [3.4195817587536603, -76.55934593807895],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B7.mp3",
    },
  },
  B08: {
    src: "/lugares/siloe/video/B08.mp4",
    speed: 2000,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Casa de Jaqueline Rentería",
            href: "/B10",
          },
        ],
      },
    ],
    map: {
      points: [
        [3.419613980917109, -76.55883938053768],
        [3.4191857437172306, -76.5595691002525],
        [3.4188221290100422, -76.55953531812378],
        [3.4181635233023147, -76.55972486462478],
        [3.4181635233023147, -76.55972486462478],
        [3.4187202220082566, -76.56051964932126],
        [3.4185620513093617, -76.56070222744704],
        [3.41855287024377, -76.56081785230585],
        [3.4177630503995786, -76.56096127443998],
        [3.417854846367538, -76.56163579802225],
        [3.417529027603313, -76.5615504525806],
        [3.4184087647821397, -76.5630331421271],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B8.mp3",
    },
  },
  B10: {
    src: "/lugares/siloe/video/B10.mp4",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Cascada",
            href: "/B11",
          },
        ],
      },
    ],
    map: {
      points: [
        [3.4183925, -76.5630183],
        [3.4185231723605205, -76.56318213435803],
        [3.418549946722638, -76.56339939328117],
        [3.4186623990352714, -76.5634986350115],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B10.mp3",
    },
  },
  B11: {
    src: "/lugares/siloe/video/B11.mp4",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Cuento sobre la finca Siloé y toma de tierra",
            href: "/C01",
          },
        ],
      },
    ],
    map: {
      points: [
        [3.41868003343721, -76.56350319596768],
        [3.4185203043661607, -76.56366997092451],
        [3.418380822620403, -76.56358432973046],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B11.mp3",
    },
  },
  C01: {
    src: "/lugares/siloe/video/C01.mp4",
    speed: 800,
    type: "scroll",
    navigationHotspots: [
      {
        id: 1,
        timeIn: 0.99,
        timeOut: 1,
        isBlocking: true,
        links: [
          {
            direction: "forward",
            title: "Metrocable",
            href: "/C02",
          },
        ],
      },
    ],
    map: {
      points: [
        [3.4184146418207106, -76.56373857742616],
        [3.418210607536718, -76.5639225355791],
        [3.418009542281106, -76.5642917182536],
        [3.4175256999941337, -76.56415824892828],
        [3.4173309418592153, -76.5641091677808],
        [3.4176248832865963, -76.56388788336986],
      ],
    },
    audioBackground: {
      src: "/lugares/siloe/audio/B11.mp3",
    },
  },
  C02: {
    src: "/lugares/siloe/video/C02.mp4",
    type: "video",
    title: "MioCable",
    startTime: 0,
    map: {
      points: [
        [3.418043762178466, -76.56381478732216],
        [3.422004184072227, -76.56130001355203],
        [3.4200658882636485, -76.55793973085903],
        [3.415544908483542, -76.54925502064263],
      ],
    },
  },
};
export const videoScrollPath = "/siloe";
