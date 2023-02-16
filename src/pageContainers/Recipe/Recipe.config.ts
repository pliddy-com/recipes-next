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
      viewMin: 831,
      imgWidth: 900,
    },
    {
      viewMin: 665,
      imgWidth: 750,
    },
    {
      viewMin: 483,
      imgWidth: 600,
    },
    {
      viewMin: 333,
      imgWidth: 450,
    },
    {
      imgWidth: 300,
    },
  ],
};

export default config;
