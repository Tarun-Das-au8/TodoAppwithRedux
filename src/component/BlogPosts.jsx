import React, { Component } from "react";
import { connect } from "react-redux";
import AllBlogs from "./AllBlogs";
import { addBlog, deleteBlog, editBlog } from "../redux/actions/blogAction";
import Search from "./Search";

class BlogPosts extends Component {
  state = {
    story: "write story...",
    title: "title",
    editTitle: "",
    editStory: "",
    disp: "none",
    current_blog: "",
    searchQuery: null,
  };
  search = (query) => {
    this.setState({ searchQuery: query });
  };
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleStoryChange = (event) => {
    this.setState({ story: event.target.value });
  };
  handleEditTitleChange = (event) => {
    this.setState({ editTitle: event.target.value });
  };
  handleStoryTitleChange = (event) => {
    this.setState({ editStory: event.target.value });
  };
  handleBlog = (event) => {
    event.preventDefault();
    if (this.state.title) {
      const blog = {
        title: this.state.title,
        story: this.state.story,
        id: 1 + Math.random(),
      };
      this.props.addBlog(blog);
    }
    this.setState({ title: "title" });
    this.setState({ story: "write story..." });
  };
  onEdit = (blog) => {
    this.setState({
      editTitle: blog.title,
      editStory: blog.story,
      current_blog: blog.id,
      disp: "flex",
    });
  };
  onCancel = (event) => {
    event.preventDefault();
    this.setState({ disp: "none" });
  };
  onSave = (e) => {
    e.preventDefault();
    for (let i = 0; i < this.props.allBlogs.length; i++) {
      if (this.state.current_blog === this.props.allBlogs[i].id) {
        if (this.state.editTitle) {
          this.props.allBlogs[i].title = this.state.editTitle;
          this.props.allBlogs[i].story = this.state.editStory;
          this.setState({ disp: "none", editTitle: "", editStory: "" });
          const allBlogs = {
            title: this.props.allBlogs[i].title,
            story: this.props.allBlogs[i].story,
            id: this.props.allBlogs[i].id,
          };
          this.props.editBlog(allBlogs);
          console.log(this.props.allBlogs);
        }
      }
    }
  };
  render() {
    const { user, allBlogs } = this.props;
    const { searchQuery } = this.state;
    allBlogs.reverse();
    let allBlogs2 = allBlogs;
    if (searchQuery != null) {
      allBlogs2 = allBlogs.filter(
        (blog) => blog.title.includes(searchQuery) === true
      );
    }
    // console.log(newBlog)
    console.log(allBlogs2);
    return (
      <div>
        <Search search={this.search} />
        {user ? (
          <>
            <form>
              <div>
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                />
              </div>
              <div>
                <textarea
                  id="story"
                  name="story"
                  rows="5"
                  cols="50"
                  value={this.state.story}
                  onChange={this.handleStoryChange}
                />
              </div>
              <button onClick={this.handleBlog}>Submit</button>
            </form>
            <form style={{ display: this.state.disp }}>
              <div>
                <input
                  type="text"
                  value={this.state.editTitle}
                  onChange={this.handleEditTitleChange}
                />
              </div>
              <div>
                <textarea
                  id="edit_story"
                  name="edit_story"
                  rows="5"
                  cols="50"
                  value={this.state.editStory}
                  onChange={this.handleStoryTitleChange}
                />
              </div>
              <button onClick={this.onCancel}>Cancel</button>
              <button onClick={this.onSave}>Save</button>
            </form>
          </>
        ) : null}
        {allBlogs2
          ? allBlogs2.map((blog) => (
              <AllBlogs key={blog.id} blog={blog} onEdit={this.onEdit} />
            ))
          : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    allBlogs: state.blogState.blog,
  };
};

export default connect(mapStateToProps, { addBlog, deleteBlog, editBlog })(
  BlogPosts
);
