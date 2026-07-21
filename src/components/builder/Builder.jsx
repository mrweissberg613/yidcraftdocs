import { useEffect, useRef, useState } from "react";

import grapesjs from "grapesjs";

import "grapesjs/dist/css/grapes.min.css";

import "./grapesjs.css";


export default function Builder({
	initialContent = "",
	onChange
}) {


	const editorRef = useRef(null);

	const [darkMode,setDarkMode] = useState(false);



	useEffect(() => {


		if(editorRef.current)
			return;



		const editor = grapesjs.init({

			container:"#gjs",

			height:"100vh",

			storageManager:false,


			blockManager:{

				appendTo:"#blocks"

			},


			panels:{

				default:false

			},



			canvas:{

				styles:[

				`

				body {

					background:#ffffff;

					padding:50px;

					font-family:
					Inter, Arial, sans-serif;

				}


				img {

					max-width:100%;

					height:auto;

					display:block;

					border-radius:12px;

				}



				.mdx-card {

					background:white;

					border:1px solid #ddd;

					border-radius:16px;

					padding:24px;

					margin-bottom:20px;

				}



				.note {

					background:#dbeafe;

					border-left:5px solid #2563eb;

					padding:20px;

					border-radius:12px;

				}



				.tip {

					background:#dcfce7;

					border-left:5px solid #16a34a;

					padding:20px;

					border-radius:12px;

				}



				.warning {

					background:#fef3c7;

					border-left:5px solid #d97706;

					padding:20px;

					border-radius:12px;

				}

				`

				]

			}

		});




		/*
			BLOCKS
		*/


		editor.BlockManager.add(

			"heading",

			{

				label:"Heading",

				category:"Markdown",

				content:

				`

				<h1>

				Title

				</h1>

				`

			}

		);



		editor.BlockManager.add(

			"text",

			{

				label:"Text",

				category:"Markdown",

				content:

				`

				<p>

				Text goes here

				</p>

				`

			}

		);




		editor.BlockManager.add(

			"card",

			{

				label:"Card",

				category:"Starlight",

				content:

				`

				<div class="mdx-card">

					<h2>
					Card Title
					</h2>


					<p>
					Description
					</p>

				</div>

				`

			}

		);




		editor.BlockManager.add(

			"note",

			{

				label:"Note",

				category:"Starlight",

				content:

				`

				<div class="note">

					<strong>
					Note
					</strong>


					<p>
					Information
					</p>

				</div>

				`

			}

		);




		editor.BlockManager.add(

			"tip",

			{

				label:"Tip",

				category:"Starlight",

				content:

				`

				<div class="tip">

					<strong>
					Tip
					</strong>


					<p>
					Helpful tip
					</p>

				</div>

				`

			}

		);




		editor.BlockManager.add(

			"warning",

			{

				label:"Warning",

				category:"Starlight",

				content:

				`

				<div class="warning">

					<strong>
					Warning
					</strong>


					<p>
					Important warning
					</p>

				</div>

				`

			}

		);





		editor.BlockManager.add(

			"image",

			{

				label:"Image",

				category:"Media",

				content:

				`

				<img

				src="https://placehold.co/900x500"

				/>

				`

			}

		);




		editor.BlockManager.add(

			"columns",

			{

				label:"Two Columns",

				category:"Layout",

				content:

				`

				<div style="
				display:grid;
				grid-template-columns:1fr 1fr;
				gap:20px;
				">


					<div class="mdx-card">
					Left
					</div>


					<div class="mdx-card">
					Right
					</div>


				</div>

				`

			}

		);





		// LOAD EXISTING PAGE


		if(initialContent) {


			try {


				editor.setComponents(

					markdownToHTML(initialContent)

				);


			}

			catch(error) {


				console.error(
					"Loading page failed:",
					error
				);


			}


		}





		// UPDATE PARENT WHEN CHANGED


		editor.on(

			"update",

			()=>{


				if(onChange){


					onChange(

						editor.getHtml()

					);


				}


			}

		);





		editorRef.current = editor;



	},[]);








	function toggleTheme(){


		const frame =
			document.querySelector(
				".gjs-frame"
			);



		if(!frame)
			return;



		const body =
			frame.contentDocument.body;



		if(darkMode){


			body.style.background =
				"#ffffff";


			body.style.color =
				"#000000";


		}

		else {


			body.style.background =
				"#111827";


			body.style.color =
				"#ffffff";


		}



		setDarkMode(!darkMode);


	}







	return (

		<div className="builder-wrapper">


			<div className="builder-topbar">


				<button
					type="button"
					onClick={toggleTheme}
				>

					{
						darkMode
						?
						"☀ Light Mode"
						:
						"🌙 Dark Mode"
					}

				</button>


			</div>




			<div className="builder-content">


				<div id="blocks"></div>


				<div id="gjs"></div>


			</div>


		</div>

	);

}





function markdownToHTML(md){


	if(!md)
		return "";



	md = md.replace(

		/^---[\s\S]*?---/,

		""

	);



	return md

	.replace(

		/^### (.*)$/gm,

		"<h3>$1</h3>"

	)

	.replace(

		/^## (.*)$/gm,

		"<h2>$1</h2>"

	)

	.replace(

		/^# (.*)$/gm,

		"<h1>$1</h1>"

	)

	.replace(

		/\n\n/g,

		"<br><br>"

	);

}