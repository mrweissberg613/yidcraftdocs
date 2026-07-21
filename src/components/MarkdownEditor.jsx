import { useState, lazy, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
	Save,
	Eye,
	Edit3,
	Upload
} from "lucide-react";


import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";


const MDEditor = lazy(
	() => import("@uiw/react-md-editor")
);



export default function MarkdownEditor({

	initialContent="",

	filePath

}) {


	const [value,setValue] =
		useState(initialContent);


	const [mode,setMode] =
		useState("edit");


	const [saving,setSaving] =
		useState(false);


	const [uploading,setUploading] =
		useState(false);


	const [imageWidth,setImageWidth] =
		useState(800);





	async function save(){


		setSaving(true);


		try {


			const res =
				await fetch(
					"/api/save",
					{

						method:"POST",

						headers:{
							"Content-Type":
							"application/json"
						},

						body:JSON.stringify({

							path:filePath,

							content:value

						})

					}

				);



			if(!res.ok)
				throw new Error();



			alert("Saved!");

		}

		catch(err){

			console.error(err);

			alert("Save failed");

		}



		setSaving(false);

	}







	async function uploadImage(e){


		const file =
			e.target.files?.[0];


		if(!file)
			return;



		setUploading(true);



		try {


			const form =
				new FormData();


			form.append(
				"file",
				file
			);



			const res =
				await fetch(

					"/api/upload",

					{

						method:"POST",

						body:form

					}

				);



			const data =
				await res.json();




			if(!data.url)
				throw new Error();




			const markdown = `

<img 
src="${data.url}"
width="${imageWidth}"
alt="${file.name}"
/>

`;



			setValue(
				value + markdown
			);



			alert(
				"Image added!"
			);



		}

		catch(err){

			console.error(err);

			alert(
				"Upload failed"
			);

		}



		setUploading(false);

	}





	return (

		<div className="editor-container">



			<div className="editor-toolbar">


				<button

					onClick={()=>
						setMode("edit")
					}

				>

					<Edit3 size={18}/>

					Edit

				</button>




				<button

					onClick={()=>
						setMode("preview")
					}

				>

					<Eye size={18}/>

					Preview

				</button>





				<button

					onClick={save}

					disabled={saving}

				>

					<Save size={18}/>

					{
						saving
						?
						"Saving..."
						:
						"Save"
					}

				</button>





				<label className="upload-button">


					<Upload size={18}/>


					{
						uploading
						?
						"Uploading..."
						:
						"Upload Image"
					}



					<input

						type="file"

						accept="image/*"

						hidden

						onChange={uploadImage}

					/>


				</label>




				<input

					type="number"

					value={imageWidth}

					onChange={
						e=>
						setImageWidth(
							e.target.value
						)
					}

					placeholder="Image width"

				/>



			</div>






			<div className="editor-area">


			{

				mode==="edit"

				?

				<Suspense fallback="Loading editor...">

					<MDEditor

						value={value}

						onChange={
							v=>
							setValue(v || "")
						}

						height={700}

					/>

				</Suspense>


				:


				<div className="preview">

					<ReactMarkdown

						remarkPlugins={[
							remarkGfm
						]}

					>

						{value}

					</ReactMarkdown>


				</div>


			}



			</div>



		</div>

	);

}