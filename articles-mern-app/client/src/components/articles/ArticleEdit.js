import React, { useState, useEffect } from "react";
import axios from 'axios'; 

function ArticleEdit(props) {
  const initialState = { title: '', content: '' }
  const [article, setArticle] = useState(initialState)

  useEffect(function() {
    async function getArticle() {
      try {
        const response = await axios.get(`/api/articles/${props.id}`);
        setArticle(response.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getArticle();    
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();
    async function updateArticle() {
      try {
        await axios.patch(`/api/articles/${article._id}`, article);
        window.location.href = '/articles';       
      } catch(error) {
        console.log(error);
      }
    }
    updateArticle();
  }

  function handleChange(event) {
    setArticle({...article, [event.target.name]: event.target.value})
  }

  function handleCancel() {
    props.history.push(`/articles/${article._id}`);
  }

  return (
    <div>
      <h1>Edit {article.title}</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={article.title} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" rows="5" value={article.content} onChange={handleChange} className="form-control" />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ArticleEdit;