import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import ArticleList from './components/articles/ArticleList';
import ArticleInfo from './components/articles/ArticleInfo';
import ArticleAddition from './components/articles/ArticleAddition';
import ArticleEdit from './components/articles/ArticleEdit';
import { useParams } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="container">
          <Main />
        </div>
      </Router>
    </div>
  );
}

/**
 * Below was needed in order to get a mongoDB _id to be passed in
 * as a param to the react components that I am rendering. We Get 
 * the id parameter from the URL using useParams(). Then, we pass 
 * the id as a prop to ArticleInfo
 * 
 * @returns <ArticleInfo/>
 */
function ArticleInfoWithId() {
  const { id } = useParams();
  return <ArticleInfo id={id} />;
}

/**
 * Same idea with <ArticleInfo/>... Needed the _id to be passed in
 * as a param to the react components that I was rendering, the 
 * following way was what I did in order to get it to work.
 * 
 * @returns <ArticleEditWithId/>
 */
function ArticleEditWithId() {
  const { id } = useParams();       // Get the id parameter from the URL using useParams()
  return <ArticleEdit id={id} />;   // Pass the id as a prop to ArticleInfo
}

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className='container'>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><NavLink exact="true" className="nav-link" activeclassname="active" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink exact="true" className="nav-link" activeclassname="active" to="/articles">Articles</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return (
    <Routes>
      <Route path='/articles' element={<ArticleList />} />
      <Route path='/articles/new' element={<ArticleAddition />} />
      <Route path='/' element={<Home />} />
      <Route path='/articles/:id' element={<ArticleInfoWithId />} />
      <Route path='/articles/:id/edit' element={<ArticleEditWithId />} />
    </Routes>
  );
}

export default App;
