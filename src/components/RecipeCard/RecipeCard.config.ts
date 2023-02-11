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
      viewMin: 740,
      imgWidth: 446,
    },
    {
      viewMin: 600,
      imgWidth: 336,
    },
    {
      viewMin: 435,
      imgWidth: 568,
    },
    {
      imgWidth: 336,
    },
  ],
};

export default config;
