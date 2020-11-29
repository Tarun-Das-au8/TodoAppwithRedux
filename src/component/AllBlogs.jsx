import React, { Component } from "react";
import { connect } from "react-redux";
import { editBlog, deleteBlog } from "../redux/actions/blogAction";

class AllBlogs extends Component {
  handleDelete = (event) => {
    let id = this.props.blog.id;
    this.props.deleteBlog(id);
  };

  handleEdit = () => {
    console.log("edit");
    this.props.onEdit(this.props.blog);
  };

  render() {
    const { blog, user } = this.props;
    return (
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.story}</p>
        {user ? (
          <>
            <button onClick={this.handleEdit}>Edit</button>{" "}
            <button onClick={this.handleDelete}>Delete</button>
          </>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps, { editBlog, deleteBlog })(AllBlogs);
