import type { APIRoute } from "astro";
import { Octokit } from "octokit";


export const POST: APIRoute = async ({ request }) => {


try {


const data =
await request.json();



const token =
import.meta.env.GITHUB_TOKEN;


const owner =
import.meta.env.GITHUB_OWNER;


const repo =
import.meta.env.GITHUB_REPO;



if(!token || !owner || !repo){

return new Response(

JSON.stringify({

success:false,

message:"GitHub configuration missing"

}),

{

status:500,

headers:{
"Content-Type":"application/json"
}

}

);

}



const octokit =
new Octokit({

auth:token

});



const slug =
data.title
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");



const path =
`src/content/docs/blog/${slug}.mdx`;



const file = `---
title: "${data.title}"
description: "${data.description}"
---

# ${data.title}

${data.content}
`;



await octokit.rest.repos.createOrUpdateFileContents({

owner,

repo,

path,

message:
`Create blog post: ${data.title}`,

content:
Buffer
.from(file)
.toString("base64")

});



return new Response(

JSON.stringify({

success:true,

message:"Post published successfully"

}),

{

status:200,

headers:{
"Content-Type":"application/json"
}

}

);



}

catch(error){


console.error(error);



return new Response(

JSON.stringify({

success:false,

message:"Failed creating post"

}),

{

status:500,

headers:{
"Content-Type":"application/json"
}

}

);


}


};