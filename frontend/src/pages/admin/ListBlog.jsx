import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import axios from 'axios'
import toast from 'react-hot-toast'

const ListBlog = () => {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/admin/blogs`)
      if (data.success) {
        setBlogs(data.blogs)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
      
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="flex-1 pt-5 mx-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">All Blogs</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 uppercase bg-gray-50">
            <tr>
              <th className="xl:px-6 px-2 py-4 text-left">#</th>
              <th className="px-2 py-4 text-left">Blog Title</th>
              <th className="max-sm:hidden px-2 py-4 text-left">Date</th>
              <th className="px-2 py-4 text-left">Status</th>
              <th className="px-2 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog
