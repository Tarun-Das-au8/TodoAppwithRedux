
export const addBlog = (blog) => {
  return {
    type: "ADD",
    payload: blog,
  };
};

export const editBlog = (id) => {
  return {
    type: "EDIT",
    payload: id,
  };
};

export const deleteBlog = (id) => {
  return {
    type: "DELETE",
    payload: id,
  };
};
