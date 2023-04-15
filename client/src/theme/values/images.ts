export type AspectRatio = '16 / 9' | '3 / 2' | '4 / 3' | '1 / 1';

export interface Breakpoints {
  viewMin?: number;
  imgWidth: number;
}

export interface ImageConfig {
  aspectRatio: AspectRatio;
  breakpoints?: Breakpoints[];
}

export const previewCardConfig: ImageConfig = {
  aspectRatio: '3 / 2',
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

export const recipeCardConfig: ImageConfig = {
  aspectRatio: '3 / 2',
  breakpoints: [
    {
      viewMin: 987,
      imgWidth: 400
    },
    {
      viewMin: 768,
      imgWidth: 300
    },
    {
      viewMin: 668,
      imgWidth: 400
    },
    {
      viewMin: 480,
      imgWidth: 300
    },
    {
      viewMin: 434,
      imgWidth: 500
    },
    {
      viewMin: 335,
      imgWidth: 400
    },
    {
      imgWidth: 300
    }
  ]
};

export const recipePageConfig: ImageConfig = {
  aspectRatio: '4 / 3',
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

// const config = {
//   previewCard,
//   recipeCard,
//   recipePage
// };

// export default config;
