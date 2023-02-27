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
      viewMin: 987,
      imgWidth: 400,
    },
    {
      viewMin: 768,
      imgWidth: 300,
    },
    {
      viewMin: 668,
      imgWidth: 400,
    },
    {
      viewMin: 480,
      imgWidth: 300,
    },
    {
      viewMin: 434,
      imgWidth: 500,
    },
    {
      viewMin: 335,
      imgWidth: 400,
    },
    {
      imgWidth: 300,
    },
  ],
};

export default config;
