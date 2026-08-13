import { client } from "./helper.js";
import { cookies } from "next/headers";

export const fetchCategory = async ({ status = null } = {}) => {
  try {
    const query = new URLSearchParams();
    if (status) {
      query.append('status', status)
    }
    const response = await client.get("category")
    if (response.data.success) {
      return {
        data: response.data.categories,
        success: response.data.success
      }
    }
  } catch (error) {
    return {
      data: [],
      success: false
    }
  }
};


export const fetchCategoryById = async (id) => {
  try {
    const response = await client.get(`category/${id}`)
    if (response.data.success) {
      return {
        data: response.data.category,
        success: response.data.success
      }
    }
  } catch (error) {
    return {
      data: {},
      success: false
    }
  }
};


export const fetchRoom = async ({ status = null } = {}) => {
  try {
    const query = new URLSearchParams();
    if (status) {
      query.append('status', status)
    }
    const response = await client.get("room")
    if (response.data.success) {
      return {
        data: response.data.rooms,
        success: response.data.success
      }
    }
  } catch (error) {
    return {
      data: [],
      success: false
    }
  }
};


export const fetchRoomById = async (id) => {
  try {
    const response = await client.get(`room/${id}`)
    if (response.data.success) {
      return {
        data: response.data.room,
        success: response.data.success
      }
    }
  } catch (error) {
    return {
      data: {},
      success: false
    }
  }
};


export const fetchProduct = async ({ category = null, page = null, featured = null, room = null, stock = null,
  minPrice = null, maxPrice = null, bestSeller = null, status = null, sort = null } = {}) => {
  try {
    const query = new URLSearchParams();
    if (category) {
      query.append('category', category)
    }
    if (room) {
      query.append('room', room)
    }
    if (maxPrice) {
      query.append('max', maxPrice)
    }
    if (minPrice) {
      query.append('min', minPrice)
    }
    if (page) {
      query.append('page', page)
    }
    if (stock !== null) {
      query.append('stock', stock)
    }
    if (bestSeller !== null) {
      query.append('best_seller', bestSeller)
    }
    if (status !== null) {
      query.append('status', status)
    } if (featured !== null) {
      query.append('featured', featured)
    } if (sort) {
      query.append('sort', sort)
    }
    const response = await client.get(`product?${query.toString()}`)
    if (response.data.success) {
      return {
        data: response.data.products,
        success: response.data.success,
        pages: response.data.pages
      }
    }
  } catch (error) {
    return {
      data: [],
      success: false
    }
  }
};


export const fetchProductById = async (id) => {
  try {
    const response = await client.get(`product/${id}`)
    if (response.data.success) {
      return {
        data: response.data.product,
        success: response.data.success
      }
    }
  } catch (error) {
    return {
      data: {},
      success: false
    }
  }
};


export const getprofile = async () => {
  try {
    const cookie = await cookies();// token ko cookies se get kar raha hai
    const token = cookie.get("jwt")?.value || null;// agar token null hai to null return kar raha hai
    const response = await client.get("user/get-profile",// token ko headers me send kar raha hai
      {
        headers: {
          Authorization: token
        }
      }
    )
    console.log(" response", response)

    if (response.data.success) {
      return {
        data: response.data.user,
        success: response.data.success
      }
    }
  } catch (error) {
    return {
      data: null,
      success: false
    }
  }
}