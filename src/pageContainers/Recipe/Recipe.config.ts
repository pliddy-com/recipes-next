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
      viewMin: 704,
      imgWidth: 832,
    },
    {
      viewMin: 448,
      imgWidth: 624,
    },
    {
      imgWidth: 416,
    },
  ],
};

export default config;
