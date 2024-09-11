import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import APP_URL from "../config";
import { useEffect, useState } from "react";

export default function BlogList() {

  const navigate = useNavigate();

  const [blogs,setBlogs] = useState([])

  const handleDelete =async(id)=>{
    try{
        const result = await axios.delete(`${APP_URL}/blog/${id}`)
        if(result.data.success){
            navigate(0);
        }
    }catch(e){
        console.error(e)
    }
  }


  const fetchData = async ()=>{
    try{
        const result = await axios.get(`${APP_URL}/blog`)
        if(result?.data?.blogList){
            setBlogs(result.data.blogList);
        }
    }catch(e){
        console.error(e);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <>
      <table>
        <thead>
            <tr>
                <td>Title</td>
                <td>Category</td>
                <td>Status</td>
                <td>Slug</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {
                blogs?.length > 0 ?
                <>
                    {blogs.map((blog,index)=>
                    <tr key={index}>
                        <td>{blog.title}</td>
                        <td>{blog.category}</td>
                        <td>{blog.status}</td>
                        <td>{blog.slug}</td>
                        <td> <div style={{display:'flex',justifyContent:'space-between'}}><Link to={`/blog-save/${blog.id}`}>Update</Link></div>
                        <div><button onClick={(e)=>handleDelete(blog.id)}>Delete</button></div>
                        </td>

                    </tr>
                    )

                    }
                </>
                :
                <tr><td colSpan={5}>No data found</td></tr>
            }

        </tbody>
      </table>
    </>
  );
}
