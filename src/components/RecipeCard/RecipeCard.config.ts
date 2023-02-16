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
      viewMin: 669,
      imgWidth: 450,
    },

    {
      viewMin: 600,
      imgWidth: 300,
    },
    {
      viewMin: 485,
      imgWidth: 600,
    },
    {
      viewMin: 335,
      imgWidth: 450,
    },
    {
      imgWidth: 300,
    },
  ],
};

export default config;
