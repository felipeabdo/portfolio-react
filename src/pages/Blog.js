import React from 'react';
import '../assets/styles/pages/blog.scss';

const Blog = () => {
  return (
    <div id="blog-content">
      <div id="blog-title">
        <h1>Skills</h1>
        <p>PARA TE AJUDAR</p>
      </div>
      <div className="separator"></div>
      <div className="text-title uppercase"><strong>Skills</strong></div>
      <div id="skills">
        <img src={require('../assets/images/html.png')} className="stacks" alt="HTML" />
        <img src={require('../assets/images/css.png')} className="stacks" alt="CSS" />
        <img src={require('../assets/images/js.png')} className="stacks" alt="JavaScript" />
        <img src={require('../assets/images/ruby.png')} className="stacks" alt="Ruby" />
        <img src={require('../assets/images/rails.png')} className="stacks" alt="Rails" />
        <img src={require('../assets/images/git.png')} className="stacks" alt="Git" />
        <img src={require('../assets/images/bootstrap.png')} className="stacks" alt="Bootstrap" />
      </div>
    </div>
  );
};

export default Blog;