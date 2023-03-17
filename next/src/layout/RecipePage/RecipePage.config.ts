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
      viewMin: 1048,
      imgWidth: 600
    },
    {
      viewMin: 960,
      imgWidth: 500
    },
    {
      viewMin: 848,
      imgWidth: 900
    },
    {
      viewMin: 748,
      imgWidth: 800
    },
    {
      viewMin: 648,
      imgWidth: 700
    },
    {
      viewMin: 548,
      imgWidth: 600
    },
    {
      viewMin: 448,
      imgWidth: 500
    },
    {
      viewMin: 332,
      imgWidth: 400
    },
    {
      imgWidth: 300
    }
  ]
};

export default config;
