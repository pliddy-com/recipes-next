interface Breakpoints {
  viewMin?: number;
  imgWidth: number;
}

interface Config {
  breakpoints?: Breakpoints[];
}

const config: Config = {
  breakpoints: [
    {
      viewMin: 960,
      imgWidth: 300
    },
    {
      viewMin: 868,
      imgWidth: 500
    },

    {
      viewMin: 650,
      imgWidth: 400
    },
    {
      viewMin: 479,
      imgWidth: 500
    },
    {
      viewMin: 334,
      imgWidth: 400
    },
    {
      imgWidth: 300
    }
  ]
};

export default config;
