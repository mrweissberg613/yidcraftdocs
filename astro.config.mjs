// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import starlightScrollToTop from 'starlight-scroll-to-top';
import starlightBlog from 'starlight-blog'
export default defineConfig({
	

	output: 'server',

	adapter: vercel(),

	vite: {
		ssr: {

		}
	},
	site: 'https://yidcraft.vercel.app',

	integrations: [
		react(),

		starlight({
			
			

			title: 'Yid Craft Wiki',
			plugins: [starlightScrollToTop(), 
				
				
				
				
				starlightBlog({
				rss: false,
				authors: {
				mrweissberg: {
				name: 'MrWeissberg',
				title: 'Director',
				picture: '/coowner-pfp.png', // Images in the `public` directory are supported.
				 },
			},
			})],

			tableOfContents: true,
			
			

			favicon: '/images/favicon.png',


			customCss: [
				'./src/styles/global.css',
			],
			components: {
				Header: './src/components/CustomHeader.astro',
			},
			head: [
				// Add ICO favicon fallback for Safari.
				{
				tag: 'link',
				attrs: {
					rel: 'icon',
					href: '/images/favicon.png',
					sizes: '32x32',
				},
				},
			],


			logo: {

				src: './src/assets/yidcraftlogo.png',

				replacesTitle: true,

				alt: 'Yid Craft Wiki'

			},


			social: [

				{

					icon: 'discord',

					label: 'Discord',

					href: 'https://discord.gg/xM4PMY2s9X'

				},
				{

					icon: 'youtube',

					label: 'Youtube',

					href: 'https://www.youtube.com/@YidCraft613'

				}
				

			],

			lastUpdated: true,

			sidebar: [

				{

					label: 'Getting Started',

					items: [

						{ label: 'Intro', slug: 'guides/intro' },

						{ label: "What's New", slug: 'guides/whats-new' },

						{ label: 'Rules', slug: 'guides/rules' },

						{ label: 'Allowed Mods', slug: 'guides/mods' },

						{ label: 'How to join', slug: 'guides/how-to-join' },

						{ label: 'Basics', slug: 'guides/basics' },

						{ label: 'The Tutorial', slug: 'guides/tutorial' }

					],

				},


				{

					label: 'Features',

					items: [

						{ label: 'Intro', slug: 'features/intro' },

						{ label: 'The Town', slug: 'features/town' },

						{ label: 'Homes', slug: 'features/homes' },

						{ label: 'Teams', slug: 'features/teams' },

						{ label: 'Brewing', slug: 'features/brewing' },
						
						{ label: 'Player Market', slug: 'features/playermarket' },

						{ label: 'Investing', slug: 'features/investing' },

						{ label: 'Chest Shops', slug: 'features/chestshops' },

						{ label: 'Kosher System', slug: 'features/koshersystem' },

						{ label: 'Skills and Sefarim', slug: 'features/skills' },

						{ label: 'Mezuzos', slug: 'features/mezuzos' },

						{ label: 'Tzedakah', slug: 'features/tzedakah' },

						{ label: 'Brachot', slug: 'features/brachot' },

						{ label: 'Custom Foods', slug: 'features/customfoods' },

						{ label: 'Boss Hunting', slug: 'features/bosses' },

						{ label: 'Pets', slug: 'features/pets' }

					],

				},

			],

		}),

	],

});
