// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';



// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'Yid Craft',
          tableOfContents: true,
          favicon: '/assets/favicon.png',
		  editLink: {
    			baseUrl: 'https://github.com/mrweissberg613/yidcraftdocs/edit/main/',
  			},
          customCss: [
              // Relative path to your custom CSS file
              './src/styles/global.css',
      		],
          logo: {
              src: './src/assets/yidcraftlogo.png',
              replacesTitle: true,
              alt: 'Yid Craft Wiki'
          },
          social: [
              {icon: 'discord', label: 'Discord', href: 'https://discord.gg/xM4PMY2s9X'}
          ],
          lastUpdated: true,
          sidebar: [
              {
                  label: 'Getting Started',
                  items: [
                      { label: 'Intro', slug: 'guides/intro' },
                      { label: 'Rules', slug: 'guides/rules' },
                      { label: 'How to join', slug: 'guides/how-to-join' },
                      { label: 'Basics', slug: 'guides/basics' }
                  ],
              },
              {
                  label: 'Features',
                  items: [
                      { label: 'Intro', slug: 'features/intro' },
                      { label: 'Homes', slug: 'features/homes' },
                      { label: 'Teams', slug: 'features/teams' },
                      { label: 'Brewing', slug: 'features/brewing' },
                      { label: 'Chest Shops', slug: 'features/chestshops' },
                      { label: 'Kosher System', slug: 'features/koshersystem' },
                      { label: 'Custom Foods', slug: 'features/customfoods' }

                  ],
              },
          ],
      }),
	],

 
});