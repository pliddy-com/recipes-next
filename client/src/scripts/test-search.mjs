#!/usr/bin/env node

import { algoliasearch } from 'algoliasearch';
import dotenv from 'dotenv';

(async () => {
  // initialize environment variables
  dotenv.config({ quiet: true });

  const { NEXT_PUBLIC_ALGOLIA_APP_ID, ALGOLIA_SEARCH_ADMIN_KEY } = process.env;

  const client = algoliasearch(
    NEXT_PUBLIC_ALGOLIA_APP_ID,
    ALGOLIA_SEARCH_ADMIN_KEY
  );

  const index = client.initIndex('recipes_index');

  const queryText = 'potatoes';

  index.search(queryText).then(({ hits }) => {
    console.log(hits);
  });
})();

/*
  [
    {
      content: 'Hasselback potatoes with garlic and rosemary are a delicious and visually stunning dish that is sure to impress your guests. The potatoes are thinly sliced, but not all the way through, and are then roasted to create a crispy outer layer and a soft, fluffy interior.  The garlic and rosemary add a wonderful depth of flavor that complements the potatoes perfectly. This dish is easy to prepare but looks fancy enough for a special occasion. It can be served as a side dish or even as a main course with a salad. Try this recipe and enjoy the delicious flavors of garlic and rosemary in every bite!',
      abstract: 'A slight variation on the Hasselback potato with the addition of sliced garlic and fresh rosemary sprigs for extra flavor.',
      slug: 'hasselback-potatoes',
      tags: [ 'Vegetables', 'Potatoes', 'Garlic', 'Rosemary' ],
      title: 'Hasselback Potatoes',
      url: '/recipe/hasselback-potatoes/',
      objectID: '6rSd93Hbbee4wgJziTcvTZ',
      _highlightResult: {
        content: [Object],
        abstract: [Object],
        tags: [Array],
        title: [Object]
      }
    },
    {
      content: 'Octopus and fried potato is a classic dish that is popular in Spain and around the world. The dish consists of tender octopus meat, cooked to perfection, and crispy fried potatoes seasoned with salt and pepper. The dish is then topped with fresh parsley, which adds a touch of color and freshness to the dish.  The combination of the tender octopus meat, the crispy fried potatoes, and the aromatic parsley makes for a flavorful and satisfying dish that is perfect for sharing with friends and family. This dish is a great example of the rich culinary heritage of Spain and the creativity and passion of its chefs. This easy version, made with canned octopus, is part of my Seven Fishes tapas.',
      abstract: 'This easy version of the traditional Spanish tapas, made with canned octopus and boiled potatoes, is part of Seven Fishes tapas.',
      keywords: [ 'octopus', 'potatoes', 'tapas' ],
      slug: 'octopus-and-potatoes',
      tags: [ 'Small Plates', 'Seafood', 'Seven Fishes', 'Mediterranean' ],
      title: 'Octopus and Potatoes',
      url: '/recipe/octopus-and-potatoes/',
      objectID: '2WpzYlWHQB93j3U7nwmvcT',
      _highlightResult: {
        content: [Object],
        abstract: [Object],
        keywords: [Array],
        tags: [Array],
        title: [Object]
      }
    },
    {
      content: 'Boeuf Bourguignon is a traditional French recipe that originated in the Burgundy region of France. This hearty recipe features tender beef braised in red wine with carrots, onions, mushrooms, and bacon. The meat is seasoned with garlic, thyme, bay leaves, and black pepper, which adds a depth of flavor to the dish. The recipe is typically served with mashed potatoes or crusty bread, making it a perfect comfort food for colder months. To make Boeuf Bourguignon, the beef is first seared in hot oil to create a caramelized crust, then slow-cooked in a mixture of red wine and beef stock. The dish is then left to simmer for several hours until the meat is tender and the flavors have melded together. This slow-cooking process is key to achieving the rich, savory flavor that Boeuf Bourguignon is known for. The recipe has been passed down through generations and remains a staple of French cuisine.',
      abstract: "Boeuf Bourguignon is a classic French dish made with beef braised in red wine, vegetables, and herbs. It's hearty, flavorful, and perfect for cold days.",
      slug: 'boeuf-bourguignon',
      tags: [ 'Meat', 'Beef', 'Stew', 'French' ],
      title: 'Boeuf Bourguignon',
      url: '/recipe/boeuf-bourguignon/',
      objectID: '5yx0eoxsdxat3kd8VicGOp',
      _highlightResult: {
        content: [Object],
        abstract: [Object],
        tags: [Array],
        title: [Object]
      }
    },
    {
      content: 'Tater tot nachos are a delicious fusion of American and Mexican cuisines. They consist of crispy tater tots, piled high with classic nacho toppings like seasoned ground beef, melted cheese, sour cream, and diced tomatoes. This dish is typically prepared by layering the tater tots in a baking dish, topping them with the desired ingredients, and then baking until the cheese is melted and bubbly. The use of tater tots in place of tortilla chips adds a unique texture and flavor to the dish, making it a popular menu item at bars and casual dining establishments. While the ingredients and toppings can vary, the combination of crispy tater tots and savory nacho toppings makes for a satisfying and indulgent snack or meal. \n',
      abstract: "Tater tot nachos are a dish that combines crispy tater tots with savory toppings like cheese, salsa, and whatever's in the pantry.",
      slug: 'tater-tot-nachos',
      tags: [ 'Vegetables', 'Potatoes', 'Small Plates', 'Mexican' ],
      title: 'Tater Tot Nachos',
      url: '/recipe/tater-tot-nachos/',
      objectID: '3btmqBhzGuLTuQPTenBxqZ',
      _highlightResult: {
        content: [Object],
        abstract: [Object],
        tags: [Array],
        title: [Object]
      }
    }
  ]
  
 */

/*
    // Paste this code as high in the <head> of the page as possible:
    
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KTZSLNN');</script>
    <!-- End Google Tag Manager -->

    // Additionally, paste this code immediately after the opening <body> tag:

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTZSLNN"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    
  */
