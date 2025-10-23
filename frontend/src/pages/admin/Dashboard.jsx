import React, { useState, useEffect } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import axios from 'axios'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const fetchDashboard = async () => {
    try {
      const {data} = await axios.get("http://localhost:5000/api/admin/dashboard")
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* --- Top Stats Section --- */}
      <div className="flex flex-wrap gap-4">
        {/* Blogs Card */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[14rem] rounded-lg shadow cursor-pointer hover:scale-105 transition-transform">
          <img
            src={assets.dashboard_icon_1}
            alt="blog icon"
            className="w-10 h-10 object-contain"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.blogs}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        {/* Comments Card (fixed icon styling) */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[14rem] rounded-lg shadow cursor-pointer hover:scale-105 transition-transform">
          <img
            src={assets.dashboard_icon_2}
            alt="comments icon"
            className="w-10 h-10 object-contain"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.comments}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        {/* Drafts Card */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[14rem] rounded-lg shadow cursor-pointer hover:scale-105 transition-transform">
          <img
            src={assets.dashboard_icon_3}
            alt="drafts icon"
            className="w-10 h-10 object-contain"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.drafts}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* --- Recent Blogs Table --- */}
      <div className="mt-10">
        <div className="flex items-center gap-3 mb-3 text-gray-600">
          <img
            src={assets.dashboard_icon_4}
            alt="latest blog icon"
            className="w-8 h-8 object-contain"
          />
          <p className="text-lg font-semibold">Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white">
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
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
